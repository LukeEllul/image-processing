import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import OriginalCanvas from './redux/components/OriginalCanvas';
import ProcessedCanvas from './redux/components/ProcessedCanvas';

const { createStore } = require('redux');
const { Provider } = require('react-redux');

const { initialState } = require('./redux/state/initialState');
const { root } = require('./redux/reducers/root');

// const App = _ =>
//     <div>
//         <canvas ref={canvas => {
//             const context = canvas.getContext('2d');
//             const image = new Image();
//             image.src = loc;

//             image.onload = function () {
//                 canvas.width = image.naturalWidth;
//                 canvas.height = image.naturalHeight;
//                 context.drawImage(image, 0, 0);

//                 const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;


//                 const newImageArray = R.pipe(
//                     grayscale,
//                     R.identity
//                 )(imageData);

//                 const newImageData = new ImageData(
//                     Uint8ClampedArray.from(newImageArray),
//                     canvas.width,
//                     canvas.height
//                 );

//                 context.putImageData(newImageData, 0, 0);
//             }
//         }} />
//     </div>

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    }
});

const store = createStore(root, initialState);

const App = ({classes}) =>
    <Provider store={store}>
        <div className={classes.root}>
            <OriginalCanvas />
            <ProcessedCanvas />
        </div>
    </Provider>;

export default withStyles(styles)(App);