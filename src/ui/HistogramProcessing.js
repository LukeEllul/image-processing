import React from 'react';
import Plot from 'react-plotly.js';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ui from './PointProcessing';
const R = require('ramda');
const { histogramGrayLevel } = require('../Functions/functions');

const style = theme => ({
    button: {
        margin: theme.spacing.unit
    }
});

const HistogramEqualization = ui.BasicButton('Histogram Equalization');

const ImageHistogram = ({classes, imageData}) =>
    <div>
        <Plot data={[
            {
                type: 'bar',
                x: R.range(0, 256),
                y: (histogramGrayLevel(imageData))
            }
        ]}/>
    </div>;

export default {
    HistogramEqualization,
    ImageHistogram
};