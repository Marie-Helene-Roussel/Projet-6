async function loadWorks() {
    const response = await fetch("http:/localhost:5678/api/works") 
console.log(response)
const responseWork = await response.json()
console.log(responseWork)

for (let i = 0 ; i < responseWork.length; i++)
{
console.log(responseWork [i])
}
}

loadWorks()

