const $ = (id) => document.getElementById(id);
let currentRooms = [];

$('loginBtn').addEventListener('click', async () => {
  const { error } = await supabaseClient.auth.signInWithPassword({
    email: $('email').value.trim(),
    password: $('password').value,
  });
  if (error) { $('loginMsg').textContent = error.message; return; }
  $('loginCard').classList.add('hidden');
  $('panel').classList.remove('hidden');
  loadRooms();
  loadContactSetting();
});

// stay logged in on refresh
supabaseClient.auth.getSession().then(({ data }) => {
  if (data.session) {
    $('loginCard').classList.add('hidden');
    $('panel').classList.remove('hidden');
    loadRooms();
    loadContactSetting();
  }
});

async function loadContactSetting() {
  const { data } = await supabaseClient.from('settings').select('value').eq('key', 'telegram_username').maybeSingle();
  $('tgUsername').value = (data && data.value) || '';
}

$('saveContactBtn').addEventListener('click', async () => {
  const value = $('tgUsername').value.trim().replace('@', '');
  const msg = $('contactMsg');
  const { error } = await supabaseClient.from('settings').update({ value }).eq('key', 'telegram_username');
  if (error) { msg.className = 'msg err'; msg.textContent = error.message; return; }
  msg.className = 'msg ok'; msg.textContent = 'Saved — live on the homepage now.';
});

function genCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

$('createRoomBtn').addEventListener('click', async () => {
  const code = genCode();
  const { data, error } = await supabaseClient.from('rooms').insert({
    code,
    couple_name: $('coupleName').value.trim() || null,
  }).select().single();

  if (error) { $('newCode').className = 'msg err'; $('newCode').textContent = error.message; return; }
  $('newCode').className = 'msg ok';
  $('newCode').innerHTML = `Room created. Share this code: <span class="code-badge">${data.code}</span>`;
  $('coupleName').value = '';
  loadRooms();
});

async function loadRooms() {
  const { data } = await supabaseClient.from('rooms').select('*').order('created_at', { ascending: false });
  currentRooms = data || [];
  const sel = $('roomSelect');
  sel.innerHTML = currentRooms.map(r => `<option value="${r.id}">${r.code} — ${r.couple_name || 'unnamed'}</option>`).join('');
  if (currentRooms[0]) loadSongsFor(currentRooms[0].id);
  sel.onchange = () => loadSongsFor(sel.value);
}

async function loadSongsFor(roomId) {
  const { data } = await supabaseClient.from('songs').select('*').eq('room_id', roomId).order('sort_order');
  const list = $('songList');
  list.innerHTML = (data || []).map(s =>
    `<div class="song-item">
       <span>${s.title} — ${s.artist || ''}</span>
       <button class="song-del" data-id="${s.id}">Remove</button>
     </div>`
  ).join('') || '<p style="color:var(--text-muted); font-size:12px;">No songs yet.</p>';

  list.querySelectorAll('.song-del').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Remove this song from the room?')) return;
      const { error } = await supabaseClient.from('songs').delete().eq('id', btn.dataset.id);
      if (!error) loadSongsFor(roomId);
    });
  });
}

$('addSongBtn').addEventListener('click', async () => {
  const roomId = $('roomSelect').value;
  const title = $('songTitle').value.trim();
  const artist = $('songArtist').value.trim();
  const audioFile = $('audioFile').files[0];
  const thumbFile = $('thumbFile').files[0];
  const msg = $('songMsg');

  if (!roomId || !title || !audioFile) { msg.className = 'msg err'; msg.textContent = 'Room, title, and audio file are required.'; return; }
  msg.className = 'msg'; msg.textContent = 'Uploading…';

  try {
    const audioPath = `${roomId}/${Date.now()}-${audioFile.name}`;
    const { error: audioErr } = await supabaseClient.storage.from('songs').upload(audioPath, audioFile);
    if (audioErr) throw audioErr;
    const audioUrl = supabaseClient.storage.from('songs').getPublicUrl(audioPath).data.publicUrl;

    let thumbUrl = null;
    if (thumbFile) {
      const thumbPath = `${roomId}/${Date.now()}-${thumbFile.name}`;
      const { error: thumbErr } = await supabaseClient.storage.from('songs').upload(thumbPath, thumbFile);
      if (thumbErr) throw thumbErr;
      thumbUrl = supabaseClient.storage.from('songs').getPublicUrl(thumbPath).data.publicUrl;
    }

    const { error: insertErr } = await supabaseClient.from('songs').insert({
      room_id: roomId, title, artist, audio_url: audioUrl, thumbnail_url: thumbUrl,
    });
    if (insertErr) throw insertErr;

    msg.className = 'msg ok'; msg.textContent = 'Added.';
    $('songTitle').value = ''; $('songArtist').value = ''; $('audioFile').value = ''; $('thumbFile').value = '';
    loadSongsFor(roomId);
  } catch (e) {
    msg.className = 'msg err'; msg.textContent = e.message || 'Upload failed.';
  }
});
