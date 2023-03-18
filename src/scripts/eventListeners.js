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
    document.getElementById('zoom-value').innerHTML = this.value + '%';
});

document.querySelector('#btn-tool-color').addEventListener('click', function() {
    const colorPicker = document.querySelector('#color-picker');
    document.querySelectorAll('.popup').forEach(function(popup) {
        popup.classList.remove('show');
    });
    document.querySelectorAll('.btn-tools').forEach(function(tool) {
        if (tool.id !== 'btn-tool-color') {
            tool.classList.remove('active');
        }
    });
    this.classList.toggle('active');
    if (this.classList.contains('active')) {
        document.querySelector(':root').addEventListener('click', function(e) {
            if (e.target !== colorPicker && e.target !== document.querySelector('#btn-tool-color') && e.target !== document.querySelector('#btn-tool-color i')) {
                document.querySelector('#btn-tool-color').classList.remove('active');
                document.querySelector(':root').removeEventListener('click', arguments.callee);
            }
        });
        colorPicker.click()
    }
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

// Tools Event Listeners
document.getElementById('shape-cube').addEventListener('click', function() {
    if (this.classList.contains('active')) return;
    document.querySelectorAll('.btn-shapes').forEach(function(shape) {
        shape.classList.remove('active');
    });
    this.classList.add('active');
    current.model = cube;
});

document.getElementById("color-picker").addEventListener("input", function() {
    current.color = hexToRGBColor(this.value);
});

window.addEventListener('resize', function() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

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
    resetCanvas();
});

document.getElementById('btn-projection-orthographic').addEventListener('click', function() {
    if (this.classList.contains('active')) return;
    document.querySelectorAll('.btn-projection').forEach(function(btn) {
        btn.classList.remove('active');
    });
    this.classList.add('active');
    current.projection = "orthographic";
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
    current.mouse.delta.x = (e.pageX - current.mouse.origin.x) * (Math.PI / canvas.width);
    current.mouse.delta.y = (e.pageY - current.mouse.origin.y) * (Math.PI / canvas.height);
    current.view.rotation[1] -= current.mouse.delta.x;
    current.view.rotation[0] -= current.mouse.delta.y;
    current.mouse.origin.x = e.pageX;
    current.mouse.origin.y = e.pageY;
    e.preventDefault();
});

document.getElementById('btn-save').addEventListener('click', function() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(current));
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
            current = JSON.parse(readerEvent.target.result);
            syncToolsFromCurrent();
        }
    }
    input.click();
});