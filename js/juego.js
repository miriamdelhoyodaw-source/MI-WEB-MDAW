let jugador = "piedra";
let maquina = "papel";

let mensaje;

if (jugador === maquina) {
    mensaje = "Empate";
}

else if (jugador === "piedra" && maquina === "tijera" || 
         jugador === "papel" && maquina === "piedra" || 
         jugador === "tijera" && maquina === "papel") {
    mensaje = "Ganaste";
}
else {
    mensaje = "Perdiste";
}
console.log(mensaje);