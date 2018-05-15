import ui from "../../ui/Segmentation";
const R = require('ramda');
const { connect } = require('react-redux');
const { updateImageData } = require('../actions/actions');
const { mapStateToProps } = require('../connect/connect');
const { TwoPass, otsuBinarize, grayscale } = require('../../Functions/functions');

const Segmentation = connect(
    mapStateToProps,
    dispatch => ({
        update: (width, height, imageData) => 
            dispatch(updateImageData(TwoPass(width, height, otsuBinarize(grayscale(imageData)))))
    })
)(ui.Segmentation);

export default {
    Segmentation
};