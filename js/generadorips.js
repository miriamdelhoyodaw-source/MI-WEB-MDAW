function mostrarDireccionRed() {
    try {
        var red = obtenerConfiguracionRed();
        mostrarResultado("Dirección de red: " + numeroADireccion(red.red));
    } catch (error) {
        mostrarResultado(error.message);
    }
}

function mostrarPuertaEnlace() {
    try {
        var red = obtenerConfiguracionRed();
        if (red.prefijo > 30) {
            throw new Error("La subred no tiene direcciones disponibles para una puerta de enlace.");
        }
        mostrarResultado("Puerta de enlace: " + numeroADireccion(red.red + 1));
    } catch (error) {
        mostrarResultado(error.message);
    }
}

function generarIP() {
    try {
        var red = obtenerConfiguracionRed();
        if (red.prefijo > 30) {
            throw new Error("La subred no tiene direcciones disponibles para generar una IP.");
        }
        var primeraIP = red.red + 1;
        var ultimaIP = red.broadcast - 1;
        var ipGenerada = primeraIP + Math.floor(Math.random() * (ultimaIP - primeraIP + 1));
        mostrarResultado("IP aleatoria: " + numeroADireccion(ipGenerada));
    } catch (error) {
        mostrarResultado(error.message);
    }
}

function mostrarBroadcast() {
    try {
        var red = obtenerConfiguracionRed();
        mostrarResultado("Dirección de broadcast: " + numeroADireccion(red.broadcast));
    } catch (error) {
        mostrarResultado(error.message);
    }
}

function mostrarMascara() {
    try {
        var red = obtenerConfiguracionRed();
        mostrarResultado("Máscara de subred: " + numeroADireccion(red.mascara));
    } catch (error) {
        mostrarResultado(error.message);
    }
}

function obtenerConfiguracionRed() {
    var ip = direccionANumero(document.getElementById("ip").value);
    var mascara = direccionANumero(document.getElementById("mascara").value);
    var bitsMascara = mascara.toString(2).padStart(32, "0");

    if (!/^1*0*$/.test(bitsMascara)) {
        throw new Error("La máscara de subred no es válida.");
    }

    var prefijo = bitsMascara.indexOf("0");
    if (prefijo === -1) {
        prefijo = 32;
    }

    var red = (ip & mascara) >>> 0;
    var broadcast = (red | (~mascara)) >>> 0;
    return { red: red, broadcast: broadcast, mascara: mascara, prefijo: prefijo };
}

function mostrarSubredes() {
    try {
        var red = obtenerConfiguracionRed();
        var prefijoSubred = obtenerPrefijoSubred(document.getElementById("mascaraSubred").value);

        if (prefijoSubred < red.prefijo) {
            throw new Error("El prefijo de las subredes debe ser igual o mayor que el de la máscara actual.");
        }

        var cantidad = Math.pow(2, prefijoSubred - red.prefijo);
        var tamanoSubred = Math.pow(2, 32 - prefijoSubred);
        var cantidadMostrar = Math.min(cantidad, 256);
        var lineas = ["Subredes /" + prefijoSubred + " (" + cantidad + " en total):"];

        for (var i = 0; i < cantidadMostrar; i++) {
            var direccionRed = red.red + i * tamanoSubred;
            var broadcast = direccionRed + tamanoSubred - 1;
            lineas.push(
                (i + 1) + ". " + numeroADireccion(direccionRed) +
                " - broadcast: " + numeroADireccion(broadcast)
            );
        }

        if (cantidad > cantidadMostrar) {
            lineas.push("Se muestran las primeras " + cantidadMostrar + " subredes.");
        }
        mostrarResultado(lineas.join("\n"));
    } catch (error) {
        mostrarResultado(error.message);
    }
}

function obtenerPrefijoSubred(valor) {
    var prefijoTexto = valor.trim();
    var prefijo;

    if (/^\/?\d{1,2}$/.test(prefijoTexto)) {
        prefijo = Number(prefijoTexto.replace("/", ""));
    } else {
        var mascara = direccionANumero(prefijoTexto);
        var bitsMascara = mascara.toString(2).padStart(32, "0");
        if (!/^1*0*$/.test(bitsMascara)) {
            throw new Error("La máscara de subred de destino no es válida.");
        }
        prefijo = bitsMascara.indexOf("0");
        if (prefijo === -1) {
            prefijo = 32;
        }
    }

    if (prefijo < 0 || prefijo > 32) {
        throw new Error("El prefijo debe estar entre 0 y 32.");
    }
    return prefijo;
}

function direccionANumero(direccion) {
    var octetos = direccion.trim().split(".");
    if (octetos.length !== 4 || octetos.some(function (octeto) {
        return !/^\d{1,3}$/.test(octeto) || Number(octeto) > 255;
    })) {
        throw new Error("Introduce una dirección IPv4 válida.");
    }
    return octetos.reduce(function (numero, octeto) {
        return numero * 256 + Number(octeto);
    }, 0);
}

function numeroADireccion(numero) {
    return [
        (numero >>> 24) & 255,
        (numero >>> 16) & 255,
        (numero >>> 8) & 255,
        numero & 255
    ].join(".");
}

function mostrarResultado(texto) {
    document.getElementById("resultado").textContent = texto;
}
