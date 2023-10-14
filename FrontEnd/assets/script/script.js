let works = []


function loadWorks(categoryId = 0) {

    // fonction pour retourner le résultat sans avoir à attendre
    return fetch("http:/localhost:5678/api/works")
        .then((responseWork) => responseWork.json())
        // retourne tous les élément et recherche chaque élément un à un.
        .then((elements) => {
            // affiche les images défini dans la fonction et le titre pour chaque élément

            works = elements
            console.log(elements)
            displayCategories(categoryId)
        })
}
function displayCategories(categoryId) {
    //nettoie pour afficher une seule fois la galerie
    const divGallery = document.querySelector(".gallery")
    divGallery.innerHTML = ""
    works.forEach(element => {
        if (categoryId === element.categoryId || categoryId == 0) {
            afficherFigureGallery(element.imageUrl, element.title)

        }
    })
}

loadWorks(0)

// création du premier élément html pour la première vignette. Fonction pour l'affichage d'une image!

function afficherFigureGallery(url, title) {
    const divGallery = document.querySelector(".gallery")
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")
    // les paramètres à afficher qui sont définie par element ligne 10.
    img.src = url
    img.alt = title
    figcaption.innerText = title

    divGallery.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)

    console.log(img)

}

// fonctions qui vont afficher les boutons de filtre de la maquette. avec un fetch, en remplaçant le lien par catégorie

//fonctions pour l'affichage du filtre.
function afficherFiltres() {
    const filterDiv = document.querySelector(".filterDiv")
    console.log(filterDiv)
    // fonction pour retourner le résultat des catégories
    return fetch("http://localhost:5678/api/categories")
        .then((responseCategories) => responseCategories.json())
        .then((cats) => { return cats })
        // retourne tous les élément et recherche chaque élément un à un mais cette fois pour les catérgories et non les images
        .then((categories) => {
            categories.forEach(category => {
                const buttons = document.createElement("button")
                //Les paramètres à afficher à partir du style css
                buttons.innerText = category.name
                buttons.className = "buttonFilter"
                buttons.onclick = function () {
                    displayCategories(category.id)
                    // voir avec mentor pourquoi cela fait des erreurs dans la console.
                }
                filterDiv.appendChild(buttons)

            })
        })

}

afficherFiltres()
//une fonction pour le fonctionnement du filtre

const tous = document.querySelector("#tous")
tous.addEventListener("click", (event) => { loadWorks(0) })



