
var orden = 1;
var alumnos = [];
var correos = [];
var contadorInputs = 0;
//Capturar evento Enter
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    if (event.key === 'Enter') {

        var valorNombre = document.querySelector(`.nombre${orden}`);
        var valorCorreo = this.document.querySelector(`.correo${orden}`);
       /* Con el siguiente if sirve para controlar que me creen los siguientes
         inputs cuando le doy al enter en el input del email */
        if (contadorInputs == 1) {
            contadorInputs = 0;
            alumnos.push(valorNombre.value);
            correos.push(valorCorreo.value);
            //verificacion de los campos que no haya nombre ni correos repetidos y que el formato de email es valido
            var alumnosRepes = nombresRepetidos(alumnos);
            var correosRepes = nombresRepetidos(correos);
            var validacionEmail = validarEmail(valorCorreo.value);
            
            // si pasa las verificaciones 
            if (!alumnosRepes && !correosRepes && validacionEmail) {

                orden++;//esta variable me sirve para añadir a la clase y así capturar la clase

                // Creo el input del correo
                var correo = document.createElement("input");
                correo.setAttribute('type', 'email');
                correo.setAttribute('class', `form-control mt-2 correo${orden}`);
                correo.setAttribute('placeholder', "Email");
                //Creo el input de nombre
                var entrada = document.createElement("input");
                entrada.setAttribute('class', `form-control mt-2 nombre${orden}`);
                entrada.setAttribute('placeholder', `Nombre${orden} + enter`);
                //El siguiente atributo sirve para capturara el teclado y no dejarme teclear numeros en el campo nombre
                entrada.setAttribute('onkeypress', 'return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode == 44))')
                //Añadir los input creados al contenedor padre de HTML
                var parentEmail = document.querySelector("#correos");
                parentEmail.appendChild(correo);
                var parent = document.querySelector("#entradas");
                parent.appendChild(entrada);
                //Cambiar el foco al siguiente Input
                var valorNombre = document.querySelector(`.nombre${orden}`);
                valorNombre.focus();
            } else {
                //en caso de que no cumplan las condiciones me las borre del Array
                alert("No puede introducir ni nombres ni correos repetidos")
                alumnos.pop();
                correos.pop();
            }

        } else {
            valorCorreo.focus();
            contadorInputs = 1;
        }
    }

}, true);

//Función para hacer el sorteo
function mostrarNombres() {
    resetearSoft();
    var contador = 0;
    var alumnosRegalados = [];
    var alumnosRepes = nombresRepetidos(alumnos);
    console.log(alumnosRepes);

    if (alumnos.length > 1) {

        for (alumno of alumnos) {
            console.log(alumno);

            do {
                var aleatorio = Math.floor(Math.random() * alumnos.length);
                var alumno2 = alumnos[aleatorio];

            } while (alumnosRegalados.indexOf(alumno2) > -1 || alumno == alumno2);

            alumnosRegalados.push(alumno2);
            crearInputs(alumno2, correos[contador]);
            console.log(alumnosRegalados);
            contador++;
        }

    } else {
        alert("debe Introducir como minimo dos nombres");
    }



}

//función para crear los inputs del sorteo y el boton de enviar por correo
function crearInputs(nombre2, correo) {
    var envio = document.createElement("a")
    envio.setAttribute('href', "mailto:" + correo + "?subject=Sorteo amigo invisible&body=Enhorabuena te ha tocado regalarle el amigo invisible a: " + nombre2);
    envio.innerHTML = "Enviar";
    envio.setAttribute("class", "d-block mt-2 badge bg-info text-dark rounded-pill");
    var entrada2 = document.createElement("input");
    entrada2.setAttribute('type', 'text');
    entrada2.value = nombre2;
    entrada2.setAttribute('class', 'form-control mt-1');
    var parentEntrada = document.querySelector("#entradas2");
    parentEntrada.appendChild(entrada2);
    var parentEnvio = document.querySelector("#envio");
    parentEnvio.appendChild(envio);

}

function resetearSoft() {
    var element = document.querySelector("#entradas2");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    var enviar = document.querySelector("#envio");
    while (enviar.firstChild) {
        enviar.removeChild(enviar.firstChild);
    }
}
function resetear() {

    location.reload();

}
function nombresRepetidos(datos) {
    for (var i = 0; i < datos.length; i++) {
        for (var j = 0; j < datos.length; j++) {
            if (datos[i] == datos[j] && i != j) {
                return true;
            }
        }
    }
}
function validarEmail(valor) {

    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(valor)) {
        return true;
        //alert("La dirección de email " + valor + " es correcta.");
    } else {
        alert("La dirección de email es incorrecta.");
        return false;
    }
}



