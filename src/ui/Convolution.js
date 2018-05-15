import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from 'material-ui/Slider';
const R = require('ramda');

const style = theme => ({

});

const Filter = filterType => ({classes, width, height, update, imageData}) =>
    <div>
        <Typography variant="title">
            {filterType}
        </Typography>
        <Slider min={3} max={10} step={1} value={3}
            onChange={(_, value) => update(value, width, height, imageData)}/>
    </div>;

export default {
    Filter: type => withStyles(style)(Filter(type))
};