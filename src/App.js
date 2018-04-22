import React, { Component } from 'react';
import Plot from 'react-plotly.js';
const R = require('ramda');
const math = require('mathjs');

const loc = window.location + '/images/shyla.png';

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

const addSaltandPepper = R.curry((black, white, imageData) => {
    const data = imageData.slice();
    for(let i = 0; i < data.length; i += 4){
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
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            const p = [];
            for(let k = y - m; k < y + m; k++){
                for(let j = x - m; j < x + m; j++){
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
                    addSaltandPepper(3, 253),
                    medianFilter(canvas.width, canvas.height, 3),
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
