async function loadWorks() {
    const response = await fetch("http:/localhost:5678/api/works") 
console.log(response)
const responseFinale = await response.json()
console.log(responseFinale)
}

loadWorks()

