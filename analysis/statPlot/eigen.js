const stat = [0.005, 0.032, 0.014, 0.008, 0.013, 0.006, 0.002, 0.012, 0.001, 0.018, 0.003, 0.002, 0.033, 0.037, 0.008, 0.006, 0.011, 0.013, 0.044, 0.006, 0., 0.03, 0.001, 0.019, 0.014, 0.001, 0.006, 0.012, 0.001, 0.013, 0.005, 0.003, 0.009, 0.006, 0.024, 0.004, 0.02, 0.003, 0.004, 0.007, 0.004, 0.004, 0.015, 0.003, 0.007, 0.012, 0, 0.009, 0.001, 0.01, 0.002, 0.002, 0.017, 0.036, 0.008, 0.003, 0.014, 0.004, 0.013, 0.01, 0, 0.009, 0.003, 0.019, 0.008, 0., 0.004, 0.003, 0.002, 0.004, 0.006, 0.005, 0.008, 0.002, 0.007, 0.002, 0.004, 0.001, 0.002, 0.006, 0.277]

const n = stat.length;
console.log(n)
const size = 20;
const canvas = document.getElementById('plot');
const ctx = canvas.getContext('2d');
canvas.width = size*n
canvas.height = size


function draw(x, deep) {
  const color = (255 - Math.floor(Math.min(deep, 255))).toString(16);
  console.log((255 - Math.floor(deep)), color);

  ctx.fillStyle = '#' + color + color + color;
  ctx.fillRect(x * size, 0, 30, 30);

  console.log(`filling (${0}, ${x * size}) with ${30}*${30} ${ctx.fillStyle}`)
}

// plot1: raw stat
for (let i = 0; i < n; i++) {
  draw(i, stat[i] * 255 * 40);
}

// plot2: normalized

// for (let i = 0; i < n; i++) {
//   const rowSum = stat[i].reduce((x, y) => x + y, 0);
//   console.log(rowSum)
//   for (let j = 0; j < n; j++) {
//     draw(i, j, Math.min(Math.sqrt(stat[i][j] / rowSum * 255) * 16 * 2, 255));
//   }
// }