import ui from "../../ui/HistogramProcessing";
const R = require('ramda');
const { connect } = require('react-redux');
const { updateImageData } = require('../actions/actions');
const { mapStateToProps } = require('../connect/connect');
const {histogramEqualization, grayscale} = require('../../Functions/functions');

const HistogramEqualization = connect(
    mapStateToProps,
    dispatch => ({
        update: R.pipe(grayscale, histogramEqualization, updateImageData, dispatch)
    })
)(ui.HistogramEqualization);

const ImageHistogram = connect(
    mapStateToProps
)(ui.ImageHistogram);

export default {
    HistogramEqualization,
    ImageHistogram
};