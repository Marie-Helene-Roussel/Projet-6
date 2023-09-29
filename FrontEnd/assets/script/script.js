async function loadWorks() {
    const response = await fetch("http:/localhost:5678/api/works") 
console.log(response)
const responseWork = await response.json()
console.log(responseWork)

for (let i = 0 ; i < responseWork.length; i++)
{
console.log(responseWork [i])
}
}

loadWorks()

// création du premier élément html pour la première vignette. Fonction pour l'affichage d'une image!

function afficherFigureGallery(){
    const divGallery = document.querySelector(".gallery")
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")

   img.src = "http://localhost:5678/images/abajour-tahina1651286843956.png"
   img.alt = "Un abajour"
   figcaption.innerText = "Abajour Tahina"

   divGallery.appendChild(figure)
   figure.appendChild(img)
   figure.appendChild(figcaption)
   
   console.log(img)

} 

afficherFigureGallery()

