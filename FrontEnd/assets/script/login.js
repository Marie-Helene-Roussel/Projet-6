//La fonction pour vérifier que le mot de passe et bon et envoyer un résultat

function connect(event) {
    //preventDefault pour empêcher submit d'avoir un comportement par défaut

    event.preventDefault()
    const logInput = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#motDePasse').value
    };
    console.log(logInput);
    const id = JSON.stringify(logInput);
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: id
    })
        .then(resp => resp.json())
        .then((response) => {
            //Si le mail ou mot de passe est incorrect

            if (!response.token) {
                alert("Identifiant ou mot de passe incorrect")
                return;
            }
            // lorsque le mail et mot de passe est correct

            const token = JSON.stringify(response.token)
            window.localStorage.setItem("token", token)
            window.location = "./index.html"
        })
}
// Pour quand on clique sur le bouton se connecter

const form = document.querySelector(".loginForm")
form.addEventListener("submit", (event) => connect(event))