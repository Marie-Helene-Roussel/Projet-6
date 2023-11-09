function getToken() {
    return (localStorage.getItem("token"))
}

// fonction pour que la modale apparaisse
function openModale() {
    // au click la modale doit passer du display non à display block
    const modale = document.getElementById("modale")
    modale.style.display = "flex"
    const modaleContent = document.querySelector(".modaleContent")
    // Ajoutez un événement de clic au document entier pour la première modale
    // fonction facultative selon mon mentor, à mettre en fonction si besoin
    //    document.addEventListener('click', function (event) {
    // Vérifiez si le clic a eu lieu en dehors du div
    //      const isModaleActive = modale.style.display !== "none"
    //     if (isModaleActive && !modaleContent.contains(event.target) && event.target.id !== "modifier" ) {

    // Le clic a eu lieu en dehors du div, faites ce que vous voulez ici
    //        closeModale()
    //      }
    //})

}
const modifier = document.getElementById("modifier")
modifier.addEventListener("click", openModale)

//fonction fermer la modale.

function closeModale() {
    // au clique sur la croix
    const modale = document.getElementById("modale")
    modale.style.display = "none"
    const modale2 = document.getElementById("modale2")
    modale2.style.display = "none"


}
const modaleClose = document.getElementById("modaleClose")
modaleClose.addEventListener("click", closeModale)
const modaleClose2 = document.getElementById("modaleClose2")
modaleClose2.addEventListener("click", closeModale)
const modale = document.getElementById("modale")
// Sélectionnez le div que vous souhaitez surveiller
//Remplacez '#votreDiv' par le sélecteur de votre div


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
            // rajouter un loadgallery
            loadWorks()

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
// fonction pour charger la gallerie
function loadGalleryWorks() {
    const galleryModale = document.querySelector(".galleryModale")
    galleryModale.innerHTML = ""
    // fonction pour afficher les images après un refresh de la page pour ne pas duppliquer les images.
    return fetch("http://localhost:5678/api/works")
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


//fonction suppression d'image, pour le test l'image de l'abajour a été supprimé et sera remise lors de la soutenance!
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
//fonction pour faire apparaître la seconde modale qui remplacera la première
function switchModale() {
    const modale1 = document.querySelector(".modale")
    const modale2 = document.querySelector(".modale2")

    if (modale1.style.display == "flex") {
        modale1.style.display = "none"
        modale2.style.display = "flex"

    }
    else {
        modale1.style.display = "flex"
        modale2.style.display = "none"
    }

}

const ajoutePhoto = document.querySelector(".ajoutePhoto")
ajoutePhoto.addEventListener("click", switchModale)
const retour = document.querySelector(".return")
retour.addEventListener("click", switchModale)

// ajout de la fonction pour les catégories de la liste déroulante
function buildCategories() {
    const select = document.querySelector("#img-category")
    return fetch("http://localhost:5678/api/categories")
        .then((categories) => categories.json())
        .then((category) => { return category; })
        .then((cats) => {
            cats.forEach(cat => {
                const option = document.createElement("option")
                option.innerText = cat.name
                option.value = cat.id
                select.appendChild(option)
            })
        })
}

buildCategories()

// fonction pour vérifier le format des images et leur taille
const maxSize = 4000000

function validFileType(files) {
    const fileTypes = ["image/jpeg", "image/pjpeg", "image/png"]
    let valid = true
    for (let i = 0; i < files.length; i++) {
        if (!fileTypes.includes(files[i].type)) {
            valid = false
        }
    }
    return valid;
}
function validFileSize(files) {
    let valid = true
    for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize) {
            valid = false
        }
    }
    return valid;
}

////fonction ajout l'utilisation du data au lieu du JSON permet les vérifications de tailles, format et de nom que ne permet pas JSON
function addImage(bodyData, token) {
    console.log("executin addImage")
    const url = "http://localhost:5678/api/works"
    const request = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: bodyData,
    };
    return fetch(url, request);
}
// fonction pour valider l'ajout de la photo et qui vérifie que la photo est au bon format et que le formulaire est bien rempli avec un formData 
/// à la place d'un JSON, car plus adapté à la situation
async function addPhoto(e) {
    e.preventDefault();
    console.log("executing addPhoto")
    const token = getToken()
    const addPhotoInput = document.getElementById("add-photo-input")
    const titleInput = document.getElementById("img-title")
    const categoryInput = document.getElementById("img-category")
    const files = addPhotoInput.files
    console.log(files)
    const file = files[0]
    const photoForm = document.getElementById('modalform-add')
    validFileSize(files)
    validFileType(files)
    if (photoForm.reportValidity() && validFileType(files) && validFileSize(files)) {
        console.log("fichier ok")
        const formDataAdd = new FormData()
        formDataAdd.append("image", file)
        formDataAdd.append("title", titleInput.value)
        formDataAdd.append("category", categoryInput.value)
        await addImage(formDataAdd, token)

        switchModale()
        loadWorks()

        loadGalleryWorks()

    } else {
        if (files.length === 0) {
            alert("Absence de fichier!")
        } else if (!validFileType(files)) {
            alert("Erreur: format de l'image non valide.")
        } else if (!validFileSize(files)) {
            alert("Erreur: la taille de l'image est trop grande.")
        } else if (!titleInput.validity.valid) {
            alert("Erreur: Le titre doit être renseigné.")
        } else if (!categoryInput.validity.valid) {
            alert("Erreur: La catégorie doit être renseignée.")
            return;
        }
    }
}

//ajoute la photo au clic sur le bouton valider
const photoEnPlus = document.querySelector("#ValidPhotoModal")
photoEnPlus.addEventListener("click", (e) => addPhoto(e))

/// affichage miniature de l'image

function imageHandler(e2) {
    let store = document.getElementById('imgstore');
    store.innerHTML = '<img src="' + e2.target.result + '">'
}
// charge l'image miniature
function loadimage(e1) {
    let filename = e1.target.files[0]
    let fr = new FileReader()
    fr.onload = imageHandler
    fr.readAsDataURL(filename)
    document.querySelectorAll('.loadimage').forEach((a) => {
        a.style.display = 'none'
    })
}
// fonction pour que la mignature remplace l'icone, le boutton et le texte d'information de la taille et format de photo
window.onload = function () {
    let y = document.getElementById("add-photo-input")
    y.addEventListener('change', loadimage)
}

