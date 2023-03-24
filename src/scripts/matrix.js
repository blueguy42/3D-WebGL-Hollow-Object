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

function matrixMult4x1(x, y) {
    var res = [];
    var currElm = 0;
    for (var i = 0; i < 4; i++) {
        currElm = 0;
        for (var j = 0; j < 4; j++) {
            currElm += x[4 * i + j] * y[j];
        }
        res.push(currElm);
    }
    return res;
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function radToDeg(rad) {
    return rad * (180 / Math.PI);
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
    const radianX = degToRad(xt)
    const radianY = degToRad(yt)
    const radianZ = degToRad(zt)
    const xRotationMatrix = createXRotationMatrix(radianX)
    const yRotationMatrix = createYRotationMatrix(radianY)
    const zRotationMatrix = createZRotationMatrix(radianZ)
    let rotationMatrix = matrixMult4x4(xRotationMatrix, matrixMult4x4(yRotationMatrix, zRotationMatrix))
    return rotationMatrix;
}

const createXRotationMatrix = (radian) => {
    return [
        1, 0, 0, 0,
        0, Math.cos(radian), Math.sin(radian), 0,
        0, -Math.sin(radian), Math.cos(radian), 0,
        0, 0, 0, 1
    ];
};

const createYRotationMatrix = (radian) => {
    return [
        Math.cos(radian), 0, -Math.sin(radian), 0,    
        0, 1, 0, 0,
        Math.sin(radian), 0, Math.cos(radian), 0,
        0, 0, 0, 1
    ];
};

const createZRotationMatrix = (radian) => {
    return [
        Math.cos(radian), Math.sin(radian), 0, 0,
        -Math.sin(radian), Math.cos(radian), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
};

const createScaleMatrix = (scale) => {
    return [
        scale, 0, 0, 0,
        0, scale, 0, 0,
        0, 0, scale, 0,
        0, 0, 0, 1
    ];
}

const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];

const obliqueMatrix = (theta = 100, phi = 100) => {
    cotTheta = -1/Math.tan(degToRad(theta));
    cotPhi = -1/Math.tan(degToRad(phi));
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        cotTheta, cotPhi, 1, 0,
        0, 0, 0, 1
    ];
};

const createCamTranslationMatrix = (radius) => {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, radius
    ];
}

const perspectiveMatrix = (fov, near, far) => {
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const f = 1.0 / Math.tan(0.5 * fov)
    const rangeInv = 1.0 / (far - near);
    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv * (-1), -1,
        0, 0, ((-2 * near * far) + (near + far)) * rangeInv, 1
    ];
}