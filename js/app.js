// SELECTORS
let taskInput = document.querySelector("#task")
let liveToastBtn = document.querySelector("#liveToastBtn")
let list = document.querySelector("#list")
let li = document.querySelector("#list li")
let addAlert = document.querySelector("#liveToast")



// EVENTS
liveToastBtn.addEventListener("click", newList)
document.addEventListener("DomContentLoaded", displayLocalStorage())



// FUNCTIONS
function newList(){
    if(taskInput.value){
        createList(taskInput.value)
        setLocalStorage(taskInput.value)
        taskInput.value = ""
    }else{
        $(".error").toast("show")
    }
}

function createList(todo){
    const liDOM = document.createElement("li")
    liDOM.innerHTML = todo
    list.appendChild(liDOM)

    const closeBtn = document.createElement("span")
    closeBtn.classList.add("close")
    closeBtn.textContent = "\u00D7"
    liDOM.append(closeBtn)
    
    closeBtn.onclick = removeList
    $(".success").toast("show")
    liDOM.onclick = finishToDo
}

function removeList(){
    this.parentElement.remove()
    deleteLocalStorage(this.previousSibling.textContent)
}

function finishToDo(){
    this.classList.toggle("checked")
}

function getLocalStorage(){
    let todo;
    if(localStorage.getItem("todos") === null){
        todo = [];
    }else{
        todo = JSON.parse(localStorage.getItem("todos"))
    }
    return todo;
}

function displayLocalStorage(){
    const todos = getLocalStorage()
    todos.forEach(todo => {
        createList(todo)
    });
}

function setLocalStorage(todo){
    let todos = getLocalStorage()
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function deleteLocalStorage(text){
    let todos = getLocalStorage()
    todos.forEach((todo, index) => {
        if(todo === text){
            todos.splice(index, 1)
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}