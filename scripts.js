let container = document.getElementById("container")

const semaforoInnerHtml = `
<div class="green"></div>
<div class="yellow"></div>
<div class="red"></div>
`
const semaforoPedestreInnerHtml = `
<div class="green"></div>
<div class="red"></div>
`

const semaforoVertical = document.createElement("div")
const semaforoHorizontal = document.createElement("div")
const semaforoPedestre = document.createElement("div")

semaforoHorizontal.innerHTML = 'horizontal' + semaforoInnerHtml
semaforoVertical.innerHTML = 'vertical' + semaforoInnerHtml
semaforoPedestre.innerHTML = 'pedestre' +semaforoPedestreInnerHtml

semaforoHorizontal.className = "semaforo-wrapper"
semaforoVertical.className = "semaforo-wrapper"
semaforoPedestre.className = "semaforo-wrapper"

container.appendChild(semaforoHorizontal)
container.appendChild(semaforoVertical)
container.appendChild(semaforoPedestre)