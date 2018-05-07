const R = require('ramda');
const math = require('mathjs');
const { ComplexArray } = require('jsfft');

const getFrequency = R.curry((hertz, freq, n) => {
    const magnitude = Math.sqrt((freq.real * freq.real) + (freq.imag * freq.imag));
    const f = (magnitude * 70000000) / n;
    return f;
});

const fourier = R.curry((f, width, imageData) => {
    const data = [];
    let u = 0;
    for (let i = 0; i < imageData.length; i += 4) {
        data[u] = imageData[i];
        u++;
    }

    const array = new ComplexArray(data.length).map((value, i, n) => {
        value.real = data[i] / 255;
    });

    let frequencies = array.FFT();

    let RealFrequencies = [];

    frequencies.map((freq, i, n) => {
        const f = getFrequency(undefined, freq, n);
        RealFrequencies[i] = f;
    })

    frequencies.map((freq, i, n) => f(freq, i, n, frequencies, RealFrequencies));

    frequencies = frequencies.InvFFT();

    const data2 = imageData.slice();

    let i = 0;
    for (let y = 0; y < width; y++) {
        for (let x = 0; x < width; x++) {
            const v = frequencies.real[i] * 255;
            const p = ((y * (width * 4)) + (x * 4));
            data2[p] = v;
            data2[p + 1] = v;
            data2[p + 2] = v;
            i++;
        }
    }

    return data2;
});

const bandNoise = (freq, i, n, frequencies, RealFrequencies) => {
    if (RealFrequencies[i] < 100) {
        freq.real = 0;
        freq.imag = 0;
    }
}

const bandLimitedNoise = fourier(bandNoise);

module.exports = {
    getFrequency,
    fourier,
    bandNoise,
    bandLimitedNoise
};