const display = document.getElementById("display");
const suggestionText = document.getElementById("suggestion");

let history = [];

function add(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    const result = eval(display.value);
    history.push(result);
    display.value = result;
    generateAISuggestion();
  } catch {
    display.value = "Error";
  }
}

// --- Funciones científicas ---
function sqrt() {
  const value = parseFloat(display.value);
  const result = Math.sqrt(value);
  history.push(result);
  display.value = result;
  generateAISuggestion();
}

function power() {
  const value = parseFloat(display.value);
  const result = Math.pow(value, 2);
  history.push(result);
  display.value = result;
  generateAISuggestion();
}

function log() {
  const value = parseFloat(display.value);
  const result = Math.log10(value);
  history.push(result);
  display.value = result;
  generateAISuggestion();
}

function func(type) {
  const value = parseFloat(display.value);
  let result;

  if (type === "sin") result = Math.sin(value);
  if (type === "cos") result = Math.cos(value);
  if (type === "tan") result = Math.tan(value);

  history.push(result);
  display.value = result.toFixed(5);
  generateAISuggestion();
}

// --- IA: análisis del historial ---
function generateAISuggestion() {
  if (history.length < 3) {
    suggestionText.innerText = "Sigue calculando para recibir sugerencias avanzadas.";
    return;
  }

  const last = history.slice(-3);

  if (last.every(n => n > 50)) {
    suggestionText.innerText =
      "Detecto números grandes. ¿Quieres probar logaritmos o potencias superiores (x³, x⁴)?";
  }
  else if (last.every(n => n < 1)) {
    suggestionText.innerText =
      "Trabajas con valores pequeños. ¿Qué tal funciones trigonométricas o raíces?";
  }
  else if (last.some(n => n % 1 !== 0)) {
    suggestionText.innerText =
      "Hay decimales en tus resultados. Podrías combinar trigonometría y potencias.";
  }
  else {
    suggestionText.innerText =
      "Prueba operaciones mixtas: √(x² + y²) o funciones trigonométricas.";
  }
}
