import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import OriginalCanvas from './redux/components/OriginalCanvas';
import ProcessedCanvas from './redux/components/ProcessedCanvas';

import PointProcessing from './redux/components/PointProcessing';
import Histogram from './redux/components/Histogram';
import Noise from './redux/components/Noise';
import Convolution from './redux/components/Convolutions';
import Segmentation from './redux/components/Segmentation';

const { createStore } = require('redux');
const { Provider } = require('react-redux');

const { initialState } = require('./redux/state/initialState');
const { root } = require('./redux/reducers/root');

const styles = theme => ({
    root: {
        display: 'flex',
    },
    canvases: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        padding: theme.spacing.unit * 4
    },
    PointProcessing: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: theme.spacing.unit * 2
    },
    input: {
        display: 'none'
    },
    button: {
        margin: theme.spacing.unit
    }
});

const store = createStore(root, initialState);

const App = ({ classes }) =>
    <Provider store={store}>
        <div className={classes.root}>
            <div>
                <div className={classes.canvases}>
                    <OriginalCanvas />
                    <ProcessedCanvas />
                    <input 
                        accept="image/*"
                        className={classes.input}
                        id="flat-button-file"
                        multiple
                        type="file"
                        ref={input => {
                            input.onchange = function(){
                                const reader = new FileReader();
                                reader.onload = function(e){
                                    console.log(e);
                                    store.dispatch({
                                        CanvasName: 'originalCanvas',
                                        ImageName: 'originalImage',
                                        type: 'CHANGE_IMAGE_SRC',
                                        src: e.target.result
                                    });
                                }
                                reader.readAsDataURL(this.files[0]);
                            }
                        }}
                    />
                    <label htmlFor="flat-button-file">
                        <Button component="span" className={classes.button}>
                            Upload
                        </Button>
                    </label>
                </div>
            </div>
            <div>
                <Typography variant="title">
                    Point Processing
                </Typography>
                <div className={classes.PointProcessing}>
                    <PointProcessing.Negative/>
                    <PointProcessing.Grayscale/>
                    <PointProcessing.Binarize/>
                    <PointProcessing.AutoBinarize/>
                    <PointProcessing.LogTransform/>
                    <PointProcessing.PowerTransform/>
                </div>
                <Typography variant="title">
                    Histogram Processing
                </Typography>
                <div className={classes.PointProcessing}>
                    <Histogram.HistogramEqualization />
                    <Histogram.ImageHistogram />
                </div>
                <Typography variant="title">
                    Convolution Filtering
                </Typography>
                <div className={classes.PointProcessing}>
                    <Convolution.AverageFilter />
                    <Convolution.GaussianFilter />
                </div>
                <Typography variant="title">
                    Noise Filtering
                </Typography>
                <div className={classes.PointProcessing}>
                    <Noise.AddNoise />
                    <Noise.MedianFilter />
                    <Noise.MaxFilter />
                    <Noise.MinFilter />
                </div>
                <Typography variant="title">
                    Segmentation
                </Typography>
                <div className={classes.PointProcessing}>
                    <Segmentation />
                </div>
            </div>
        </div>
    </Provider>;

export default withStyles(styles)(App);