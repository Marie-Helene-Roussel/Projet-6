function loadWorks() {
    // fonction pour retourner le résultat sans avoir à attendre
    return fetch("http:/localhost:5678/api/works")
        // exécute uniquement s'il a la réponse
        .then((responseWork) => responseWork.json())
        // retourne tous les élément et recherche chaque élément un à un.
        .then((elements) => elements.forEach(element => {
            // affiche les images défini dans la fonction et le titre pour chaque élément
            afficherFigureGallery(element.imageUrl, element.title)

            console.log(elements)
        }))
}

loadWorks()

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

//fonctions pour le filtre.

//une fonction pour l'affichage







//une fonction pour le fonctionnement du filtre