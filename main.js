console.log('main.js cargado correctamente');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado');
    
    // Elementos del DOM
    const redSlider = document.getElementById('red-slider');
    const greenSlider = document.getElementById('green-slider');
    const blueSlider = document.getElementById('blue-slider');
    const redInput = document.getElementById('red-input');
    const greenInput = document.getElementById('green-input');
    const blueInput = document.getElementById('blue-input');
    const rgbInput = document.getElementById('rgb-input');
    const applyRgbBtn = document.getElementById('apply-rgb-btn');
    const colorPicker = document.getElementById('color-picker');
    const redValue = document.getElementById('red-value');
    const greenValue = document.getElementById('green-value');
    const blueValue = document.getElementById('blue-value');
    const colorDisplay = document.getElementById('color-display');
    const colorCode = document.getElementById('color-code');
    const hexCode = document.getElementById('hex-code');
    const copyBtn = document.getElementById('copy-btn');

    // Función para convertir RGB a HEX
    function rgbToHex(r, g, b) {
        return '#' + 
            r.toString(16).padStart(2, '0') +
            g.toString(16).padStart(2, '0') +
            b.toString(16).padStart(2, '0');
    }

    // Función para convertir HEX a RGB
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return [r, g, b];
    }

    // Función para validar y procesar input RGB
    function processRgbInput(rgbString) {
        const rgbArray = rgbString.split(',').map(item => {
            return parseInt(item.trim());
        });

        if (rgbArray.length !== 3) {
            alert('Por favor ingresa 3 valores separados por comas (R,G,B)');
            return null;
        }

        for (let i = 0; i < 3; i++) {
            if (isNaN(rgbArray[i]) || rgbArray[i] < 0 || rgbArray[i] > 255) {
                alert('Cada valor debe ser un número entre 0 y 255');
                return null;
            }
        }

        return rgbArray;
    }

    // Función para actualizar todos los controles
    function updateControls(r, g, b) {
        redSlider.value = r;
        greenSlider.value = g;
        blueSlider.value = b;
        redInput.value = r;
        greenInput.value = g;
        blueInput.value = b;
        redValue.textContent = r;
        greenValue.textContent = g;
        blueValue.textContent = b;
        
        const hexColor = rgbToHex(r, g, b);
        colorPicker.value = hexColor;
    }

    // Función para actualizar la interfaz
    function updateColor() {
        const r = parseInt(redSlider.value);
        const g = parseInt(greenSlider.value);
        const b = parseInt(blueSlider.value);

        updateControls(r, g, b);

        const rgbColor = `rgb(${r}, ${g}, ${b})`;
        colorDisplay.style.backgroundColor = rgbColor;

        colorCode.textContent = `RGB: ${r}, ${g}, ${b}`;
        const hexColor = rgbToHex(r, g, b);
        hexCode.value = hexColor.toUpperCase();

        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        colorCode.style.color = brightness > 128 ? 'black' : 'white';
        
        const shadowColor = brightness > 128 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
        colorCode.style.textShadow = `
            1px 1px 2px ${shadowColor},
            -1px -1px 2px ${shadowColor},
            1px -1px 2px ${shadowColor},
            -1px 1px 2px ${shadowColor}
        `;
    }

    // Event listeners
    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);

    redInput.addEventListener('input', function() {
        let value = Math.min(255, Math.max(0, parseInt(this.value) || 0));
        redSlider.value = value;
        updateColor();
    });

    greenInput.addEventListener('input', function() {
        let value = Math.min(255, Math.max(0, parseInt(this.value) || 0));
        greenSlider.value = value;
        updateColor();
    });

    blueInput.addEventListener('input', function() {
        let value = Math.min(255, Math.max(0, parseInt(this.value) || 0));
        blueSlider.value = value;
        updateColor();
    });

    applyRgbBtn.addEventListener('click', function() {
        const rgbValues = processRgbInput(rgbInput.value);
        if (rgbValues) {
            const [r, g, b] = rgbValues;
            updateControls(r, g, b);
            updateColor();
        }
    });

    rgbInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            applyRgbBtn.click();
        }
    });

    colorPicker.addEventListener('input', function() {
        const hexColor = this.value;
        const [r, g, b] = hexToRgb(hexColor);
        updateControls(r, g, b);
        updateColor();
    });

    copyBtn.addEventListener('click', function() {
        hexCode.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check me-1"></i>Copiado!';
        copyBtn.classList.remove('btn-success');
        copyBtn.classList.add('btn-primary');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('btn-primary');
            copyBtn.classList.add('btn-success');
        }, 2000);
    });

    // Inicializar
    updateColor();
});