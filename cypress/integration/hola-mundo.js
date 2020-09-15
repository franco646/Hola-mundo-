/// <reference types= "cypress" />

const URL = "http://192.168.0.6:8080/hola-mundo.html"
let edades = [];

context ("formulario de edades", () => {

    before( () => {
        cy.visit(URL)
    })

    describe("probar programa", () => {

        it("generar inputs", () => {
            let cantidadDeIntegrantes = generarNumeroRandom();

            cy.get("#integrantes").should(($integrantes) => {
                $integrantes.val(cantidadDeIntegrantes)
            })

            cy.get("#boton-siguiente").click();
                       
            cy.get("input.integrante").should("have.length", cantidadDeIntegrantes);
        })

        it("calcular", () => {

            
            cy.get("input.integrante").each(($input) => {
                $input.val(generarEdadRandom());
            }).then(() => {

                if (edades.length > 1){
                cy.get("#boton-calcular").click().then(() => {

                    const mayorEdad = Math.max(...edades);
                    const menorEdad = Math.min(...edades);
                    const promedio = calcularPromedio();

                    cy.get(".mayor-edad").should("have.text", "la mayor edad es " + mayorEdad);
                    cy.get(".menor-edad").should("have.text", "la menor edad es " + menorEdad);
                    cy.get(".promedio-edad").should("have.text", "el promedio de edad es " + promedio);
                
                })
                }else{
                cy.get("#boton-calcular").should("not.be.visible")
                }

            })

        })

        it("reiniciar", () => {
            if(edades.length > 1){
                cy.get("#boton-reiniciar-dos").click().then(() => {
                    cy.get("input.integrante").should("have.length", 0)
                })
            }else{
                cy.get("#boton-reiniciar").click().then(() => {
                    cy.get("input.integrante").should("have.length", 0)
                })
            }
        })
    })
})

function generarNumeroRandom(){
    const numeroRandom = Number(Math.ceil(Math.random() * 5));
    
    return numeroRandom;
}

function generarEdadRandom(){
    let edad = Number(Math.ceil(Math.random() * 100));
    
    edades.push(edad)
    return edad;
}

function calcularPromedio(){
    let suma = 0;
    for (let i = 0; i < edades.length; i++){
        suma = suma + edades[i];
    }   

    return promedios(suma, edades);
    function promedios(suma, edades){
        return suma / edades.length
    }
}