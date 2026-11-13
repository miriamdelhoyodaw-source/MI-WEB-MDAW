function cambiarModo() {
    const enlace = document.getElementById("tema-oscuro");
    enlace.disabled = !enlace.disabled;

    const boton = document.querySelector("[data-cambiar-modo]");
    const modoOscuroActivo = !enlace.disabled;
    boton.setAttribute("aria-pressed", modoOscuroActivo);
    boton.textContent = modoOscuroActivo ? "Activar modo claro" : "Activar modo oscuro";
}