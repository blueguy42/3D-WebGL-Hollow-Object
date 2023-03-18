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
});

document.getElementById('btn-reset').addEventListener('click', function() {
    if (!current.shader) {
        document.getElementById('btn-shader').click();
    }
    resetCanvas();
});