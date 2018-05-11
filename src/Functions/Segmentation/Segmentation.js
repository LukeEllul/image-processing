const R = require('ramda');

const min = a => a.reduce(R.min);

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getRandomColor() {
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while(length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
  }

const TwoPass = R.curry(function (width, height, imageData) {
    const linked = [];
    const labels = [];
    let NextLabel = 0;
    for (let i = 0; i < imageData.length; i += 4) {
        labels[i] = 0;
        labels[i + 1] = 0;
        labels[i + 2] = 0;
        labels[i + 3] = imageData[i + 3];
    }

    //first pass
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (imageData[((y * (width * 4)) + (x * 4))] !== 0) {
                const Neighbors = [[y, x - 1], [y - 1, x - 1], [y - 1, x], [y - 1, x + 1], [y, x + 1], [y + 1, x + 1], [y + 1, x], [y + 1, x - 1]];
                const neighborsIndexes = Neighbors.map(([y, x]) => ((y * (width * 4)) + (x * 4))).filter(i => labels[i] ? true : false);
                const neighbors = neighborsIndexes.map(i => imageData[i] || 0).filter(v => v !== 0);

                const i = ((y * (width * 4)) + (x * 4));

                if (neighbors.length === 0) {
                    linked[NextLabel] = [NextLabel];
                    labels[i] = NextLabel;
                    labels[i + 1] = NextLabel;
                    labels[i + 2] = NextLabel;
                    NextLabel++;
                }

                else {
                    const L = neighborsIndexes.map(i => labels[i] || 0);
                    const n = min(L);
                    labels[i] = n;
                    labels[i + 1] = n;
                    labels[i + 3] = n;

                    for (let i = 0; i < L.length; i++) {
                        linked[L[i]] = R.union(linked[L[i]], L);
                    }
                }
            }
        }
    }

    const colors = linked.map(_ => hexToRgb(getRandomColor()));

    //second pass
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = ((y * (width * 4)) + (x * 4));
            if (imageData[i] !== 0) {
                const label = labels[i];
                const n = min(linked[label]);
                const color = colors[n];
                labels[i] = color.r;
                labels[i + 1] = color.g;
                labels[i + 2] = color.b;
                labels[i + 3] = 255;
            }
        }
    }

    return labels;
});

module.exports = {
    TwoPass
};