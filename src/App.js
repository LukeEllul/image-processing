import React, { Component } from 'react';
import Plot from 'react-plotly.js';
const R = require('ramda');
const math = require('mathjs');
const { otsuBinarize, binarize } = require('./Functions/PointProcessing/PointProcessing');

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
