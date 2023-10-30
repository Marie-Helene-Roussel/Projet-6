function getToken() {
    return (localStorage.getItem("token"))
}

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

}
const modaleClose = document.getElementById("modaleClose")
modaleClose.addEventListener("click", closeModale)
// faut penser à ajouter à ajouter la fermeture de la gallerie au click sur la modale


// fonction pour afficher la gallery
function afficherGalleryModale(url, title, id) {
    const galleryModale = document.querySelector(".galleryModale")
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    // les paramètres à afficher qui sont définie par element ligne 10.
    img.src = url
    img.alt = title
    // Création de la poubelle
    const poubelle = document.createElement("div")
    poubelle.classList.add("trashButton")
    // balise font aweson pour l'icone de poubelle
    poubelle.innerHTML = '<i class= "fa-solid fa-trash-can"></i>'
    // evénement sur le click de la poubelle
    poubelle.addEventListener("click", (event) => {
        event.preventDefault()
        // qui doit pas se comporter en get, comme il le fait d'habitude
        deleteImage(id, getToken()).then(() => {
            // then pour pas qu'il lance tout de suite la fonction loadGalleryWorks
            // lance la gallerie pour raffraichir l'image en prenant en 
            //compte la suppression de l'image
            
            galleryModale.innerHTML = ""
            loadGalleryWorks()
        })
    })
    // qui désigne l'enfant de figure qui est la poubelle
    figure.appendChild(poubelle)
    // qui désigne l'enfant de gallery modale
    galleryModale.appendChild(figure)
    // qui désigne l'enfant de figure
    figure.appendChild(img)

    console.log(img)

}

function loadGalleryWorks() {
    // fonction pour afficher les images
    return fetch("http:/localhost:5678/api/works")
        // de base fetch fait un get
        .then((responseWork) => responseWork.json())
        // retourne tous les élément et recherche chaque élément un à un.
        .then((elements) => {
            // affiche les images défini dans la fonction et le titre pour chaque élément
            elements.forEach(element => {
                // Pour afficher chaque élément un par un grâce à foreach
                console.log(elements)
                afficherGalleryModale(element.imageUrl, element.title, element.id)
            });
        })
}
loadGalleryWorks()


//fonction suppression
function deleteImage(id, token) {
    const url = `http://localhost:5678/api/works/${id}`;
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    return fetch(url, request);
  }

// Modale 2
