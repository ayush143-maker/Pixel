// --- Contact: pull telegram handle from settings table (admin-editable) ---
(async function loadContact() {
  const box = document.getElementById('contactBox');
  try {
    const { data } = await supabaseClient.from('settings').select('value').eq('key', 'telegram_username').maybeSingle();
    const handle = (data && data.value || '').replace('@', '').trim();
    if (handle) {
      box.innerHTML = `
        <a class="tg-link" href="https://t.me/${handle}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.3-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.32 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-2 1.92c-.23.23-.42.42-.82.42z"/></svg>
          DM on Telegram — @${handle}
        </a>`;
    } else {
      box.innerHTML = `<span class="tg-fallback">Contact coming soon.</span>`;
    }
  } catch (e) {
    box.innerHTML = `<span class="tg-fallback">Contact coming soon.</span>`;
  }
})();

// --- Signature visual: two waveforms drifting, then locking into resonance ---
const canvas = document.getElementById('wave');
const ctx = canvas.getContext('2d');
let t = 0;

function resize() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
}
resize();
window.addEventListener('resize', () => { ctx.setTransform(1,0,0,1,0,0); resize(); });

function drawWave(phaseOffset, freqOffset, color, alpha, w, h) {
  ctx.beginPath();
  const amp = h * 0.22;
  const mid = h / 2;
  for (let x = 0; x <= w; x += 4) {
    const freq = 0.018 + freqOffset;
    const y = mid + Math.sin(x * freq + t + phaseOffset) * amp * Math.sin((x / w) * Math.PI);
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function loop() {
  const w = canvas.getBoundingClientRect().width;
  const h = canvas.getBoundingClientRect().height;
  ctx.clearRect(0, 0, w, h);

  // convergence cycles between 0 (apart) and 1 (locked) over ~7s
  const cycle = (Math.sin(t * 0.14) + 1) / 2; // 0..1
  const freqOffset = (1 - cycle) * 0.01;
  const phaseOffset = (1 - cycle) * 1.4;

  drawWave(0, freqOffset, '#5fe0e8', 0.85, w, h);
  drawWave(phaseOffset, -freqOffset, '#3d8bff', 0.85, w, h);

  t += 0.045;
  requestAnimationFrame(loop);
}
loop();
