fetch(`http://localhost:3000/beers`)
.then(res => res.json())
.then(beers => {
    beers.forEach(beer => {
        renderBeer(beer)
    })
})

function renderBeer(beer){
    const ul = document.querySelector('.list-group')
    const li = document.createElement('li')
    li.className = 'list-group-item'
    li.innerText = beer.name
    ul.append(li)
    li.addEventListener('click', () => {
        displayBeer(beer)
    })
}

function displayBeer(beer) {
    fetch(`http://localhost:3000/beers/${beer.id}`)
    .then(res => res.json())
    .then(() =>{
        
        const div = document.querySelector('#beer-detail')
        div.innerHTML = ""

        h1 = document.createElement('h1')
        h1.innerText = beer.name

        image = document.createElement('img')
        image.src = beer.image_url

        h3 = document.createElement('h3')
        h3.innerText = beer.tagline

        text = document.createElement('textarea')
        text.className = 'textA'
        text.innerText = beer.description

        btn = document.createElement('button')
        btn.id = 'edit-beer'
        btn.className = "btn btn-info"
        btn.innerText = "Save"
        btn.addEventListener('click', ()=>{
            
            const newDescArea = document.querySelector('.textA').value
// debugger
            fetch(`http://localhost:3000/beers/${beer.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                description: newDescArea
            }) 
            })
            .then(res => res.json())
            .then(newDescArea =>{ 
                text = document.createElement('textarea')
                text.className = 'textA'
                text.innerText = newDescArea
            
            })
        })

        div.append(h1, image, h3, text, btn)

    })

    
}

