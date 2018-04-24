import React, { Component } from 'react';
import Plot from 'react-plotly.js';
const R = require('ramda');
const math = require('mathjs');
const { ComplexArray } = require('jsfft');

const loc = window.location + '/images/coins.png';

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

const fourier = width => imageData => {
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

    console.log(frequencies);

    frequencies.map((freq, i, n) => {
        if(i % 5 === 0){
            freq.real = 0;
            freq.imag = 0;
        }
    });

    frequencies = frequencies.InvFFT();

    const data2 = imageData.slice();

    let i = 0;
    for (let y = 0; y < width; y++) {
        for (let x = 0; x < width; x++) {
            const v = frequencies.real[i] * 255;
            const p = ((y * (width * 4)) + (x * 4));
            data2[p] = v
            data2[p + 1] = v;
            data2[p + 2] = v;
            i++;
        }
    }

    return data2;
}

const App = _ =>
    <div>
        <canvas ref={canvas => {
            const context = canvas.getContext('2d');
            const image = new Image();
            image.src = loc;

            image.onload = function () {
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                context.drawImage(image, 0, 0);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;


                const newImageArray = R.pipe(
                    grayscale,
                    fourier(image.width),
                    R.identity
                )(imageData);

                const newImageData = new ImageData(
                    Uint8ClampedArray.from(newImageArray),
                    canvas.width,
                    canvas.height
                );

                context.putImageData(newImageData, 0, 0);
            }
        }} />
    </div>

export default App;
