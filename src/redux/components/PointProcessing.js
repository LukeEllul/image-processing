import ui from "../../ui/PointProcessing";
const R = require('ramda');
const { connect } = require('react-redux');
const { invert, grayscale, binarize, otsuBinarize, logTransform, powerTransform } = require('../../Functions/functions');
const { updateImageData } = require('../actions/actions');
const { mapStateToProps } = require('../connect/connect');

const Negative = connect(
    mapStateToProps,
    dispatch => ({
        update: imageData => dispatch(updateImageData(invert(imageData)))
    })
)(ui.BasicButton('Invert'));

const Grayscale = connect(
    mapStateToProps,
    dispatch => ({
        update: imageData => dispatch(updateImageData(grayscale(imageData)))
    })
)(ui.BasicButton('Grayscale'));

const Binarize = connect(
    mapStateToProps,
    dispatch => ({
        update: (v, imageData) => dispatch(updateImageData(binarize(v)(grayscale(imageData))))
    })
)(ui.Binarize);

const AutoBinarize = connect(
    mapStateToProps,
    dispatch => ({
        update: imageData => dispatch(updateImageData(otsuBinarize(imageData)))
    })
)(ui.BasicButton('Automatic Binarization'));

const LogTransform = connect(
    mapStateToProps,
    dispatch => ({
        update: (v, imageData) => dispatch(updateImageData(logTransform(v)(imageData)))
    })
)(ui.LogTransform);

const PowerTransform = connect(
    mapStateToProps,
    dispatch => ({
        update: (v, imageData) => dispatch(updateImageData(powerTransform(1, v)(imageData)))
    })
)(ui.PowerTransform);

export default {
    Negative,
    Grayscale,
    Binarize,
    AutoBinarize,
    LogTransform,
    PowerTransform
};