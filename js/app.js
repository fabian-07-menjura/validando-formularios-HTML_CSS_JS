import { valida } from "./validaciones.js"; //importamos la funcion valida()

const inputs = document.querySelectorAll("input"); //seleccionamos todos los inputs en este caso de mi formulario, sabemos que el querySelectorAll me devuelve un arreglo con todos los input

inputs.forEach((input) => {
  //le hacemos un forEach a nuestro arreglo de inputs
  input.addEventListener("blur", (input) => {
    //a cada input le agregamos en evento "blur" este evento escucha inmediatamente nos salimos de el input o pierde el foco.
    valida(input.target); // aca a nuestra funcion valida le pasamos cada input
  });
});
