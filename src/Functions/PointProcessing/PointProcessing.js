const invert = imageData => {
    const data = imageData.slice();
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }

    return data;
};

const grayscale = imageData => {
    const data = imageData.slice();
    for(let i = 0; i < data.length; i += 4){
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
    return data;
};

module.exports = {
    invert,
    grayscale
};