const R = require('ramda');
const { change, changeName } = require('../redux-utils/index');
const { Image } = require('./Image');

const Canvas = (state = {}, action) =>
    state.CanvasName === action.CanvasName ? ({
        CanvasName: changeName('CANVAS')(state.CanvasName, action),
        width: change('CANVAS', 'WIDTH', 0)(state.width, action),
        height: change('CANVAS', "HEIGHT", 0)(state.height, action),
        image: Image(state.image, action),
        ImageData: change('CANVAS', 'IMAGEDATA', [])(state.ImageData, action)
    }) : state;

module.exports = {
    Canvas
};