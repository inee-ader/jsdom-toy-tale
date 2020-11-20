
document.addEventListener("DOMContentLoaded", () => {
  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyDiv = document.getElementById('toy-collection')
  const form = document.getElementsByClassName('add-toy-form')[0]
  // const form = document.querySelector('.add-toy-form')[0]
  const URL = 'http://localhost:3000/toys'

  form.addEventListener('click', addNewToy)

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch(URL)
    .then(response => response.json())
    .then(jsonStuff => populatePage(jsonStuff))

    function populatePage(toys){
      // console.log(toys) //to prove that your stuff made it to the next fxn
      toys.forEach(toy => {
        createSingleToyElement(toy)
      })
    }

    function createSingleToyElement(toy){
      // console.log(toy) //to prove we see all the toys coming through
      let newDiv = document.createElement('div')
      newDiv.className = 'card'
      newDiv.id = toy.id

      let h2 = document.createElement('h2')
      h2.innerText = toy.name 

      let img = document.createElement('img')
      img.src = toy.image 
      img.className = 'toy-avatar'

      let p = document.createElement('p')
      p.innerText = `${toy.likes} likes`
      
      let button = document.createElement('button')
      button.className = 'like-btn'
      button.innerText = 'LOVES <3'
      button.addEventListener('click', (e) => {

        let newLikes = toy.likes + 1
        const configObject = {
          method: 'PATCH', 
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }, 
          body: JSON.stringify({
            'likes': newLikes
          })
        }
        // finding that particular toy by restful routes
        fetch(URL + '/' + toy.id, configObject)
          .then(response => response.json())
        // ++ before thing returns incremented value, ++ after thing returns original thing 
          .then(jsonStuff => p.innerText = `${++toy.likes} LOVES`)
      })

      newDiv.append(h2, img, p, button)
      toyDiv.appendChild(newDiv) //can be prepend if you want it to come at the top of page
    }

    function addNewToy(e){
      e.preventDefault()
      // let postData = {name: e.target.name.value, image: e.target.image.value, likes: 0}
      
      const configObject = {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }, 
        body: JSON.stringify({
          name: e.target.name.value, 
          image: e.target.image.value, 
          likes: 0}
      })

      fetch(URL, configObject)
      .then(response => response.json())
      .then(jsonStuff => createSingleToyElement(jsonStuff))
    }


})

