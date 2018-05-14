const { change, List } = require('../redux-utils/index');
const { Canvas } = require('./Canvas');
const { Technique } = require('./Technique');

const root = (state = {}, action) => ({
    originalCanvas: Canvas(state.originalCanvas, action),
    processedCanvas: Canvas(state.processedCanvas, action),
    Techniques: List(Technique)(state.Techniques, action)
});

module.exports = {
    root
};