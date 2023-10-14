

//partie pour le login



//La fonction pour vérifier que le mot de passe et bon et envoyer un résultat
function login(e) {

    //preventDefault pour empêcher submit d'avoir un comportement par défaut
    e.preventDefault()
    // lorsque le mail et mot de passe est correct
    const logInput = {
        email: document.querySelector("#email").value,
        motDePasse: document.querySelector("#motDePasse").value
    }
    console.log(logInput)
    const id = JSON.stringify(logInput)
    console.log(id)
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: id
    })
    
        .then(responseLogin => responseLogin.json())
        .then((responseLog) => {
            if (!responseLog.token) {
                alert("Le email ou mot de passe est incorrect!!")
                return;
            }
            const token = JSON.stringify(responseLog.token)
            window.localStorage.setItem("keyToken", token)
            window.location = "./index.html"

        })


}
// Pour quand on clique sur le bouton se connecter
const loginForm = document.querySelector(".loginForm")
loginForm.addEventListener("submit", (e) => login(e))

