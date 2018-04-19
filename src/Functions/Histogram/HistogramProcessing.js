const R = require('ramda');

const zeros = imageData => {
    const data = imageData.slice();
    for(let i = 0; i < data.length; i += 4){
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
    }
    return data;
}

const histogramGrayLevel = imageData => {
    return R.range(0, 256).map(n => {
        let i = 0;
        for (let j = 0; j < imageData.length; j += 4)
            imageData[j] === n && i++;
        return i;
    });
}

const histogramEqualization = imageData => {
    const hitogramCounts = histogramGrayLevel(imageData);
    const N = R.sum(hitogramCounts);
    const intensityLevels = R.uniq(imageData);
    const imEq = zeros(imageData);

    for(let i = 0; i < intensityLevels.length; i++){
        const currentIntensity = intensityLevels[i];
        const n = R.sum(hitogramCounts.slice(0, currentIntensity));

        for(let j = 0; j < imageData.length; j += 4){
            if(imageData[j] === currentIntensity){
                const s = (n / N) * 255;
                imEq[j] = s;
                imEq[j + 1] = s;
                imEq[j + 2] = s;
            }
        }
    }

    return imEq;
}

module.exports = {
    zeros,
    histogramGrayLevel,
    histogramEqualization
};