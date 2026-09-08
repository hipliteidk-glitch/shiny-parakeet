const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');
const fs = require('fs');
const { spawn, execFileSync } = require('child_process');
const { once } = require('events');
GlobalFonts.registerFromPath('assets/poppins-latin-800-normal.woff', 'Recreation');
require('./recreation.js');
const canvas = createCanvas(576, 1024), ctx = canvas.getContext('2d');
fs.mkdirSync('exports', { recursive: true });
const ffmpeg = process.env.FFMPEG || execFileSync('/home/user/.venv/bin/python', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'], { encoding: 'utf8' }).trim();
const src = '76fc2533b651f5178c77ee6a5aff9e2b_1788867312640.mp4';
const args = ['-y', '-f', 'image2pipe', '-vcodec', 'png', '-r', '30', '-i', '-', '-i', src, '-map', '0:v:0', '-map', '1:a:0', '-c:v', 'libx264', '-preset', 'fast', '-crf', '21', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-t', String(globalThis.RECREATION_DURATION), '-movflags', '+faststart', 'exports/recreated.mp4'];
const child = spawn(ffmpeg, args, { stdio: ['pipe', 'ignore', 'inherit'] });
child.stdin.on('error', err => { console.error(err.message); process.exitCode = 1; });
child.on('error', err => { console.error(err); process.exitCode = 1; });
const done = new Promise(resolve => child.on('close', resolve));
(async () => {
  try {
    for (let i = 0; i < Math.ceil(globalThis.RECREATION_DURATION * 30); i++) {
      globalThis.renderRecreation(ctx, i / 30);
      if (i === 60) fs.writeFileSync('exports/poster.png', canvas.toBuffer('image/png'));
      if (!child.stdin.write(canvas.toBuffer('image/png'))) await once(child.stdin, 'drain');
    }
    child.stdin.end();
    const code = await done;
    if (code !== 0) throw new Error('FFmpeg failed: ' + code);
    console.log('Full-length recreation exported with source audio.');
  } catch (err) { console.error(err); child.kill(); process.exitCode = 1; }
})();
