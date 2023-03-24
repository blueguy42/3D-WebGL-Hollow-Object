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
    if (current.model === cube) {
        document.getElementById("shape-cube").click();
    } else if (current.model === triangularPrism) {
        document.getElementById("shape-triangular-prism").click();
    } else if (current.model === pyramid) {
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
    document.querySelector("#zoom-slider").value = (current.view.radius+1)*50;
    document.querySelector("#zoom-value").innerHTML = `${(current.view.radius+1)*50} %`;

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