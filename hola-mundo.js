const $botonSiguiente = document.querySelector("#boton-siguiente");

$botonSiguiente.onclick = function(){
    const integrantes = Number(document.querySelector("#integrantes").value);

    borrarIntegrantesAnteriores();
    crearIntegrantes(integrantes);
    mostrarBotones(integrantes);

    return false;
}

function borrarIntegrantesAnteriores(){
    const integrantesAnteriores = document.querySelectorAll(".integrante");

    for (let i = 0; i < integrantesAnteriores.length; i++){
        integrantesAnteriores[i].remove();
    }

}

function crearIntegrantes(integrantes){
    for (let i = 1; i <= integrantes; i++){
        const $label = document.createElement("label");
        $label.textContent = "integrante " + i
        $label.className = "integrante"
        
        const $input = document.createElement("input");
        $input.className = "form-control integrante"
        $input.placeholder = "Edad"

        document.querySelector("form").appendChild($label);
        document.querySelector("form").appendChild($input)
    }
}

function mostrarBotones(integrantes){
    if (integrantes > 1){
        mostrarBotonCalcular();
    }else {
        ocultarBotonCalcular()
    }

    if (integrantes > 0){
        mostrarBotonReiniciar();
    }else {
        ocultarBotonReiniciar();
    }
}

function mostrarBotonCalcular(){
    document.querySelector("#boton-calcular").className = "btn btn-secondary";
}
function mostrarBotonReiniciar(){
    document.querySelector("#boton-reiniciar").className = "btn btn-danger";
}
function ocultarBotonCalcular(){
    document.querySelector("#boton-calcular").className = "oculto";
}
function ocultarBotonReiniciar(){
    document.querySelector("#boton-reiniciar").className = "oculto";
}

const $botonCalcular = document.querySelector("#boton-calcular");

$botonCalcular.onclick = function(){
    const integrantes = document.querySelectorAll("input.integrante");
    const edades = [];
    
    for (let i = 0; i < integrantes.length; i++){
        edades.push(Number(integrantes[i].value))
    }

    ocultarFormulario();
    mostrarResultados();
    mostrarEdadMayor(edades);
    mostrarEdadMenor(edades);
    mostrarPromedioEdad(edades);

    return false;
}
function mostrarResultados(){
    document.querySelector("#resultados").className = "";
}
function mostrarEdadMayor(edades){
    document.querySelector(".mayor-edad").textContent = "la mayor edad es " + Math.max(...edades);
}
function mostrarEdadMenor(edades){
    document.querySelector(".menor-edad").textContent = "la menor edad es " + Math.min(...edades)
}
function mostrarPromedioEdad(edades){
    let suma = 0;
    for (let i = 0; i < edades.length; i++){
        suma = suma + edades[i];
    }   

    function calcularPromedio(suma, edades){
        return suma / edades.length
    }

    document.querySelector(".promedio-edad").textContent = "el promedio de edad es " + calcularPromedio(suma, edades);
}


const $botonReiniciar = document.querySelector("#boton-reiniciar");
$botonReiniciar.onclick = function(){

    document.querySelector("#resultados").className = "oculto";

    mostrarBotones(integrantes);
    borrarIntegrantesAnteriores();
}

const $botonReiniciarDos = document.querySelector("#boton-reiniciar-dos");
$botonReiniciarDos.onclick = function (){
    document.querySelector("#resultados").className = "oculto";

    mostrarFormulario();
    mostrarBotones(integrantes);
    borrarIntegrantesAnteriores();
}

function mostrarFormulario(){
    document.querySelector("form").className = "";
}

function ocultarFormulario(){
    document.querySelector("form").className = "oculto";
}