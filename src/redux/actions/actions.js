const updateImageData = imageData => ({
    CanvasName: 'processedCanvas',
    type: 'CHANGE_CANVAS_IMAGEDATA',
    imagedata: imageData
});

module.exports = {
    updateImageData
};