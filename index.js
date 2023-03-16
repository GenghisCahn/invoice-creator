import {data} from "/data.js"

const tasksEl = document.getElementById('tasks-el')
const totalEl = document.getElementById('total-el')
const BtnContainer = document.getElementById('btn-container')
const invoiceBtn = document.getElementById('invoice-btn')

let tasks = []

renderBtns()

document.addEventListener('click', function(e){
    const clickedItem = e.target
    if(clickedItem.dataset.remove){
        removeTask(clickedItem.dataset.remove)
    } 
    if(clickedItem.classList.contains('service-btn')){
        addTask(data[clickedItem.id -1])
    }
    if(clickedItem === invoiceBtn){
        tasksEl.innerHTML = ""
        totalEl.innerHTML = '£0'
        tasks = []
    }
})


function addTask(newTask){
    const existingTask = tasks.find(task => task.id === newTask.id)
    
    if(!existingTask){
        tasks.push(newTask)
    }    
   renderTasks()
}


function renderBtns(){
    let BtnHtml = ""
            data.forEach(function(item){
                 BtnHtml +=` <button class="service-btn" id=${item.id}>${item.service}
                 : £${item.price}</button>`
            })
             
           BtnContainer.innerHTML = BtnHtml      
}


function renderTasks() {
    let totalPrice = 0
    let tasksHtml = ""
    
    for (let task of tasks){
        tasksHtml += `
    <div class="tasks-inner">
        <h2>${task.service}</h2>
        <button data-remove=${task.id} class="remove-btn">remove</button>
        <h2><span class="accent">£</span>${task.price}</h2>
    </div>
        `
        totalPrice += task.price
    }
    tasksEl.innerHTML = tasksHtml
    totalEl.innerHTML = `£${totalPrice}`
}


function removeTask(taskId){
    taskId = Number(taskId)
    const taskIndex = tasks.findIndex(task => task.id === taskId)
    
    tasks.splice(taskIndex, 1)
    
    renderTasks()
}




