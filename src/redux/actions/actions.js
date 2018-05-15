const updateImageData = imageData => ({
    CanvasName: 'processedCanvas',
    type: 'CANVAS_CHANGE_IMAGEDATA',
    imagedata: imageData
});

module.exports = {
    updateImageData
};