const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
const program = gl.createProgram();
var positionAttributeLocation = null
var transformationMatrixUniformLocation = null
var colorUniformLocation = null
var uProjectionMatrixUniformLocation = null
var fovUniformLocation = null
var current = {}

const shaderVertex = `
attribute vec3 position;
uniform float fov;

uniform mat4 transformationMatrix;
uniform mat4 uProjectionMatrix;
varying float colorFactor;

void main(void) {
    vec4 transformedPos = transformationMatrix * vec4(position.xy, position.z * -1.0, 1.0);
    vec4 projectedPos   =  transformedPos;
    if (fov < 0.01)
        gl_Position = projectedPos;
    else {
        float zDivider = 2.0 + projectedPos.z * fov;
        gl_Position = vec4(projectedPos.xy / zDivider, projectedPos.zw);
    }
    colorFactor = min(max((1.25 - transformedPos.z) / 2.0, 0.0), 1.0);
}
`

const shaderFragment = `
    precision mediump float;
    uniform vec3 userColor;
    varying float colorFactor;
    void main(void) {
        gl_FragColor = vec4(userColor * colorFactor, 1.0);
    }
`

const flatShaderFragment = `
    precision mediump float;
    uniform vec3 userColor;
    void main(void) {
        gl_FragColor = vec4(userColor, 1.0);
    }
`

function main() {
    resetCanvas();
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    initializeProgram();
}

function initializeProgram() {
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, shaderVertex);
    gl.compileShader(vertexShader);
    gl.attachShader(program, vertexShader);

    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, current.shader ? shaderFragment : flatShaderFragment);
    gl.compileShader(fragmentShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    positionAttributeLocation = gl.getAttribLocation(program, "position");
    transformationMatrixUniformLocation = gl.getUniformLocation(program, "transformationMatrix");
    uProjectionMatrixUniformLocation = gl.getUniformLocation(program, "uProjectionMatrix");
    colorUniformLocation = gl.getUniformLocation(program, "userColor");
    fovUniformLocation  = gl.getUniformLocation(program, "fov");

    requestAnimationFrame(render);
}

function resetCanvas() {
    document.getElementById("color-picker").value = "#ff0000";
    document.querySelectorAll("#translation-popup .slider").forEach((slider) => {
        slider.value = 0;
        document.querySelector("#" + slider.id + "-value").innerHTML = "X: 0";
    });
    current = {
        model: cube,
        transformation: {
            translation: [0, 0, 0],
            rotation   : [0, 0, 0],
            scale      : [1, 1, 1],
        },
        view: {
            rotation: 0,
            radius: 0.1
        },
        color: hexToRGBColor(document.getElementById("color-picker").value),
        shader: true,
        projection: null,
        fov: 1
    }
    document.getElementById("shape-cube").click();
}

function computeTransformMatrix() {
    var transformMatrix;
    var translation = current.transformation.translation;
    // var scale = current.transformation.scale;
    // var rotation = current.transformation.rotation;

    transformMatrix = createTranslationMatrix(translation[0], translation[1], translation[2]);
    return transformMatrix;
}

function render() {
    var vertexBuffer = gl.createBuffer();
    var indexBuffer  = gl.createBuffer();

    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    
    // gl.uniformMatrix4fv(uProjectionMatrixUniformLocation, false, matrixMult(projectionMatrix("pers"), computeViewMatrix()));
    gl.uniformMatrix4fv(transformationMatrixUniformLocation, false, new Float32Array(computeTransformMatrix()));
    gl.uniform3fv(colorUniformLocation, new Float32Array(current.color));
    gl.uniform1f(fovUniformLocation, current.fov);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(current.model.vertices), gl.STATIC_DRAW);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(current.model.indices), gl.STATIC_DRAW);

    gl.drawElements(gl.TRIANGLES, current.model.indices.length, gl.UNSIGNED_SHORT, 0);
    window.requestAnimationFrame(render);
}
main();