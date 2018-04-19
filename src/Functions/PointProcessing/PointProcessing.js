const R = require('ramda');
const math = require('mathjs');
const { histogramGrayLevel } = require('../Histogram/HistogramProcessing');

const invert = imageData => {
    const data = imageData.slice();
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }

    return data;
};

const grayscale = imageData => {
    const data = imageData.slice();
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
    return data;
};

const binarize = T => R.map(p => p > T ? 255 : 0);

const otsuLevel = histigramCounts => {
    const total = R.sum(histigramCounts);
    let sumB = 0;
    let wB = 0;
    let maximum = 0;
    const sum1 = math.dot(R.range(0, 256), histigramCounts);

    let level = 0;

    for (let i = 0; i <= 256; i++) {
        wB = wB + histigramCounts[i];
        let wF = total - wB;
        if (wB === 0 || wF === 0)
            continue;
        sumB = sumB + i * histigramCounts[i];
        let mF = (sum1 - sumB) / wF;
        let between = wB * wF * ((sumB / wB) - mF) * ((sumB / wB) - mF);
        if (between >= maximum) {
            level = i;
            maximum = between;
        }
    }

    return level;
};

const otsuBinarize = R.pipe(
    grayscale,
    data => R.pipe(histogramGrayLevel, otsuLevel, t => binarize(t)(data))(data)
);

const logTransform = c => imageData => {
    const data = grayscale(imageData).slice();
    for (let i = 0; i < data.length; i += 4) {
        const s = c * math.log10((data[i] / 255) + 1) * 255;
        data[i] = s;
        data[i + 1] = s;
        data[i + 2] = s;
    }
    return data;
};

const powerTransform = (c, y) => imageData => {
    const data = grayscale(imageData).slice();
    for (let i = 0; i < data.length; i += 4) {
        const s = c * Math.pow((data[i] / 255), y) * 255;
        data[i] = s;
        data[i + 1] = s;
        data[i + 2] = s;
    }
    return data;
};

module.exports = {
    invert,
    grayscale,
    binarize,
    otsuBinarize,
    logTransform,
    powerTransform
};