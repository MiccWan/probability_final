const stat = [[3329, 2041, 3332],[1815, 1319, 1969],[3558, 1743, 0]]

const n = stat.length;
const size = 500;
const canvas = document.getElementById('plot');
const ctx = canvas.getContext('2d');
canvas.width = 1100
canvas.height = 1100


function draw(x, y, deep) {
  const colorN = Math.min(deep, 255) / 255
  // const color = colorN.toString(16);
  // console.log((255 - Math.floor(deep)), color);

  ctx.fillStyle = colorTrans([224, 198, 160], [45, 20, 25], colorN)

  const xSize = x > 1 ? size / 5 : size;
  const ySize = y > 1 ? size / 5 : size;
  ctx.fillRect(y * size, x * size, ySize, xSize);

  console.log(`filling (${y * size}, ${x * size}) with ${xSize}*${ySize} ${ctx.fillStyle}`)
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    draw(i, j, stat[i][j] / 3600 * 255);
  }
}

function colorTrans(from, to, percent) {
  const r = Math.floor(from[0] + percent * (to[0] - from[0]))
  const g = Math.floor(from[1] + percent * (to[1] - from[1]))
  const b = Math.floor(from[2] + percent * (to[2] - from[2]))
  return '#' + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0")
}