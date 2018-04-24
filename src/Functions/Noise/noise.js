const R = require('ramda');
const math = require('mathjs');

const addSaltandPepper = R.curry((black, white, imageData) => {
    const data = imageData.slice();
    for (let i = 0; i < data.length; i += 4) {
        const r = math.random(0, 256);
        const p = r <= black ? 0 : r >= white ? 255 : data[i];
        data[i] = p;
        data[i + 1] = p;
        data[i + 2] = p;
    }
    return data;
});

const filter = R.curry((f, width, height, N, imageData) => {
    const data = imageData.slice();
    const m = Math.floor(N / 2);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const p = [];
            for (let k = y - m; k < y + m; k++) {
                for (let j = x - m; j < x + m; j++) {
                    const v = imageData[((k * (width * 4)) + (j * 4))];
                    p.push(v);
                }
            }
            const sortedArray = R.sort((a, b) => a - b, p);
            const n = f(sortedArray);
            const pos = ((y * (width * 4)) + (x * 4));
            data[pos] = n;
            data[pos + 1] = n;
            data[pos + 2] = n;
        }
    }
    return data;
});

const medianFilter = filter(a => a[Math.floor(a.length / 2)]);
const maxFilter = filter(a => a[a.length - 1]);
const minFilter = filter(a => a[0]);

module.exports = {
    medianFilter,
    maxFilter,
    minFilter,
    addSaltandPepper
};