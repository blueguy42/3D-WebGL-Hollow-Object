// Popup Event Listeners
document.getElementById('btn-tool-hide').addEventListener('click', function() {
    document.querySelector('.floating-sidebar').classList.toggle('hide');
    document.querySelector('.floating-sidebar-top').classList.toggle('hide');
    document.querySelector('.floating-sidebar-bottom').classList.toggle('hide');
    document.querySelector('.popup').classList.toggle('hide');
});

document.getElementById('btn-tool-shapes').addEventListener('click', function() {
    document.querySelectorAll('.popup').forEach(function(popup) {
        if (popup.id !== 'shapes-popup') {
            popup.classList.remove('show');
        }
    });
    document.getElementById('shapes-popup').classList.toggle('show');
    document.querySelectorAll('.btn-tools').forEach(function(tool) {
        if (tool.id !== 'btn-tool-shapes') {
            tool.classList.remove('active');
        }
    });
    this.classList.toggle('active');
});

document.getElementById('btn-tool-translation').addEventListener('click', function() {
    document.querySelectorAll('.popup').forEach(function(popup) {
        if (popup.id !== 'translation-popup') {
            popup.classList.remove('show');
        }
    });
    document.getElementById('translation-popup').classList.toggle('show');
    document.querySelectorAll('.btn-tools').forEach(function(tool) {
        if (tool.id !== 'btn-tool-translation') {
            tool.classList.remove('active');
        }
    });
    this.classList.toggle('active');
});

document.getElementById('btn-tool-scaling').addEventListener('click', function() {
    document.querySelectorAll('.popup').forEach(function(popup) {
        if (popup.id !== 'scaling-popup') {
            popup.classList.remove('show');
        }
    });
    document.getElementById('scaling-popup').classList.toggle('show');
    document.querySelectorAll('.btn-tools').forEach(function(tool) {
        if (tool.id !== 'btn-tool-scaling') {
            tool.classList.remove('active');
        }
    });
    this.classList.toggle('active');
});

document.getElementById('btn-tool-rotate').addEventListener('click', function() {
    document.querySelectorAll('.popup').forEach(function(popup) {
        if (popup.id !== 'rotate-popup') {
            popup.classList.remove('show');
        }
    });
    document.getElementById('rotate-popup').classList.toggle('show');
    document.querySelectorAll('.btn-tools').forEach(function(tool) {
        if (tool.id !== 'btn-tool-rotate') {
            tool.classList.remove('active');
        }
    });
    this.classList.toggle('active');
});

document.getElementById('btn-tool-zoom').addEventListener('click', function() {
    document.querySelectorAll('.popup').forEach(function(popup) {
        if (popup.id !== 'zoom-popup') {
            popup.classList.remove('show');
        }
    });
    document.getElementById('zoom-popup').classList.toggle('show');
    document.querySelectorAll('.btn-tools').forEach(function(tool) {
        if (tool.id !== 'btn-tool-zoom') {
            tool.classList.remove('active');
        }
    });
    this.classList.toggle('active');
});

document.getElementById('zoom-slider').addEventListener('input', function() {
    current.view.radius = -((this.value/100*2)-1);
    document.getElementById('zoom-value').innerHTML = this.value + '%';
});

document.getElementById('btn-tool-projection').addEventListener('click', function() {
    document.querySelectorAll('.popup').forEach(function(popup) {
        if (popup.id !== 'projection-popup') {
            popup.classList.remove('show');
        }
    });
    document.getElementById('projection-popup').classList.toggle('show');
    document.querySelectorAll('.btn-tools').forEach(function(tool) {
        if (tool.id !== 'btn-tool-projection') {
            tool.classList.remove('active');
        }
    });
    this.classList.toggle('active');
});

document.getElementById('btn-tool-animation').addEventListener('click', function() {
    document.querySelectorAll('.popup').forEach(function(popup) {
        if (popup.id !== 'animation-popup') {
            popup.classList.remove('show');
        }
    });
    document.getElementById('animation-popup').classList.toggle('show');
    document.querySelectorAll('.btn-tools').forEach(function(tool) {
        if (tool.id !== 'btn-tool-animation') {
            tool.classList.remove('active');
        }
    });
    this.classList.toggle('active');
});

// Tools Event Listeners
document.getElementById('shape-cube').addEventListener('click', function() {
    if (this.classList.contains('active')) return;
    document.querySelectorAll('.btn-shapes').forEach(function(shape) {
        shape.classList.remove('active');
    });
    this.classList.add('active');
    current.model = loadModel("cube");
});

document.getElementById('shape-triangular-prism').addEventListener('click', function() {
    if (this.classList.contains('active')) return;
    document.querySelectorAll('.btn-shapes').forEach(function(shape) {
        shape.classList.remove('active');
    });
    this.classList.add('active');
    current.model = loadModel("triangularPrism");
});

document.getElementById('shape-pyramid').addEventListener('click', function() {
    if (this.classList.contains('active')) return;
    document.querySelectorAll('.btn-shapes').forEach(function(shape) {
        shape.classList.remove('active');
    });
    this.classList.add('active');
    current.model = loadModel("pyramid");
});

