import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
const R = require('ramda');

const style = theme => ({
    button: {
        margin: theme.spacing.unit
    }
});

const BasicButton = style => R.pipe(
    text => ({ classes, imageData, update }) =>
        <Button className={classes.button} color="primary"
            onClick={_ => update(imageData)}>
            {text}
        </Button>,
    withStyles(style)
);

const Binarize = ({ classes, imageData, update }) =>
    <div>
        <Typography variant="subheading">
            Binarize
        </Typography>
        <Slider min={0} max={255} step={1} defaultValue={77}
            onChange={(value) => update(value, imageData)} />
    </div>

const LogTransform = ({ classes, imageData, update }) =>
    <div>
        <Typography variant="subheading">
            Log Transform
        </Typography>
        <Slider min={1} max={10} step={1}
            onChange={(value) => update(value, imageData)} />
    </div>;

const PowerTransform = ({ classes, imageData, update }) =>
    <div>
        <Typography variant="subheading">
            Power Transform
        </Typography>
        <Typography variant="subheading">
            Ɣ
        </Typography>
        <Slider min={0.04} max={10}
            onChange={(value) => update(value * 2, imageData)} />
    </div>;

export default {
    BasicButton: BasicButton(style),
    Binarize: withStyles(style)(Binarize),
    LogTransform: withStyles(style)(LogTransform),
    PowerTransform: withStyles(style)(PowerTransform)
};