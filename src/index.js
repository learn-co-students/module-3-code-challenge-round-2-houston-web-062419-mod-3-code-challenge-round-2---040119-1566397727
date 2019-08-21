const divCol = document.querySelector(".col-md-4")
const ulList = document.querySelector(".list-group")
const divDetail = document.querySelector("#beer-detail")

const beerURL = "http://localhost:3000/beers"

{/* <ul class="list-group">
  <li class="list-group-item">Beer title 1</li>
  <li class="list-group-item">Beer title 2</li>
  /* etc... */
//</ul> */} 
}
fetch(beerURL)
.then(res => res.json())
.then(beers => beers.forEach(beer => renderBeer(beer)))
{/* <h1>Beer Name</h1>
<img src="<add beer img url here>">
<h3>Beer Tagline</h3>
<textarea>Beer Description</textarea>
<button id="edit-beer" class="btn btn-info">
  Save
</button> */}

function renderBeer(beer){
    const li1 = document.createElement("li")
    li1.className = "list-group-item"
    li1.innerText = beer.name 
    li1.addEventListener("click",() => {
        divDetail.innerHTML = ""
        // debugger
        const h1 = document.createElement("h1")
        h1.innerText = beer.name

        const img = document.createElement("img")
        img.src = beer.image_url

        const h3 = document.createElement("h3")
        h3.innerText = beer.tagline

        const textarea = document.createElement("textarea")
        textarea.innerText = beer.description //beer.description 
        // debugger 
        textarea.addEventListener("submit",e => {
            e.preventDefault()
            // updateBeer(textarea)
            fetch(`${beerURL}/${beer.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    description: textarea.innerText 
                })
            })
            .then(response => response.json())
            .then(updateDescription => {
                beer.description = updateDescription.description
            })
        })

        const button = document.createElement("button")
        button.setAttribute("id","edit-beer")
        button.className = "btn btn-info"
        button.innerText = "Save"
        // textarea.addEventListener("submit",e => {
        //     e.preventDefault()
        //     updateBeer(textarea)
        // })

        divDetail.append(h1,img,h3,textarea,button)
    })

    ulList.append(li1)
    divCol.append(ulList)
}
// function updateBeer(textarea){
//     fetch(`${beerURL}/${beer.id}`,{
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             description: textarea.innerText
//         })
//     })
//     .then(response => response.json())
//     .then(updateDescription => {
//         renderBeer(updateDescription)
//     })
// }




