// beerURL = "http://localhost:3000/beers"

document.addEventListener("DOMContentLoaded", function(){

    fetch("http://localhost:3000/beers")
    .then(res => res.json())
    .then(beers => 
        {beers.forEach(beer => {
            renderBeer(beer)
        })
    })

function renderBeer(beer){
    const ul = document.querySelector("#list-group")
    const li = document.createElement("li")
    li.className = "list-group-item"
    li.innerText = beer.name

    ul.append(li)

    li.addEventListener("click", ()=> {
        beerInfo(beer)
    })


}

function beerInfo(beer){
    fetch(`http://localhost:3000/beers/${beer.id}`)

    const divBeer = document.querySelector("#beer-detail")
    divBeer.innerText = ""
    
    const h1 = document.createElement("h1")
    h1.innerText = beer.name

    const img = document.createElement('img')
    img.src = beer.image_url

    const h3 = document.createElement("h3")
    h3.innerText = beer.tagline

    const textArea = document.createElement("textArea")
    textArea.innerText = beer.description


    const bttn = document.createElement("button")
    bttn.id = "edit beer"
    bttn.className = "btn btn-info"
    bttn.innerText = "Save"



    bttn.addEventListener("click", ()=> {
    
        const form = document.querySelector("textarea")

        form.innerHTML = beer.description
        fetch(`http://localhost:3000/beers/${beer.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "description": textArea.value
            })
        })
        .then(res => res.json())
        .then(beer => {
            textArea.innerHTML = beer.description
        })
        

        

    })

    divBeer.append(h1, img, h3, textArea, bttn)
}

// function editBeer(beer){
//     // const form = document.querySelector("textarea")
//     const form = document.querySelector("textarea")


//         fetch(`http://localhost:3000/beers/${beer.id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify({
//                 "description": form.value
//             })    

//         })
//         .then(res => res.json())
//         .then(beer => {
//             form.innerHTML = beer.description
//         })
// }

})