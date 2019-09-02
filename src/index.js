const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false
const createToyForm = document.querySelector(".add-toy-form")


addBtn.addEventListener('click', () => {
 // hide & seek with the form
 addToy = !addToy
 if (addToy) {
   toyForm.style.display = 'block'
 } else {
   toyForm.style.display = 'none'
 }
})

createToyForm.addEventListener('submit', createToy); 

document.addEventListener("DOMContentLoaded", getToys);

function createToy(event) {
   const newToy = {
       name: event.target.name.value,
       image: event.target.image.value,
       likes: 0 
   };
   postToDb(newToy).then(listToy)
}

function addToyToIndex(toys) {
 toys.forEach(toy => {
   listToy(toy)
 });
}

let listToy = toy => {
 let newDiv = document.createElement('div')
 let button = document.createElement('button')
 newDiv.id = `${toy.id}`
 button.className = "like-btn"
 button.innerText = "Like <3"
 button.addEventListener('click', increaseLikes)
 newDiv.className ='card'
 newDiv.innerHTML = `<h2>${toy.name}</h2> <img class= "toy-avatar" src = "${toy.image}"> <p>${toy.likes}</p>`
 newDiv.append(button)
 toyCollection.append(newDiv)
}

function increaseLikes(e) {
  e.target.parentNode.children[2].innerText = parseInt(e.target.parentNode.children[2].innerText) + 1;
  debugger
  fetch(`http://localhost:3000/toys/${e.target.parentElement.id}`, {
    method: "PATCH",
    headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
    },
    body: JSON.stringify({
       likes: `${e.target.parentElement}`.likes +=1
    })
  }).then(resp => resp.json())
}

// function patchLikes(toy) {
//     fetch(`http://localhost:3000/toys/${toy.id}`, {
//         method: "PATCH",
//         headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//         },
//         body: JSON.stringify({
//           likes: toy.likes+=1
//         })
//     }).then(resp => resp.json())
//  }

function postToDb(toy) {
   fetch("http://localhost:3000/toys", {
       method: "POST",
       headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
       },
       body: JSON.stringify(toy)
   }).then(resp => resp.json())
}

function getToys() {
   fetch("http://localhost:3000/toys")
   .then(function(response) {
     return response.json()
   }).then(function(json) {
     addToyToIndex(json)
}) }

