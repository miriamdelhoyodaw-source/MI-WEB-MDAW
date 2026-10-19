let partidas = 0;
let ganadas = 0;
let empatadas= 0;
let perdidas = 0;

function juego (jugador) {
    const opciones = ["piedra", "papel", "tijera"];
    const maquina = opciones[Math.floor(Math.random() * opciones.length)];
    let mensaje;

    partidas++;

if (jugador === maquina) {
    mensaje = "Empate";
    empatadas++;
}
// Operador lógico AND (&&) y OR (||)
else if (
    (jugador === "piedra" && maquina === "tijera") || 
    (jugador === "papel" && maquina === "piedra") || 
    (jugador === "tijera" && maquina === "papel")
) {
    mensaje = "Ganaste";
    ganadas++;
}
else {
    mensaje = "Perdiste";
    perdidas++;
}

document.getElementById("jugada-jugador").textContent =
`Tu elección: ${jugador}`;
document.getElementById("jugada-maquina").textContent =
`Elección de la máquina: ${maquina}`;   
document.getElementById("mensaje").textContent = mensaje;

document.getElementById("marcador").textContent = 
`Partidas: ${partidas} | Ganadas: ${ganadas} | Empatadas: ${empatadas} | Perdidas: ${perdidas}`;

document.getElementById("ganadas").textContent = `Partidas ganadas: ${ganadas}`;
document.getElementById("empates").textContent = `Partidas empatadas: ${empatadas}`;
document.getElementById("perdidas").textContent = `Partidas perdidas: ${perdidas}`;
}