import ui from "../../ui/Noise";
const R = require('ramda');
const { connect } = require('react-redux');
const { updateImageData } = require('../actions/actions');
const { mapStateToProps } = require('../connect/connect');
const {medianFilter, maxFilter, minFilter, addSaltandPepper, grayscale} = require('../../Functions/functions');

const AddNoise = connect(
    mapStateToProps,
    dispatch => ({
        update: (n, v, imageData) => 
            dispatch(updateImageData(addSaltandPepper(n, v, grayscale(imageData))))
    })
)(ui.AddNoise);

const makeFilter = (f, type) => connect(
    state => ({
        width: state.processedCanvas.width,
        height: state.processedCanvas.height,
        imageData: state.processedCanvas.ImageData
    }),
    dispatch => ({
        update: (width, height, v, imageData) =>
            dispatch(updateImageData(f(width, height, v, grayscale(imageData))))
    })
)(ui.Filter(type));

const MedianFilter = makeFilter(medianFilter, 'Median Filter');
const MaxFilter = makeFilter(maxFilter, 'Maximum Filter');
const MinFilter = makeFilter(minFilter, 'Minimum Filter');

export default {
    AddNoise,
    MedianFilter,
    MaxFilter,
    MinFilter
};