/* Variables de la calculadora */
let numeroActual = "0";
let numeroAnterior = null;
let operacion = null;
let reiniciarPantalla = false;

/* Obtener la pantalla */
const pantalla = document.getElementById("pantalla");

/* Mostrar el número en pantalla */
function actualizarPantalla() {
    pantalla.value = numeroActual;
}

/* Agregar números */
function agregarNumero(numero) {
    if (numeroActual === "Error") {
        numeroActual = "0";
    }

    if (reiniciarPantalla) {
        numeroActual = numero;
        reiniciarPantalla = false;
    } else if (numeroActual === "0") {
        numeroActual = numero;
    } else {
        numeroActual += numero;
    }

    actualizarPantalla();
}

/* Agregar punto decimal */
function agregarDecimal() {
    if (numeroActual === "Error") {
        numeroActual = "0";
    }

    if (reiniciarPantalla) {
        numeroActual = "0.";
        reiniciarPantalla = false;
    } else if (!numeroActual.includes(".")) {
        numeroActual += ".";
    }

    actualizarPantalla();
}

/* Seleccionar una operación */
function seleccionarOperacion(simbolo) {
    if (numeroActual === "Error") {
        return;
    }

    if (operacion !== null && !reiniciarPantalla) {
        calcular();
    }

    numeroAnterior = parseFloat(numeroActual);
    operacion = simbolo;
    reiniciarPantalla = true;
}

/* Realizar el cálculo */
function calcular() {
    if (operacion === null || numeroAnterior === null) {
        return;
    }

    const segundoNumero = parseFloat(numeroActual);
    let resultado;

    switch (operacion) {
        case "+":
            resultado = numeroAnterior + segundoNumero;
            break;

        case "-":
            resultado = numeroAnterior - segundoNumero;
            break;

        case "*":
            resultado = numeroAnterior * segundoNumero;
            break;

        case "/":
            if (segundoNumero === 0) {
                numeroActual = "Error";
                numeroAnterior = null;
                operacion = null;
                reiniciarPantalla = true;
                actualizarPantalla();
                return;
            }
            resultado = numeroAnterior / segundoNumero;
            break;
    }

    if (!Number.isFinite(resultado)) {
        numeroActual = "Error";
    } else {
        numeroActual = String(
            parseFloat(resultado.toFixed(10))
        );
    }

    numeroAnterior = null;
    operacion = null;
    reiniciarPantalla = true;

    actualizarPantalla();
}

/* Limpiar la calculadora */
function limpiar() {
    numeroActual = "0";
    numeroAnterior = null;
    operacion = null;
    reiniciarPantalla = false;

    actualizarPantalla();
}

/* Mostrar el valor inicial */
actualizarPantalla();