/* Cue sheets for the five recorded takes.
   `t` is the console timecode in the recording at which the instruction reached the model.
   `cls` groups the instruction: action (body), prop (objects), scene (world, light, weather). */

window.TAKES = [
  {
    id: 'tea-house',
    name: 'Garden tea house',
    kind: 'rundown',
    file: './media/takes/tea-house.mp4',
    poster: './media/posters/tea-house.jpg',
    duration: 91.0,
    source: 'Generated first frame · 12-shot rundown · Mandarin',
    blurb:
      'A full shot list is queued before the run, then consumed one shot at a time. Eight of the twelve cues are object handling: the teapot is grasped, lifted, poured, set back, and a biscuit is fetched from below the frame.',
    cues: [
      { t: 19.0, cls: 'action', act: 'Small right-paw greeting, then the paw settles back on the counter', line: '欢迎来竹林茶亭，坐下来慢慢喝杯茶吧。', gloss: 'Welcome to my garden tea house. Stay for a little tea.' },
      { t: 25.25, cls: 'action', act: 'Looks toward the teapot, head tilted, ears relaxed', line: '茶壶已经准备好了，今天的茶闻起来很香。', gloss: "The teapot is ready, and today's tea smells really lovely." },
      { t: 30.12, cls: 'scene', act: 'A breeze starts; bamboo leaves rustle and the banner sways', line: '竹叶沙沙响起来了，有一阵小风吹过来。', gloss: 'A little breeze is rustling the bamboo leaves around us.' },
      { t: 36.25, cls: 'scene', act: 'A cloud crosses; the light in the pavilion softens and dims', line: '云慢慢遮住太阳，茶亭里面凉快了一点。', gloss: 'A cloud is making our little tea pavilion pleasantly shady.' },
      { t: 41.25, cls: 'prop', act: 'The paw closes around the teapot handle, pot still on the counter', line: '先把茶壶握稳，我们慢慢来，不着急。', gloss: "First, I'll take a steady hold of this teapot handle." },
      { t: 49.0, cls: 'prop', act: 'Lifts the teapot and holds the spout over the bowl', line: '把壶嘴移到杯子上面，现在位置刚刚好。', gloss: 'The spout is above the bowl, just where it should be.' },
      { t: 55.5, cls: 'prop', act: 'Tilts and pours — a short amber stream into the bowl', line: '慢慢倒上半杯，热茶的香气就出来了。', gloss: "I'll pour half a bowl and let the tea smell lovely." },
      { t: 60.75, cls: 'prop', act: 'Sets the teapot back where it started and lets go', line: '茶倒好了，茶壶放回原来的位置。', gloss: "The tea is poured. I'll put the teapot back here." },
      { t: 63.75, cls: 'prop', act: 'Reaches below the frame and brings up a round biscuit', line: '下面还有一块小饼干，正好配这杯热茶。', gloss: 'There is one little biscuit below to enjoy with your tea.' },
      { t: 70.25, cls: 'prop', act: 'Raises the biscuit toward the camera to show it', line: '这块饼干圆圆的，闻起来还有一些奶香。', gloss: 'This little round biscuit has such a lovely buttery smell.' },
      { t: 76.75, cls: 'prop', act: 'Places the biscuit on the counter beside the saucer', line: '把饼干放在杯子旁边，这份茶点就齐了。', gloss: "I'll place the biscuit beside the bowl. Everything is ready." },
      { t: 82.5, cls: 'scene', act: 'Daylight returns; an open-paw gesture toward the tea', line: '阳光回来了，茶和饼干都给你准备好了。', gloss: 'The sunlight is back, and your tea and biscuit are ready.' },
    ],
  },
  {
    id: 'star-lantern',
    name: 'Star lantern',
    kind: 'rundown',
    file: './media/takes/star-lantern.mp4',
    poster: './media/posters/star-lantern.jpg',
    duration: 96.88,
    source: 'Generated first frame · 12-shot rundown · Mandarin',
    blurb:
      'The same rundown mode on a darker set. Watch the lantern: once a cue puts light inside it, later cues keep it lit and the light keeps spilling onto her hands and the table.',
    cues: [
      { t: 12.0, cls: 'action', act: 'Raises her right hand in greeting, then lowers it to the table', line: '欢迎来到星光小屋，今晚一起点亮一盏灯。', gloss: "Welcome to my observatory. Let's light a little lantern tonight." },
      { t: 18.12, cls: 'action', act: 'Turns her eyes to the empty lantern, expression focused', line: '你看这盏小灯，里面还没有一点星光。', gloss: 'Look at this little lantern. There is no light inside.' },
      { t: 25.12, cls: 'scene', act: 'Wind rises: her sleeve, the curtain and loose hair drift right', line: '窗边吹来一阵风，连窗帘也轻轻飘起来。', gloss: 'A breeze from the window is gently lifting the curtain.' },
      { t: 30.25, cls: 'scene', act: 'Cloud shadow crosses the window; the room light softens and dims', line: '云从窗外经过，屋里的光慢慢暗下来了。', gloss: 'A passing cloud is making the room a little dimmer.' },
      { t: 40.12, cls: 'prop', act: 'Brings a glowing stone up from under the table and holds it', line: '先把手掌摊开，让星光有个落脚的地方。', gloss: "I'll open my palm and make room for a little light." },
      { t: 45.0, cls: 'prop', act: 'Sets the stone at the edge of the circle and releases both hands', line: '看，一颗小小的星光正在手心里亮起来。', gloss: 'Look, a little golden light is forming above my palm.' },
      { t: 53.88, cls: 'prop', act: 'Picks the stone back up and lifts it above the centre', line: '我把这颗小星光，慢慢送进灯的里面。', gloss: "I'll slowly carry this little light into the empty lantern." },
      { t: 59.62, cls: 'prop', act: 'Lets go — the stone stays suspended and lights her fingers', line: '轻轻把手移开，让它留在这盏小灯里。', gloss: "I'll move my hand away and leave the light inside." },
      { t: 65.62, cls: 'prop', act: 'Returns the floating stone to the table edge, hands empty', line: '桌子下面还有一方蓝丝巾，我把它拿出来。', gloss: 'There is a little blue silk cloth under the table.' },
      { t: 76.5, cls: 'prop', act: 'Draws a small feather from her sleeve and holds it up', line: '把这方蓝丝巾放好，就放在旁边的小碟子里。', gloss: "I'll lay this blue silk cloth in the little dish." },
      { t: 82.62, cls: 'prop', act: 'Moves the feather into the stone light, which wraps around it', line: '小灯更亮了一点，连桌子也染上了暖光。', gloss: 'The lantern glows brighter, warming the table and my face.' },
      { t: 86.25, cls: 'scene', act: 'The cloud clears, starlight returns, and she gestures and smiles', line: '让这盏小灯陪着你，我们下次再见吧。', gloss: 'Let this little lantern keep you company until next time.' },
    ],
  },
  {
    id: 'lavender-field',
    name: 'Lavender field',
    kind: 'rundown',
    file: './media/takes/lavender-field.mp4',
    poster: './media/posters/lavender-field.jpg',
    duration: 85.62,
    source: 'Uploaded first frame · paper-cut style · 11 shots reached',
    blurb:
      'A character photo, restyled by the global prompt into layered cut paper, then run through a weather arc: breeze, hard sun, drifting petals, cloud cover, rain, and an umbrella that stays wet after the rain stops.',
    cues: [
      { t: 14.5, cls: 'action', act: 'Stands upright among the flowers and smiles at the camera', line: '欢迎来到薰衣草花田！', gloss: 'Welcome to the lavender field!' },
      { t: 20.38, cls: 'scene', act: 'A soft breeze crosses the field; rows of lavender sway', line: '风吹过来了，花在摇。', gloss: 'The wind is here, and the flowers are swaying.' },
      { t: 26.5, cls: 'prop', act: 'Bends toward the flowers and carefully picks one stem', line: '我闻一下这枝薰衣草。', gloss: 'Let me smell this stem of lavender.' },
      { t: 32.62, cls: 'scene', act: 'Sunlight strengthens; bright highlights appear across the field', line: '太阳有点亮，我挡一下。', gloss: 'The sun is a little bright. Let me shade my eyes.' },
      { t: 38.25, cls: 'scene', act: 'Tiny petals and bits of lavender drift across the frame', line: '花瓣飘来了，我试着接住。', gloss: "Petals are drifting over. I'll try to catch one." },
      { t: 43.62, cls: 'scene', act: 'The wind grows; stems bend together in one direction', line: '风更大了，头发都吹起来了。', gloss: 'The wind is stronger now — it is lifting my hair.' },
      { t: 49.88, cls: 'scene', act: 'Thin cloud slides over the sun and softens the light', line: '云遮住太阳，光变柔了。', gloss: 'A cloud covers the sun and the light goes soft.' },
      { t: 55.5, cls: 'scene', act: 'Light rain begins, visible as small bright drops on the lavender', line: '下小雨了，花上有水珠。', gloss: 'It is drizzling, and there are droplets on the flowers.' },
      { t: 63.5, cls: 'prop', act: 'Raises a clear umbrella against the rain', line: '我撑起透明伞，遮下雨。', gloss: 'I put up my clear umbrella to keep the rain off.' },
      { t: 68.88, cls: 'prop', act: 'The rain stops; droplets stay along the umbrella edge', line: '雨停了，我收起伞。', gloss: 'The rain has stopped, so I am folding the umbrella.' },
      { t: 74.88, cls: 'action', act: 'Points at the water still beaded on the flowers', line: '这些水珠很清楚。', gloss: 'You can see these droplets clearly.' },
    ],
  },
  {
    id: 'evening-field',
    name: 'Evening field',
    kind: 'console',
    file: './media/takes/evening-field.mp4',
    poster: './media/posters/evening-field.jpg',
    duration: 164.67,
    source: 'Uploaded first frame · no rundown · typed live',
    blurb:
      'No shot list. The operator writes each instruction into the console while the stream is already on air, and the global prompt — the cross, the white flower, the setting sun, the pink shirt — is never touched. Seven cues over two and a half minutes.',
    cues: [
      { t: 8.0, cls: 'action', act: 'Stands calmly, looks into the camera, and gives a small nod', line: '我叫龙潇，很高兴认识你。', gloss: "My name is Long Xiao. It's good to meet you." },
      { t: 32.5, cls: 'action', act: 'Turns her shoulders toward the tombstone, glances at it, looks back', line: '我回头看一眼。', gloss: 'Let me look back for a moment.' },
      { t: 51.5, cls: 'scene', act: 'An evening breeze ripples the grass; she brushes hair off her cheek', line: '晚风吹过草地。', gloss: 'The evening wind crosses the grass.' },
      { t: 65.5, cls: 'scene', act: 'Wind grows: sleeves and hem flutter, and she holds her hair back', line: '风有点冷，我整理一下头发。', gloss: 'The wind is cold. Let me fix my hair.' },
      { t: 88.0, cls: 'scene', act: 'Sunset light turns warm and orange; she looks to the horizon', line: '晚霞把草原照暖了。', gloss: 'The sunset is warming the whole field.' },
      { t: 115.0, cls: 'prop', act: 'Light drops, shadows deepen, and she raises a small lantern to her chest', line: '天暗了，我举起小灯。', gloss: 'It is getting dark, so I raise my little lantern.' },
      { t: 136.5, cls: 'scene', act: 'Thin mist forms at ground level and drifts around the grass stems', line: '地面起雾了。', gloss: 'Mist is rising off the ground.' },
    ],
  },
  {
    id: 'mascot-room',
    name: 'Mascot room',
    kind: 'console',
    file: './media/takes/mascot-room.mp4',
    poster: './media/posters/mascot-room.jpg',
    duration: 188.87,
    source: 'Uploaded first frame · no rundown · typed live',
    blurb:
      'A mascot render, uploaded as the first frame, driven through locomotion it was never posed for: wave, jump, spin, walk to the tent at the back and lie down. The last cue rewrites the global prompt instead, and the lights go out.',
    cues: [
      { t: 30.0, cls: 'action', act: 'Stands still and raises his right hand in a friendly wave', line: '你好！欢迎来到扣扣空间，很高兴认识你！', gloss: 'Hello! Welcome to my little room — good to meet you.' },
      { t: 55.0, cls: 'action', act: 'Holds position while a new line is queued', line: '跳一跳，舒展筋骨。', gloss: 'Time for a jump to loosen up.' },
      { t: 70.0, cls: 'action', act: 'Jumps up, then settles back to standing' },
      { t: 104.0, cls: 'action', act: 'Spins once all the way around' },
      { t: 125.0, cls: 'prop', act: 'Walks over to the small tent behind him and lies down', line: '累了躺下休息一下。', gloss: 'I am tired — I will lie down for a rest.' },
      { t: 147.0, cls: 'scene', act: 'Global prompt rewritten mid-stream: lights off, the room goes dark' },
    ],
  },
];

window.CLASS_INFO = [
  {
    id: 'action',
    label: 'Action',
    line: 'Body and camera-facing performance',
    detail:
      'Greeting, gaze shifts, a nod, a jump, a spin, walking across the room. The identity, clothing and set layout from the first frame are held while the body moves.',
  },
  {
    id: 'dialogue',
    label: 'Dialogue',
    line: 'Spoken audio, generated in the same block',
    detail:
      'Every cue can carry a line. Speech is not dubbed on afterwards — the audio latents live in the same causal block as the picture, which is why the mouth and the voice arrive together.',
  },
  {
    id: 'prop',
    label: 'Props',
    line: 'Objects, including ones not in frame yet',
    detail:
      'Grasp, lift, pour, put back, raise an umbrella, hold up a lantern, and reach below the frame to retrieve something that was never visible. Object state persists across later blocks.',
  },
  {
    id: 'scene',
    label: 'Scene',
    line: 'Weather, light and the world around the character',
    detail:
      'Wind picking up, cloud shadow crossing, sunlight returning, rain starting and stopping, mist forming, the lights going out. The character and the set survive the change.',
  },
];
