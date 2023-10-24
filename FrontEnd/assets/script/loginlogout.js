
function sessionActive() {
    // fonction pour gérer l'apparition et la disparition des classes qui doivent apparaître 
    //et disparaître en fonciton du statut de connexion

    const loginSession = document.querySelectorAll(".loginSession")
    const sessionEdit = document.querySelectorAll(".sessionEdit")
    

    // Lorsque l'utilisateur est connecté 

    const tokenSession = window.localStorage.getItem("token")
    if(tokenSession != null){
        sessionEdit.forEach(element => {
            element.style.display = "flex"
        })
        loginSession.forEach(e => {
            e.style.display = "none"
        })
    }

    // il faut que les élément de la classe sessionEdit soit visible
    // et faut que les éléments de la classe loginSession disparaîsse


}

sessionActive()
// pour la déconnection
function deconnectSession(){
    // la fonction doit couper l'accès au token en le supprimant du local storage
    window.localStorage.removeItem("token")
    // revenir à la page index de base
    window.location = "./index.html"


}
const logoutSession = document.querySelector(".logoutSession")
logoutSession.addEventListener("click", deconnectSession )