import ui from '../../ui/OriginalCanvas';
const { connect } = require('react-redux');

const OriginalCanvas = connect(
    state => ({
        width: state.originalCanvas.width,
        height: state.originalCanvas.height,
        imageSrc: state.originalCanvas.image.src,
    }),
    dispatch => ({
        updateDimensions: (width, height) => (
            dispatch({
                CanvasName: 'processedCanvas',
                type: 'CHANGE_CANVAS_WIDTH',
                width: width
            }),
            dispatch({
                CanvasName: 'processedCanvas',
                type: 'CHANGE_CANVAS_HEIGHT',
                height: height
            })
        ),
        updateImageData: imageData => dispatch({
            CanvasName: 'processedCanvas',
            type: 'CHANGE_CANVAS_IMAGEDATA',
            imagedata: imageData
        })
    })
)(ui);

export default OriginalCanvas;