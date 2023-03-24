function loadModel(modelName) {
    var fileName;
    if (modelName === "cube") {
        fileName = "../test/cube.json";
    } else if (modelName === "triangularPrism") {
        fileName = "../test/triangularPrism.json";
    } else if (modelName === "pyramid") {
        fileName = "../test/pyramid.json";
    }
    const request = new XMLHttpRequest();
    request.open('GET', fileName, false);
    request.send(null);

    if (request.status === 200) {
        const data = JSON.parse(request.responseText);
        return data
    } else {
        console.error('Failed to load JSON file.');
    }
}

function hexToRGBColor(hex) {
    var bigint = parseInt(hex.replace("#", ""), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return [r / 255, g / 255, b / 255];
}

function syncToolsFromCurrent() {
    // Sync Projection
    if (current.projection === "orthographic") {
        document.getElementById("btn-projection-orthographic").click();
    } else if (current.projection === "perspective") {
        document.getElementById("btn-projection-perspective").click();
    } else if (current.projection === "oblique") {
        document.getElementById("btn-projection-oblique").click();
    }

    // Sync Shape
    if (current.model.name === "cube") {
        document.getElementById("shape-cube").click();
    } else if (current.model.name === "triangularPrism") {
        document.getElementById("shape-triangular-prism").click();
    } else if (current.mode.name === "pyramid") {
        document.getElementById("shape-pyramid").click();
    } 

    // Sync Translation
    document.querySelectorAll("#translation-popup .slider").forEach((slider) => {
        slider.value = current.transformation.translation[
            document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) === "X: " ? 0
            : document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) === "Y: " ? 1
            : 2
        ] * 100;
        document.querySelector("#" + slider.id + "-value").innerHTML = document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) + slider.value/100;
    });

    // Sync Rotation
    document.querySelectorAll("#rotate-popup .slider").forEach((slider) => {
        slider.value = current.transformation.rotation[
            document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) === "X: " ? 0
            : document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) === "Y: " ? 1
            : 2
        ];
        document.querySelector("#" + slider.id + "-value").innerHTML = document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) + slider.value + "°";
    });

    // Sync Scale
    document.querySelectorAll("#scaling-popup .slider").forEach((slider) => {
        slider.value = current.transformation.scale;
        document.querySelector("#scaling-value").innerHTML = `Scale: ${current.transformation.scale}x`;
    });

    // Sync Radius
    document.querySelector("#zoom-slider").value = (current.view.radius+1)*100/2;
    document.querySelector("#zoom-value").innerHTML = `${(-current.view.radius+1)*100/2} %`;

    // Sync Shader
    if ((current.shader && !document.querySelector("#btn-shader").hasAttribute("checked")) || (!current.shader && document.querySelector("#btn-shader").hasAttribute("checked"))) {
        current.shader = !current.shader;
        document.querySelector("#btn-shader").click();
    }

    // Sync Oblique Parameters
    document.querySelectorAll("#oblique-params .slider").forEach((slider) => {
        slider.value = current.oblique[
            document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,7) === "Theta: " ? "theta"
            : "phi"
        ];
        if (slider.id === "oblique-theta") {
            document.querySelector("#" + slider.id + "-value").innerHTML = "Theta: " + slider.value + "°";
        } else {
            document.querySelector("#" + slider.id + "-value").innerHTML = "Phi: " + slider.value + "°";
        }
    });

    // Sync Perspective Parameters
    document.querySelectorAll("#perspective-params .slider").forEach((slider) => {
        if (slider.id === "perspective-fov") {
            slider.value = radToDeg(current.perspective.fov).toFixed(0);
            document.querySelector("#" + slider.id + "-value").innerHTML = "FOV: " + slider.value + "°";
        } else if (slider.id === "perspective-far") {
            slider.value = current.perspective.far;
            document.querySelector("#" + slider.id + "-value").innerHTML = "Far: " + slider.value;
        } else if (slider.id === "perspective-near") {
            slider.value = current.perspective.near;
            document.querySelector("#" + slider.id + "-value").innerHTML = "Near: " + slider.value;
        }
    });

    // Sync Animation
    document.querySelectorAll("#animation-popup .slider").forEach((slider) => {
        slider.value = current.animation.speed[
            document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,1) === "X" ? 0
            : document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,1) === "Y" ? 1
            : 2
        ];
        document.querySelector("#" + slider.id + "-value").innerHTML = `${document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,1)} Speed: ${slider.value}°/s`;
    });

    if (current.animation.enabled) {
        document.getElementById('btn-animation-enable').innerHTML = "Disable";
        animate();
    } else {
        document.getElementById('btn-animation-enable').innerHTML = "Enable";
    }
}

function applyTransformationToCurrentVertices() {
    var transformMatrix = computeTransformMatrix();
    var vertices = current.model.vertices;
    var transformedModel = {
        vertices: [],
        indices: current.model.indices
    };

    for (var i = 0; i < vertices.length; i+=6) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];

        var transformed = matrixMult4x1(transformMatrix, [x, y, z, 1]);

        transformedModel.vertices.push(transformed[0] + transformMatrix[12]);
        transformedModel.vertices.push(transformed[1] + transformMatrix[13]);
        transformedModel.vertices.push(transformed[2] - transformMatrix[14]);
        transformedModel.vertices.push(vertices[i+3]);
        transformedModel.vertices.push(vertices[i+4]);
        transformedModel.vertices.push(vertices[i+5]);
    }

    return transformedModel;
}

// repeat function animation that adds current animation speed to current transformation rotation with settimeout 50
function animate() {
    if (current.animation.enabled) {
        current.transformation.rotation[0] += current.animation.speed[0]/100;
        current.transformation.rotation[1] += current.animation.speed[1]/100;
        current.transformation.rotation[2] += current.animation.speed[2]/100;

        for (let i = 0; i < 3; i++) {
            if (current.transformation.rotation[i] > 180) {
                current.transformation.rotation[i] -= 360;
            } else if (current.transformation.rotation[i] < -180) {
                current.transformation.rotation[i] += 360;
            }
        }

        document.querySelectorAll("#rotate-popup .slider").forEach((slider) => {
            slider.value = current.transformation.rotation[
                document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) === "X: " ? 0
                : document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) === "Y: " ? 1
                : 2
            ];
            document.querySelector("#" + slider.id + "-value").innerHTML = document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) + slider.value + "°";
        });

        setTimeout(animate, 10);
    }
}