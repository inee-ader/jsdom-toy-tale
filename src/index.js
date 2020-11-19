let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()

  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', newToy)
  
});

function getToys() {
  const source = "http://localhost:3000/toys"
  fetch(source)
    .then(function(response){
      // console.log(response)
      return response.json()
    })
    .then(function(jsonStuff){
      const toyColl = document.querySelector('#toy-collection')
      toyColl.innerHTML = allToys(jsonStuff)
      addToyListener()
    })
  }

function addToyListener(){
  const toys = document.querySelectorAll('.card')
  toys.forEach((toy) => {
    toy.querySelector('.like-btn').addEventListener('click', likeToy)
  })
}
  
function singleToy(toy){
  return (
    `<div class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar"/>
      <p class='likes'> ${toy.likes} </p>
      <button id="${toy.id}" class="like-btn"> Like <3</button>
    </div>`
    
)}

function allToys(toyArr){
  return toyArr.map(singleToy).join('')
}

function newToy(e){
  const source = "http://localhost:3000/toys"
  e.preventDefault()
  const nameVal = document.querySelector('input[name=name]').value
  const imgVal = document.querySelector('input[name=image').value
  const shinyToy = {
    name: nameVal, 
    image: imgVal,
    likes: 0
  }
  fetch(source, {method: 'POST', headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
      }, body: JSON.stringify(shinyToy)
    })
    .then(response => response.json())
    .then((newObj) => {
      document.querySelector('#toy-collection').innerHTML += singleToy(newObj)
    })
} 

function likeToy(e) {
  const like = document.querySelector('.likes')
  
  console.log(e)
}

