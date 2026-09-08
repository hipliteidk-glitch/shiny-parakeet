# Sound Sense — full-length animation recreation

A newly drawn, approximately 2-minute recreation of the supplied @talk.why explainer. The MP4 uses freshly rendered Canvas vector artwork and the original audio track. **No original video frames are used in the render.**

This is an approximate scene-by-scene visual reconstruction, not a pixel-perfect copy. It follows the source's scene order, dark landscape illustration band within a portrait frame, Indonesian caption cues, purple/red/green accents, and hearing diagrams. Caption timing is manually estimated; it is not a verified verbatim transcript. Platform watermarks and the platform outro are not reproduced.

## Webpage

```
npm ci
npm start
```

Open port 3000. The player shows `exports/recreated.mp4` with original audio, native fullscreen/volume controls, replay, scrubbing, and download. The Node server supports byte-range seeking.

## Export

```
FFMPEG=/path/to/ffmpeg npm run export:recreation
```

The workspace also supports an imageio-ffmpeg executable in `/home/user/.venv`. Output: `exports/recreated.mp4`, 576 × 1024, 30 fps, 120.63 seconds, H.264 video with the source AAC audio copied without re-encoding. `recreation.js` contains the scene renderer and timed caption list. Poppins is bundled under its included open font license.

`animation.js` and `export.cjs` retain the earlier 36-second silent style study; `npm run export` generates it separately as `exports/stylized-study.mp4`. `exports/sound-sense.mp4` is the previously published unchanged original, **not** the new recreation.

## Attribution and content

Source video and audio: @talk.why, supplied in this repository. The recreation is labeled as such and does not claim affiliation with the creator. Source claims and audio are retained for reconstruction, not endorsed or medically verified. In particular, the tinnitus explanation, “8 out of 10” statistic, illustrative cell counts, and volume-percentage advice should not be treated as validated medical guidance.

## Checks

The recreated file's audio packet SHA-256 matches the original. Duration, resolution, frame rate, visual contact sheet, and HTTP byte-range playback have been checked. The render is deterministic and reproducible from source.
