import React from 'react';
import { withStyles } from '@material-ui/core/styles';
const R = require('ramda');

const styles = theme => ({

});

let canvas;

const ProcessedCanvas = ({ classes, width, height, imageData }) =>
    <div>
        <canvas width={width} height={height} ref={Canvas => {
            canvas || (canvas = Canvas);
            const context = canvas.getContext('2d');

            if (imageData.length > 0) {
                const data = new ImageData(
                    Uint8ClampedArray.from(imageData),
                    width,
                    height
                );

                context.putImageData(data, 0, 0);
            }
        }} />
    </div>;

export default ProcessedCanvas;