# Stream LTX

Block-causal LTX-2.3 for real-time joint audio and video. The model emits one second of
picture and sound at a time, and because it never looks ahead, what happens next can be
changed while the stream is still running.

**Demo:** https://longxiao2001.github.io/StreamLTX/

Hugging Face: https://huggingface.co/longxiaooo/StreamLTX — coming soon.

## Two ways to drive it

**Text, between blocks.** A short instruction — a gesture, a spoken line, an object to pick
up, rain, the lights going out — is handed to the model between one-second blocks, and the
next second carries it out. The set and the character hold. Five uncut runs:

**Garden tea house** · 1:31

<video src="media/takes/tea-house.mp4" poster="media/posters/tea-house.jpg" controls width="720"></video>

**Star lantern** · 1:37

<video src="media/takes/star-lantern.mp4" poster="media/posters/star-lantern.jpg" controls width="720"></video>

**Lavender field** · 1:26

<video src="media/takes/lavender-field.mp4" poster="media/posters/lavender-field.jpg" controls width="720"></video>

**Evening field** · 2:45

<video src="media/takes/evening-field.mp4" poster="media/posters/evening-field.jpg" controls width="720"></video>

**Mascot room** · 1:20

<video src="media/takes/mascot-room.mp4" poster="media/posters/mascot-room.jpg" controls width="720"></video>

**A reference audio track and a first frame.** Upload a voice and an opening image. The frame
fixes who is in the shot; the audio fixes the voice and the timing. The model streams the
video forward for the length of the track, mouth and motion following the sound, with no new
text cue in between.

**Retriever** · 0:10

<video src="media/tai2v/retriever.mp4" poster="media/posters/tai2v-retriever.jpg" controls width="720"></video>

A photographed dog. Audio: a cover of 蒋雪儿, 梦的翅膀受了伤, sung by an online creator.

**Street** · 0:48

<video src="media/tai2v/street.mp4" poster="media/posters/tai2v-street.jpg" controls width="720"></video>

An illustrated character. Audio: Unravel, the theme of Tokyo Ghoul (东京喰种).

**Beach** · 3:33

<video src="media/tai2v/beach.mp4" poster="media/posters/tai2v-beach.jpg" controls width="720"></video>

Audio: a 奶龙 AI cover of 陶喆, 寂寞的季节.

## How it is built

A block is one second and carries both modalities. Video and audio latents run at different
rates, so each block holds 4 + 3*k* video frames beside 26 + 25*k* audio frames, and all six
attention paths — including the two cross-modal ones — are causally masked.

Training moves the bidirectional model onto that structure in three stages. Frame-parallel
teacher forcing, with resample forcing folded in, supervises the next block on the history the
model actually produced rather than on ground truth alone. Diffusion forcing then gives every
block its own noise level, so one forward pass looks like rolling forward at inference.
Distribution matching distillation takes sampling from 30 steps down to 4.

The global prompt holds the set, the character and the style. The local prompt holds this
segment's action and line, and a block cross-attends only to its own segment, which is what
makes a live swap safe.

Inference is split by denoising step, not by frame: four GPUs each keep one noise level's KV
and hand latents on over NCCL P2P, so at steady state four blocks are in flight and every time
slice finishes one. A fifth GPU carries prompt encoding and incremental VAE coding off the
critical path. Long context is an anchor, a content memory and a FIFO of recent blocks, each
layer evicting down to a fixed budget, so a ten-minute take costs the same per block as the
first minute.

43 fps on 4 × H800 at 512 × 768. That figure is steady-state DiT denoising throughput only —
text encoding, VAE and audio decoding and muxing are not in it, and the first frame waits about
two seconds for the pipeline to fill.

## On this page

The recordings are screen captures of a research prototype, at the resolution and frame rate it
actually ran. Cue timecodes mark when an instruction reached the model; the result lands a block
or two later.

Built by [Long Xiao](https://longxiao2001.github.io).
