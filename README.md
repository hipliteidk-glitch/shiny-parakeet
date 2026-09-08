# Sound Sense — original video player

The webpage now plays the user's original @talk.why video, including its original audio, captions, timing, and branding. It is an unchanged copy of the supplied file, **not a newly rendered recreation**. Attribution remains with the original creator; hosting it does not imply ownership or verification of its medical claims.

## Run

```
npm install
npm start
```

Open port 3000. Includes native audio/fullscreen controls, play/pause, replay, timeline, and MP4 download. The server supports byte-range requests for video seeking.

## Download

`exports/sound-sense.mp4` is the original video, approximately 2 minutes, 576 × 1024, with audio. This deliverable is tracked in Git.

## Earlier stylized version

`animation.js` and `export.cjs` retain the earlier original 36-second silent study. It is no longer shown on the webpage. To generate it separately, run `FFMPEG=/path/to/ffmpeg npm run export`. Output: `exports/stylized-study.mp4` (ignored by Git). The exporter also supports this workspace's imageio-ffmpeg installation in `/home/user/.venv`.
