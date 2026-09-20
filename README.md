# Stream LTX — project page

Project page for **Stream LTX**: a block-causal rebuild of LTX-2.3 for real-time joint
audio-video generation, where new text instructions can be handed to the model between
one-second blocks.

**Live page:** https://longxiao2001.github.io/StreamLTX/

## What is on the page

- Five uncut console recordings of continuous runs, each with a cue sheet. Every cue is
  timecoded to the moment the instruction reached the model, and clicking it seeks the take.
- A breakdown of what a single cue can change: body action, spoken dialogue, prop handling,
  and scene/weather/light.
- The method: one-second AV blocks with causal masks on all six attention paths, teacher
  forcing with resample forcing, then diffusion forcing and few-step distillation, a
  fixed-budget three-tier KV cache, separated global and local prompts, and one denoising
  level per GPU.

43 fps on 4 × H800 at 512 × 768, ten-minute continuous takes. The fps figure is steady-state
DiT denoising throughput only; text encoding, VAE and audio decoding and muxing are not counted,
and first-block latency is reported separately.

## Repository layout

```
index.html            page shell
assets/styles.css     styles
assets/takes.js       cue sheet data for the five takes
assets/app.js         tabs, cue sheet, block strip
media/takes/          console recordings
media/posters/        video posters
media/figures/        training and inference schematics
```

Static, no build step. Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
```

## Notes

The recordings are screen captures of an internal research prototype. No code or weights
are released here.

Built by [Long Xiao](https://longxiao2001.github.io) during a research internship at
Tencent, June–September 2026.
