const mapStateToProps = state => ({
    imageData: state.originalCanvas.ImageData,
    width: state.processedCanvas.width,
    height: state.processedCanvas.height
});

module.exports = {
    mapStateToProps
};