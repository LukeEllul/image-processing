import ui from "../../ui/Convolution";
const R = require('ramda');
const { connect } = require('react-redux');
const { updateImageData } = require('../actions/actions');
const { mapStateToProps } = require('../connect/connect');
const {averageFilter, gaussianFilter} = require('../../Functions/functions');

const AverageFilter = connect(
    mapStateToProps,
    dispatch => ({
        update: (v, width, height, imageData) => 
            dispatch(updateImageData(averageFilter(width, height, v, imageData)))
    })
)(ui.Filter('Average Filter'));

const GaussianFilter = connect(
    mapStateToProps,
    dispatch => ({
        update: (v, width, height, imageData) =>
            dispatch(updateImageData(gaussianFilter(width, height, 5, v, imageData)))
    })
)(ui.Filter('Gaussian Filter'));

export default {
    AverageFilter,
    GaussianFilter
};