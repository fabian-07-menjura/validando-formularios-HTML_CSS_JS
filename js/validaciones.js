export function valida(input) {
  const tipoDeInput = input.dataset.tipo; //tipoDeInput va a se igual a el "data"(data- es una propiedad de mis inputs) que quiera seleccionar de mis inputs, en este caso seleccionare el data que sea igual a "tipo"
  if (validadores[tipoDeInput]) {
    //de esta forma decimos que si mi objeto validadores contiene  mi tipo de input
    validadores[tipoDeInput](input); // en caso de existir en mi objeto mi tipo de input, como sabemos que las propieades de el objeto son funciones entonces le pasaremos a mi funcion tipoDeInput el imput recibido como parametro en mi funcion valida(input)
  }

  if (input.validity.valid) {
    console.log("ENTRO" + input.validity.valid);
    //validity es un objeto de el input que adentro tiene varias propiedades pero a la que queremos acceder en si, es valid
    input.parentElement.classList.remove("input-container--invalid"); //aca seleccionamos el padre de mi input y le decimos que removeremos la clase input-container--invalid. esto sera para cuando el valid este en true
    input.parentElement.querySelector(".input-message-error").innerHTML = ""; //en caso de que no haya un error lo que haremos es seleccional el espan que esta debajo de el input y le setearemos su contenido como strin vacio ""
  } else {
    console.log("ENTROOO " + input.validity.valid);
    input.parentElement.classList.add("input-container--invalid"); // en caso de que el valid este en false, al padre de mi input le pondre la clase input-container--invalid
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input); //el span tendra el mensaje que me retorne esta funcion mostrarMensajeDeError()
  }
}

// ------------------------------------------------------------

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío",
  },
  email: {
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El correo no es válido", //el typeMismatch es para cuando es de mtipo email
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres.",
  },
  estado: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El estado debe contener entre 10 a 40 caracteres.",
  },
};
// -------------------------------------------------------

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};
// -------------------------------------------------

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

// -----------------------------------------------------

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    //recorrecomo el arreglo tipoDeErrores
    if (input.validity[error]) {
      //verificamos si el error que me entra es el mismo que me vota input.validity
      console.log(tipoDeInput, error); //aca me consologuea el tipo de input y el error

      console.log(input.validity[error]); //aca hace como una validacion,verificando que si el objeto input.validity contiene el error me arrojara tru o false
      console.log(mensajesDeError[tipoDeInput][error]); //aca lo que hace es consologuearme  el error, yendo al objeto mensajesDeError, busca si hay el tipoDeInput, y luego si busca si esta el error y lo muestra
      mensaje = mensajesDeError[tipoDeInput][error]; //redefinimos la variable mensaje
    }
  });
  return mensaje;
}

// ----------------------------------------------

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
  // define el mensaje de alerta que queremos mandar  al usuario: tipo el mensaje de campos requeridos en un form
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
