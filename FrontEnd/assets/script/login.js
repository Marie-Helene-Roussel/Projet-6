function connect(event) {
    event.preventDefault();
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
            if (!response.token) {
                alert("Identifiant ou mot de passe incorrect");
                return;
            }

            const token = JSON.stringify(response.token);
            window.localStorage.setItem("token", token);
            window.location = "./index.html";
        })
};

const form = document.querySelector(".loginForm")
form.addEventListener("submit", (event) => connect(event))