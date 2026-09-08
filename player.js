const video = document.getElementById('film');
const play = document.getElementById('play');
const seek = document.getElementById('seek');
const format = t => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
function update() {
  play.innerHTML = video.paused ? 'Play film <span>▶</span>' : 'Pause film <span>Ⅱ</span>';
  seek.value = video.currentTime;
  document.getElementById('time').textContent = format(video.currentTime);
  if (Number.isFinite(video.duration)) {
    seek.max = video.duration;
    document.getElementById('duration').textContent = format(video.duration);
  }
}
async function start() {
  try { await video.play(); } catch { play.textContent = 'Use video controls to play'; }
}
play.onclick = () => video.paused ? start() : video.pause();
document.getElementById('restart').onclick = () => { video.currentTime = 0; start(); };
seek.oninput = () => { video.currentTime = Number(seek.value); };
['play', 'pause', 'timeupdate', 'loadedmetadata', 'ended'].forEach(event => video.addEventListener(event, update));
update();
