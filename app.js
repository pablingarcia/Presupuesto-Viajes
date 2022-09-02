const aceptaciones = document.getElementsByClassName("aceptar")
const nuevosConceptos = document.getElementsByClassName("nuevo-concepto")
const conceptos = document.getElementsByClassName("conceptos")
const dineroDisponible = document.getElementById("interaccion")
const botonDineroDisponible = document.getElementById("boton-dinero")
const botonDineroReset = document.getElementById("boton-reset")
const divDineroDisponible = document.getElementById("div-dinero-disponible")

let valorDineroDisponible = dineroDisponible.value;

botonDineroDisponible.addEventListener("click", () =>{
    

    if (dineroDisponible.value === "") {
        return;
    }

    const nuevoDineroP= document.createElement("p")

   
    nuevoDineroP.textContent = dineroDisponible.value;

    divDineroDisponible.appendChild(nuevoDineroP);
    divDineroDisponible.removeChild(dineroDisponible);
    divDineroDisponible.removeChild(botonDineroDisponible);
    actualizarSobrante();

botonDineroReset.addEventListener("click", () =>{

    
    divDineroDisponible.removeChild(nuevoDineroP);
    divDineroDisponible.appendChild(dineroDisponible);
    divDineroDisponible.appendChild(botonDineroDisponible);
    

    dineroDisponible.value = "";
    actualizarSobrante()
})
})


for (let index = 0; index < aceptaciones.length; index++) {
    const boton = aceptaciones[index];

    boton.addEventListener("click", () => {

        //Leer lo que está en el input.
        const valorConcepto = nuevosConceptos[index].value;

        //Crear un elemento y asignar contenido texto lo del input
        const nuevoDiv = document.createElement("div");
        const nuevoP = document.createElement("p");
        const nuevoInput = document.createElement("input");
        nuevoInput.setAttribute("type", "number");
        const nuevoButton = document.createElement("button");
        const nuevoButtonCheck = document.createElement("button");
        const card = conceptos[index].parentElement.parentElement;

        //Si no escribo nada, que no genere un div
        if (nuevosConceptos[index].value === "") {
            return;
        }

        nuevoP.textContent = valorConcepto;

        nuevoButtonCheck.textContent = "✓";
        nuevoButton.textContent = "X";



        nuevoDiv.appendChild(nuevoP);
        nuevoDiv.appendChild(nuevoInput);
        nuevoDiv.appendChild(nuevoButtonCheck);
        nuevoDiv.appendChild(nuevoButton);


        //Insertar elemento en la página.
        conceptos[index].appendChild(nuevoDiv);

        //To eliminate Div if expend was wrong
        nuevoButton.addEventListener("click", () => {

            conceptos[index].removeChild(nuevoDiv);
            UpdateCardValue(card);
        })

        //Borrar contenido input
        nuevosConceptos[index].value = "";

        //Insert element in second input
        nuevoButtonCheck.addEventListener("click", () => {

            const newExpendValue = document.createElement("p");
            newExpendValue.textContent = nuevoInput.value;
            newExpendValue.className += "individualExpenseValue"

            const newConcept = nuevoInput.value
            const dolarSign = document.createElement("span")
            dolarSign.textContent = ": $"



            if (nuevoInput.value === "") {
                return
            }

            nuevoDiv.appendChild(dolarSign);
            nuevoDiv.appendChild(newExpendValue);
            nuevoDiv.removeChild(nuevoInput);
            nuevoDiv.removeChild(nuevoButtonCheck);

            //Moving x button to the right
            nuevoDiv.removeChild(nuevoButton);
            nuevoDiv.appendChild(nuevoButton);


            
            UpdateCardValue(card);

        })
    })
}

function UpdateCardValue(card) {

    const totalCardValue = card.getElementsByClassName("total-pais");
    const sumValues = card.getElementsByClassName("individualExpenseValue")
    let sumTotal = 0

    
    for (let index = 0; index < sumValues.length; index++) {

        sumTotal += parseInt(sumValues[index].innerText);

    }
    // para asignar el valor de la variable que suma
        totalCardValue[0].innerText = sumTotal;
        actualizarMontoEstimado()
}

    const montoPresupuesto = document.getElementById("monto-presupuesto");
 

    function actualizarMontoEstimado() {
        const totalPaises = document.getElementsByClassName("total-pais");
        let sumaTotalPaises = 0

        for (let index = 0; index < totalPaises.length; index++) {
            
            sumaTotalPaises += parseInt(totalPaises[index].innerText);
        }

        montoPresupuesto.innerText = sumaTotalPaises;
        actualizarSobrante();
    }

    const sobrante = document.getElementById("sobrante");
    let sumaSobrante = 0



    function actualizarSobrante() {
        let pDineroDisponible = parseInt(divDineroDisponible.children[0].innerText);
        let montoPresupuestoEstimado = parseInt(montoPresupuesto.innerText);


        if(isNaN(pDineroDisponible)){
            pDineroDisponible = 0;
          
        } 

        if(isNaN(montoPresupuestoEstimado)){
            montoPresupuestoEstimado = 0;
        }

        let restaSobrante = pDineroDisponible - montoPresupuestoEstimado;
        sobrante.textContent = restaSobrante;

      
    }
     

