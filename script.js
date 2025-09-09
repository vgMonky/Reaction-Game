const panelDeReaccion = document.querySelector(".panel");

let estadoDelPanel = "EMPEZAR";
let temporizadorTimeout;
let temporizadorTimeoutReintentar;
let tiempoInicio;

function sistemaDeTiempos() {
    if (estadoDelPanel === "REINTENTAR") return;
    
    const tiempoAleatorioMs = Math.floor(Math.random() * 3000) + 3000;

    cambioDeColor("rgba(255, 89, 89, 1)");
    panelDeReaccion.textContent = "Espera hasta el verde";
    estadoDelPanel = "ESPERA";

    temporizadorTimeout = setTimeout(() => {
        if (estadoDelPanel !== "ESPERA") return;

        estadoDelPanel = "AHORA";
        cambioDeColor("rgba(155, 228, 96, 1)");
        panelDeReaccion.textContent = "Ahora!";

        tiempoInicio = Date.now();
    }, tiempoAleatorioMs);
}

function cambioDeColor(color) {
    panelDeReaccion.style.backgroundColor = color;
}

function pantallaDeReintentar() {
    estadoDelPanel = "REINTENTAR"

    clearTimeout(temporizadorTimeout);

    cambioDeColor("rgb(83, 83, 255)");
    panelDeReaccion.textContent = "Debes esperar hasta el verde";

    temporizadorTimeoutReintentar = setTimeout(() => {
        estadoDelPanel = "EMPEZAR";
        panelDeReaccion.textContent = "Empezar";
    }, 3000);
}

panelDeReaccion.addEventListener("click", () => {
    if (estadoDelPanel === "ESPERA") {
        pantallaDeReintentar();
        return;
    }

    if (estadoDelPanel === "AHORA") {
        const tiempoReaccion = Date.now() - tiempoInicio;
        panelDeReaccion.textContent = `Tu tiempo fue: ${tiempoReaccion} ms`;
        estadoDelPanel = "EMPEZAR";
        return;
    }

    if (estadoDelPanel === "REINTENTAR") {
        clearTimeout(temporizadorTimeoutReintentar);

        estadoDelPanel = "ESPERA";
        cambioDeColor("rgba(255, 89, 89, 1)");
        panelDeReaccion.textContent = "Espera hasta el verde";
    }

    sistemaDeTiempos();
});