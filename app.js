let room = null;
let songs = [];
let currentIndex = 0;
let presenceChannel = null;
let playbackChannel = null;
let suppressBroadcast = false; // true while we're applying a remote update, so we don't echo it back

const $ = (id) => document.getElementById(id);
const player = $('player');

$('joinBtn').addEventListener('click', joinRoom);
$('code').addEventListener('keydown', (e) => { if (e.key === 'Enter') joinRoom(); });

async function joinRoom() {
  const code = $('code').value.trim();
  $('entryError').textContent = '';
  if (code.length !== 6) { $('entryError').textContent = 'Enter the full 6-digit code.'; return; }

  const { data: roomData, error } = await supabaseClient
    .from('rooms')
    .select('*')
    .eq('code', code)
    .eq('active', true)
    .maybeSingle();

  if (error || !roomData) { $('entryError').textContent = "That code doesn't match a room."; return; }

  room = roomData;
  const { data: songData } = await supabaseClient
    .from('songs')
    .select('*')
    .eq('room_id', room.id)
    .order('sort_order', { ascending: true });

  songs = songData || [];
  if (songs.length === 0) { $('entryError').textContent = 'This room has no songs yet.'; return; }

  $('entryCard').classList.add('hidden');
  $('roomView').classList.remove('hidden');
  $('coupleName').textContent = room.couple_name ? `${room.couple_name}'s songs` : 'Your songs';

  renderPlaylist();
  await ensurePlaybackRow();
  subscribeRealtime();
  subscribePresence();
}

function renderPlaylist() {
  const list = $('songList');
  list.innerHTML = '';
  songs.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'song-row' + (i === currentIndex ? ' active' : '');
    row.innerHTML = `
      <div class="song-thumb" style="background-image:url('${s.thumbnail_url || ''}')"></div>
      <div class="song-meta"><p class="t">${s.title}</p><p class="a">${s.artist || ''}</p></div>
    `;
    row.addEventListener('click', () => selectSong(i, true));
    list.appendChild(row);
  });
}

async function ensurePlaybackRow() {
  const { data } = await supabaseClient.from('playback_state').select('*').eq('room_id', room.id).maybeSingle();
  if (!data) {
    await supabaseClient.from('playback_state').insert({
      room_id: room.id,
      current_song_id: songs[0].id,
      is_playing: false,
      position_seconds: 0,
    });
    loadSong(0, 0, false);
  } else {
    const idx = Math.max(0, songs.findIndex((s) => s.id === data.current_song_id));
    const elapsed = data.is_playing ? (Date.now() - new Date(data.updated_at).getTime()) / 1000 : 0;
    loadSong(idx, data.position_seconds + elapsed, data.is_playing);
  }
}

function loadSong(index, atTime = 0, playing = false) {
  currentIndex = index;
  const s = songs[index];
  player.src = s.audio_url;
  $('cover').style.backgroundImage = `url('${s.thumbnail_url || ''}')`;
  $('trackTitle').textContent = s.title;
  $('trackArtist').textContent = s.artist || '';
  renderPlaylist();
  player.currentTime = atTime;
  if (playing) player.play().catch(() => {});
  else player.pause();
  $('playBtn').textContent = playing ? '❚❚' : '▶';
}

function subscribeRealtime() {
  playbackChannel = supabaseClient
    .channel(`playback:${room.id}`)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'playback_state', filter: `room_id=eq.${room.id}` },
      (payload) => applyRemoteState(payload.new))
    .subscribe();
}

function applyRemoteState(state) {
  suppressBroadcast = true;
  const idx = songs.findIndex((s) => s.id === state.current_song_id);
  const elapsed = state.is_playing ? (Date.now() - new Date(state.updated_at).getTime()) / 1000 : 0;
  const targetTime = state.position_seconds + elapsed;

  if (idx !== currentIndex) {
    loadSong(idx, targetTime, state.is_playing);
  } else {
    if (Math.abs(player.currentTime - targetTime) > 1.2) player.currentTime = targetTime;
    if (state.is_playing && player.paused) player.play().catch(() => {});
    if (!state.is_playing && !player.paused) player.pause();
    $('playBtn').textContent = state.is_playing ? '❚❚' : '▶';
  }
  setTimeout(() => (suppressBroadcast = false), 300);
}

function subscribePresence() {
  presenceChannel = supabaseClient.channel(`presence:${room.id}`, { config: { presence: { key: crypto.randomUUID() } } });
  presenceChannel
    .on('presence', { event: 'sync' }, () => {
      const count = Object.keys(presenceChannel.presenceState()).length;
      const live = count >= 2;
      $('liveDot').classList.toggle('live', live);
      $('statusText').textContent = live ? 'Both of you are here' : 'Waiting for the other one…';
      $('syncRing').classList.toggle('on', live);
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') await presenceChannel.track({ online_at: Date.now() });
    });
}

async function pushState(overrides = {}) {
  if (suppressBroadcast) return;
  await supabaseClient.from('playback_state').update({
    current_song_id: songs[currentIndex].id,
    is_playing: !player.paused,
    position_seconds: player.currentTime,
    updated_at: new Date().toISOString(),
    ...overrides,
  }).eq('room_id', room.id);
}

$('playBtn').addEventListener('click', async () => {
  if (player.paused) { await player.play().catch(() => {}); } else { player.pause(); }
  $('playBtn').textContent = player.paused ? '▶' : '❚❚';
  pushState();
});

$('nextBtn').addEventListener('click', () => selectSong((currentIndex + 1) % songs.length, true));
$('prevBtn').addEventListener('click', () => selectSong((currentIndex - 1 + songs.length) % songs.length, true));

function selectSong(index, autoplay) {
  loadSong(index, 0, autoplay);
  pushState({ current_song_id: songs[index].id, position_seconds: 0, is_playing: autoplay });
}

player.addEventListener('timeupdate', () => {
  if (player.duration) {
    $('progressFill').style.width = `${(player.currentTime / player.duration) * 100}%`;
    $('timeCur').textContent = fmt(player.currentTime);
    $('timeDur').textContent = fmt(player.duration);
  }
});
player.addEventListener('ended', () => selectSong((currentIndex + 1) % songs.length, true));

// periodic gentle re-sync broadcast so a late joiner catches up
setInterval(() => { if (room && !player.paused) pushState(); }, 4000);

function fmt(t) {
  if (!isFinite(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
