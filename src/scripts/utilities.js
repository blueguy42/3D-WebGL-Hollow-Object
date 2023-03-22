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
    } // else if ...

    // Sync Translation
    document.querySelectorAll("#translation-popup .slider").forEach((slider) => {
        slider.value = current.transformation.translation[
            document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) === "X: " ? 0
            : document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) === "Y: " ? 1
            : 2
        ] * 100;
        document.querySelector("#" + slider.id + "-value").innerHTML = document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) + slider.value;
    });

    // Sync Rotation
    document.querySelectorAll("#rotate-popup .slider").forEach((slider) => {
        slider.value = current.transformation.rotation[
            document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) === "X: " ? 0
            : document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) === "Y: " ? 1
            : 2
        ] * 100;
        document.querySelector("#" + slider.id + "-value").innerHTML = document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) + slider.value + "°";
    });

    // Sync Scale
    document.querySelectorAll("#scaling-popup .slider").forEach((slider) => {
        slider.value = current.transformation.scale[
            document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) === "X: " ? 0
            : document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) === "Y: " ? 1
            : 2
        ] * 100;
        document.querySelector("#" + slider.id + "-value").innerHTML = document.querySelector("#" + slider.id + "-value").innerHTML.substring(0,3) + slider.value;
    });

    // Sync Shader
    if ((current.shader && !document.querySelector("#btn-shader").hasAttribute("checked")) || (!current.shader && document.querySelector("#btn-shader").hasAttribute("checked"))) {
        current.shader = !current.shader;
        document.querySelector("#btn-shader").click();
    }
}