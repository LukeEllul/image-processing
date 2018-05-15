import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from 'material-ui/Slider';
const R = require('ramda');

const style = theme => ({
    button: {
        margin: theme.spacing.unit
    }
});

const Segmentation = ({classes, width, height, imageData, update}) =>
    <div>
        <Button className={classes.button} color="primary" 
            onClick={_ => update(width, height, imageData)}>
            Segment
        </Button>
    </div>;

export default {
    Segmentation: withStyles(style)(Segmentation)
};