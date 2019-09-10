const addBtn = document.querySelector('#new-toy-btn')
let addToy = false

document.addEventListener("DOMContentLoaded", getAPI) 

addBtn.addEventListener('click', () => {
 // hide & seek with the form
 addToy = !addToy
 if (addToy) {
   toyForm.style.display = 'block'
 } else {
   toyForm.style.display = 'none'
 }
})

const toyForm = document.querySelector('.container')
let addToyForm = document.querySelector(".add-toy-form")

const toyBox = document.querySelector("#toy-collection")

addToyForm.addEventListener('submit', e => newToyCreate(e))



function getAPI() {
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(allToys)
}

function allToys(toys) {
  toys.forEach(toy => addToyToDOM(toy))
}

function newToyCreate(e) {
  let newToy = {
       name: addToyForm.children[1].value, 
       image: addToyForm.children[2].value, 
       likes: 0
  }
  addToytoAPI(newToy).then(preventDefault(e))
}
//why does the below work but not the above for the images? 
// const newToy = {
//   name: event.target.name.value,
//   image: event.target.image.value,
//   likes: 0 

function addToytoAPI(toy) {
  return fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: {
      "content-type": "application/json", 
      Accept: "application/json"
    }, 
    body: JSON.stringify(toy)
  }
  ).then(resp => resp.json()).then(addToyToDOM)
}

function addToyToDOM(toy) {
  let br1 = document.createElement('br')
  let toyDiv = document.createElement('div')
  toyDiv.classList.add = "card"
  toyDiv.innerHTML = `<h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p >${toy.likes} Likes</p>`
  let likeBtn = document.createElement('button')
  let deletBtn = document.createElement('button')
  likeBtn.classList.add = "like-btn"   
  likeBtn.innerHTML = "Like <3 <br>"  
  deletBtn.innerHTML = "Delete"
  deletBtn.addEventListener('click', e => deleteToy(e, toy))
  likeBtn.addEventListener('click', e => likeToy(e, toy))
  toyDiv.append(likeBtn)
  likeBtn.append(br1)
  toyDiv.append(deletBtn)
  toyBox.append(toyDiv)
}

function likeToy(e, toy) {
  e.target.parentNode.children[2].innerText = (parseInt(e.target.parentNode.children[2].innerText) + 1) + " Likes"; 
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH", 
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
            likes: toy.likes += 1
    })}).then(resp => resp.json())
  }
  
function deleteToy(e, toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "DELETE"
  }).then(deleteFromDom(e, toy))
}

function deleteFromDom(e, toy) {
  e.target.parentNode.remove()
}

function preventDefault(e) {
  e.preventDefault()
}