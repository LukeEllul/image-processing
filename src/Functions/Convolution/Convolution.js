const R = require('ramda');
const math = require('mathjs');
const { grayscale } = require('../PointProcessing/PointProcessing');

const convolution = R.curry((imageWidth, imageHeight, Mask, imageData) => {
    const data = imageData.slice();
    const mask = R.pipe(R.reverse, R.map(R.reverse))(Mask);

    const m = mask.length;
    const n = mask[0].length;

    for (let y = 0; y < imageHeight; y++) {
        for (let x = 0; x < imageWidth; x++) {
            let acc = 0;
            for (let k = -Math.floor(n / 2); k <= Math.floor(n / 2); k++) {
                for (let j = -Math.floor(m / 2); j <= Math.floor(n / 2); j++) {
                    if(!mask[k + Math.abs(k)]) return imageData;
                    const h = mask[k + Math.abs(k)][j + Math.abs(j)];
                    const f = imageData[(((y - k) * (imageWidth * 4)) + ((x - j) * 4))] / 255;
                    acc += (h * f);
                }
            }
            acc = acc * 255;
            const p = ((y * (imageWidth * 4)) + (x * 4));
            data[p] = acc;
            data[p + 1] = acc;
            data[p + 2] = acc;
        }
    }

    return data;
});

const GaussianMask = R.curry((width, variance) => {
    const mask = math.zeros(width, width)._data;
    const mid = Math.ceil(width / 2);

    const C = 1 / (2 * Math.PI * Math.pow(variance, 2));

    let sum = 0;

    for (let y = 0; y < mask.length; y++) {
        for (let x = 0; x < mask.length; x++) {
            const i = y - mid;
            const j = x - mid;

            mask[y][x] = (C * Math.exp(-((Math.pow(i, 2) + Math.pow(j, 2)) / (2 * Math.pow(variance, 2)))));
            sum += mask[y][x];
        }
    }

    for (let y = 0; y < mask.length; y++)
        for (let x = 0; x < mask.length; x++)
            mask[y][x] /= sum;

    return mask;
});

const BoxFilterMask = width =>
    Array(width).fill(Array(width).fill(1 / (width * width)));

const averageFilter = R.curry((width, height, N) =>
    R.pipe(
        grayscale,
        convolution(width, height, BoxFilterMask(N))
    ));

const gaussianFilter = R.curry((width, height, N, S) =>
    R.pipe(
        grayscale,
        convolution(width, height, GaussianMask(N, S))
    ));

module.exports = {
    averageFilter,
    gaussianFilter
};