const initialState = {
    originalCanvas: {
        CanvasName: 'originalCanvas',
        image: {
            ImageName: 'originalImage',
            src: window.location + '/images/coins.png'
        },
        ImageData: []
    },
    processedCanvas: {
        CanvasName: 'processedCanvas',
        image: {
            ImageName: 'processedImage'
        },
        ImageData: []
    }
};

module.exports = {
    initialState
};