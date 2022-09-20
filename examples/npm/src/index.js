import ByteBeatNode from 'bytebeat.js';

document.querySelector('button').addEventListener('click', playPause);

let g_context;
let g_byteBeatNode;
let g_playing = false;

async function init() {
  g_context = new AudioContext();
  g_context.resume();  // needed for safari
  await ByteBeatNode.setup(g_context);
  g_byteBeatNode = new ByteBeatNode(g_context);
  g_byteBeatNode.setType(ByteBeatNode.Type.byteBeat);
  g_byteBeatNode.setExpressionType(ByteBeatNode.ExpressionType.infix);
  g_byteBeatNode.setDesiredSampleRate(8000);
  g_byteBeatNode.setExpressions(['((t >> 10) & 42) * t']);
}

async function playPause() {
  if (!g_context) {
    await init();
  }
  if (!g_playing) {
    g_playing = true;
    g_byteBeatNode.connect(g_context.destination);
  } else {
    g_playing = false;
    g_byteBeatNode.disconnect();
  }
}
