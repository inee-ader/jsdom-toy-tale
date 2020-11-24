

document.addEventListener("DOMContentLoaded", () => {
  let addToy = false; 
  const toyBox = document.querySelector('#toy-collection')
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', (e) => handleSubmit(e))

  const addBtn = document.querySelector('#new-toy-btn')
  const toyFormContainer = document.querySelector('.container')

  function getToys(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => toys.forEach(toy => buildToys(toy)))
  }
  getToys()

  function buildToys(toy){
    let div = document.createElement('div')
    let btn = document.createElement('button')

    btn.addEventListener('click', () => updateLikes(toy))

    btn.innerText = 'Like <3'

    div.id = toy.id
    div.className = 'card'
    div.innerHTML = 
    `
    <h2>${toy.name}</h2>
    <img class='toy-avatar' src='${toy.image}'/>
    <p>${toy.likes} likes</p>
    `
    div.appendChild(btn)
    toyBox.appendChild(div)
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })
   
  function handleSubmit(e){
    e.preventDefault()
    let toy = {
      name: e.target.name.value, 
      image: e.target.image.value, 
      likes: 0
    }
    postToy(toy)
  }

  function postToy(toy){
    fetch('http://localhost:3000/toys', {
      method: 'POST', 
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      }, 
      body: JSON.stringify(toy)
    })
  .then(res => res.json())
  .then(toy => buildToys(toy))
  }

  function updateLikes(toy){
    toy.likes++
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      }, 
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(updatedToy => {
      let oldToy = document.getElementById(toy.id)
      let btn = document.createElement('button')
      oldToy.innerHTML = 
        `
        <h2>${updatedToy.name}</h2>   
        <img src=${updatedToy.image} class="toy-avatar" />
        <p>${updatedToy.likes} likes</p>
        `
      btn.textContent = 'Like <3'
      btn.className = 'like-btn'
      btn.addEventListener('click', () => updateLikes(toy))
      oldToy.append(btn)
    })
  
  }

  


})

