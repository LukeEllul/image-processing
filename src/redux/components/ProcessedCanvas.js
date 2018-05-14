import ui from '../../ui/ProcessedCanvas';
const { connect } = require('react-redux');

const ProcessedCanvas = connect(
    state => ({
        width: state.processedCanvas.width,
        height: state.processedCanvas.height,
        imageData: state.processedCanvas.ImageData
    })
)(ui);

export default ProcessedCanvas;