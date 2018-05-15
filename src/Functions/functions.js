const { averageFilter, gaussianFilter } = require('./Convolution/Convolution');
const { zeros, histogramGrayLevel, histogramEqualization } = require('./Histogram/HistogramProcessing');
const { medianFilter, maxFilter, minFilter, addSaltandPepper } = require('./Noise/noise');
const {
    invert,
    grayscale,
    binarize,
    otsuBinarize,
    logTransform,
    powerTransform
} = require('./PointProcessing/PointProcessing');
const { TwoPass } = require('./Segmentation/Segmentation');

module.exports = {
    averageFilter,
    gaussianFilter,
    histogramGrayLevel,
    histogramEqualization,
    medianFilter,
    maxFilter,
    minFilter,
    addSaltandPepper,
    invert,
    grayscale,
    binarize,
    otsuBinarize,
    logTransform,
    powerTransform,
    TwoPass
};