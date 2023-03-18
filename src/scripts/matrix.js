function matrixMult4x4(x, y) {
    var res = [];
    var currElm = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            currElm = 0;
            for (var k = 0; k < 4; k++) {
                currElm += y[4 * i + k] * x[4 * k + j];
            }
            res.push(currElm);
        }
    }
    return res;
}

const createTranslationMatrix = (x, y, z) => {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
    ];
};

const createRotationMatrix = (xt, yt, zt) => {
    // TODO: Implement
    return identityMatrix;
}

const createScaleMatrix = (x, y, z) => {
    // TODO: Implement
    return identityMatrix;
}

const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];