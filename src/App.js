import React, { Component } from 'react';
const R = require('ramda');

const loc = window.location + '/images/shyla.png';

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
                
                const newImageArray = imageData;

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