window.addEventListener('resize', function() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

// translation
document.getElementById('translation-x').addEventListener('input', function() {
    current.transformation.translation[0] = this.value/100;
    document.getElementById('translation-x-value').innerHTML = "X: " + this.value/100;
});

document.getElementById('translation-y').addEventListener('input', function() {
    current.transformation.translation[1] = this.value/100;
    document.getElementById('translation-y-value').innerHTML = "Y: " + this.value/100;
});

document.getElementById('translation-z').addEventListener('input', function() {
    current.transformation.translation[2] = this.value/100;
    document.getElementById('translation-z-value').innerHTML = "Z: " + this.value/100;
});

// scaling
document.getElementById('scaling').addEventListener('input', function() {
    current.transformation.scale = this.value;
    document.getElementById('scaling-value').innerHTML = `Scale: ${this.value}x`;
});

// rotation
document.getElementById('rotate-x').addEventListener('input', function() {
    current.transformation.rotation[0] = this.value;
    document.getElementById('rotate-x-value').innerHTML = "X: " + this.value + "°";
});

document.getElementById('rotate-y').addEventListener('input', function() {
    current.transformation.rotation[1] = this.value;
    document.getElementById('rotate-y-value').innerHTML = "Y: " + this.value + "°";
});

document.getElementById('rotate-z').addEventListener('input', function() {
    current.transformation.rotation[2] = this.value;
    document.getElementById('rotate-z-value').innerHTML = "Z: " + this.value + "°";
});

document.getElementById('btn-shader').addEventListener('click', function() {
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    gl.detachShader(program, fragmentShader);
    gl.detachShader(program, vertexShader);
    current.shader = !current.shader;
    initializeProgram();
    this.toggleAttribute('checked');
});

document.getElementById('btn-reset').addEventListener('click', function() {
    if (!current.shader) {
        document.getElementById('btn-shader').click();
    }
    resetCanvas(current.model);
});

document.getElementById('btn-tool-help').addEventListener('click', function() {
    document.querySelector('.modal-background').classList.add('show');
    document.querySelector('.modal-help').classList.add('show');
});

document.querySelector('.modal-background').addEventListener('click', function() {
    document.querySelector('.modal-background').classList.remove('show');
    document.querySelector('.modal-help').classList.remove('show');
});

document.getElementById('btn-modal-help-close').addEventListener('click', function() {
    document.querySelector('.modal-background').classList.remove('show');
    document.querySelector('.modal-help').classList.remove('show');
});

document.getElementById('btn-projection-orthographic').addEventListener('click', function() {
    if (this.classList.contains('active')) return;
    document.querySelectorAll('.btn-projection').forEach(function(btn) {
        btn.classList.remove('active');
    });
    this.classList.add('active');
    document.querySelector('#oblique-params').classList.remove('show');
    document.querySelector('#perspective-params').classList.remove('show');
    current.projection = "orthographic";
});

document.getElementById('btn-projection-oblique').addEventListener('click', function() {
    if (this.classList.contains('active')) return;
    document.querySelectorAll('.btn-projection').forEach(function(btn) {
        btn.classList.remove('active');
    });
    document.querySelector('#oblique-params').classList.add('show');
    document.querySelector('#perspective-params').classList.remove('show');
    this.classList.add('active');
    current.projection = "oblique";
});

document.getElementById('oblique-theta').addEventListener('input', function() {
    current.oblique.theta = this.value;
    document.getElementById('oblique-theta-value').innerHTML = "Theta: " + this.value + "°";
});

document.getElementById('oblique-phi').addEventListener('input', function() {
    current.oblique.phi = this.value;
    document.getElementById('oblique-phi-value').innerHTML = "Phi: " + this.value + "°";
});

document.getElementById('btn-projection-perspective').addEventListener('click', function() {
    if (this.classList.contains('active')) return;
    document.querySelectorAll('.btn-projection').forEach(function(btn) {
        btn.classList.remove('active');
    });
    document.querySelector('#oblique-params').classList.remove('show');
    document.querySelector('#perspective-params').classList.add('show');
    this.classList.add('active');
    current.projection = "perspective";
    document.getElementById('perspective-fov-value').innerHTML = "FOV: " + radToDeg(current.perspective.fov).toFixed(0) + "°";
});

document.getElementById('perspective-fov').addEventListener('input', function() {
    current.perspective.fov = degToRad(this.value);
    document.getElementById('perspective-fov-value').innerHTML = "FOV: " + this.value + "°";
});

document.getElementById('perspective-near').addEventListener('input', function() {
    current.perspective.near = +this.value;
    document.getElementById('perspective-near-value').innerHTML = "Near: " + this.value;
});

document.getElementById('perspective-far').addEventListener('input', function() {
    current.perspective.far = +this.value;
    document.getElementById('perspective-far-value').innerHTML = "Far: " + this.value;
});

document.getElementById('canvas').addEventListener("mousedown", function(e) {
    current.mouse.dragging = true;
    current.mouse.origin.x = e.pageX;
    current.mouse.origin.y = e.pageY;
    e.preventDefault();
    return false;
});

document.getElementById('canvas').addEventListener("mouseup", function() {
    current.mouse.dragging = false;
});

document.getElementById('canvas').addEventListener("mouseout", function() {
    current.mouse.dragging = false;
});

document.getElementById('canvas').addEventListener("mousemove", function(e) {
    if (!current.mouse.dragging) {
        return false;
    }
    current.mouse.delta.x = (e.pageX - current.mouse.origin.x) * (Math.PI * 180 / canvas.width);
    current.mouse.delta.y = (e.pageY - current.mouse.origin.y) * (Math.PI * 180 / canvas.height);
    current.view.rotation[1] -= current.mouse.delta.x;
    current.view.rotation[0] -= current.mouse.delta.y;
    current.mouse.origin.x = e.pageX;
    current.mouse.origin.y = e.pageY;
    e.preventDefault();
});

document.getElementById('btn-save').addEventListener('click', function() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(applyTransformationToCurrentVertices()));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "save.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

document.getElementById('btn-load').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload = readerEvent => {
            resetCanvas(JSON.parse(readerEvent.target.result));
            document.querySelectorAll(".btn-shapes").forEach(function(btn) {
                btn.classList.remove('active');
            });
        }
    }
    input.click();
});