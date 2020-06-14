const stat = [[3329, 2041, 3332],[1815, 1319, 1969],[3558, 1743, 0]]

const n = stat.length;
const size = 500;
const canvas = document.getElementById('plot');
const ctx = canvas.getContext('2d');
canvas.width = 1100
canvas.height = 1100


function draw(x, y, deep) {
  const color = (255 - Math.floor(Math.min(deep, 255))).toString(16);
  console.log((255 - Math.floor(deep)), color);

  ctx.fillStyle = '#' + color + color + color;
  const xSize = x > 1 ? size / 5 : size;
  const ySize = y > 1 ? size / 5 : size;
  ctx.fillRect(y * size, x * size, ySize, xSize);

  console.log(`filling (${y * size}, ${x * size}) with ${xSize}*${ySize} ${ctx.fillStyle}`)
}

// plot1: raw stat
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    draw(i, j, stat[i][j] / 3600 * 255);
  }
}

// plot2: normalized

// for (let i = 0; i < n; i++) {
//   const rowSum = stat[i].reduce((x, y) => x + y, 0);
//   console.log(rowSum)
//   for (let j = 0; j < n; j++) {
//     draw(i, j, Math.min(Math.sqrt(stat[i][j] / rowSum * 255) * 16 * 2, 255));
//   }
// }