function jugar(jugador){
const opciones = ["piedra", "papel", "tijera"];
const maquina = opciones[Math.floor(Math.random() * opciones.length)];  
let mensaje;

// Operador lógico AND (&&) y OR (||)
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
}

jugar("piedra");
jugar("papel");
jugar("tijera");