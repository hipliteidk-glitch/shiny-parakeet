# Sound Sense

An original, 36-second silent visual recreation inspired by the reference video's dark palette, Indonesian captions, and animated hearing diagrams. Not a frame-for-frame reproduction. No original branding or audio is reused.

## Webpage

```
npm install
npm start
```

Open port 3000. Includes playback, replay, scrubbing, and MP4 download. The animation is Canvas 2D with six chapters. Typography optionally loads Google Fonts, with system fallbacks.

## MP4

The generated film is `exports/sound-sense.mp4` (576 × 1024, 24 fps). Generated exports are ignored by Git.

To regenerate, install FFmpeg and run `FFMPEG=/path/to/ffmpeg npm run export`. In this workspace, the exporter can also locate the imageio-ffmpeg binary in `/home/user/.venv`.

The webpage and exporter share `animation.js` so their visuals stay consistent. Content is general hearing-health education, not diagnosis; the film does not reproduce the reference's unsupported numerical claims or its characterization of tinnitus as dying cells.
