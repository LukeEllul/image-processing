import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ui from './PointProcessing';
const { histogramGrayLevel } = require('../Functions/functions');

const style = theme => ({

});

const HistogramEqualization = ui.BasicButton('Histogram Equalization');

const ImageHistogram = ({classes, imageData}) =>
    <div>
        
    </div>