

// fonction pour que la modale apparaisse
function openModale() {
    // au click la modale doit passer du display non à display block
    const modale = document.getElementById("modale")
    modale.style.display = "flex"


}
const modifier = document.getElementById("modifier")
modifier.addEventListener("click", openModale)

//fonction fermer la modale.

function closeModale() {
    // au clique sur la croix
    const modale = document.getElementById("modale")
    modale.style.display = "none"

    // quand on clique en dehors du cadre de la modaleContent



}
const modaleClose = document.getElementById("modaleClose")
modaleClose.addEventListener("click", closeModale)
// faut penser à ajouter à ajouter la fermeture de la gallerie au click sur la modale

// fonction pour afficher la gallery
function afficherGalleryModale(url, title) {
    const galleryModale = document.querySelector(".galleryModale")
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    // les paramètres à afficher qui sont définie par element ligne 10.
    img.src = url
    img.alt = title

    galleryModale.appendChild(figure)
    figure.appendChild(img)

    console.log(img)

}

function loadGalleryWorks() {

    // fonction pour afficher les images
    return fetch("http:/localhost:5678/api/works")
        .then((responseWork) => responseWork.json())
        // retourne tous les élément et recherche chaque élément un à un.
        .then((elements) => {
            // affiche les images défini dans la fonction et le titre pour chaque élément
            elements.forEach(element => {
                console.log(elements)
                afficherGalleryModale(element.imageUrl, element.title)
            });


        })

}
loadGalleryWorks()