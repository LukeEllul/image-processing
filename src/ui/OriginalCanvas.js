import React from 'react';
import { withStyles } from '@material-ui/core/styles';
const R = require('ramda');

const styles = theme => ({

});

let canvas;

const OriginalCanvas = ({ classes, width, height, updateDimensions, updateImageData, imageSrc }) =>
    <div>
        <canvas width={width} height={height} ref={Canvas => {
            canvas || (canvas = Canvas);
            const context = canvas.getContext('2d');
            const image = new Image();
            image.src = imageSrc;

            image.onload = function () {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

                updateDimensions(canvas.width, canvas.height);
                updateImageData(imageData);
            }
        }} />
    </div>;

export default OriginalCanvas;