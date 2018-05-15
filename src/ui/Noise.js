import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from 'material-ui/Slider';
const R = require('ramda');

const style = theme => ({

});

const AddNoise = ({classes, imageData, update}) =>
    <div>
        <Typography variant="title">
            Add Salt and Pepper
        </Typography>
        <Slider min={240} max={255} step={1} value={252}
            onChange={(_, value) => update(3, value, imageData)}/>
    </div>;

const Filter = type => ({classes, width, height, imageData, update}) =>
    <div>
        <Typography variant="title">
            {type}
        </Typography>
        <Slider min={5} max={20} step={1} value={10}
            onChange={(_, value) => update(width, height, value, imageData)}/>
    </div>;

export default {
    AddNoise: withStyles(style)(AddNoise),
    Filter: type => withStyles(style)(Filter(type))
};