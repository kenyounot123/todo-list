// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// Import our custom CSS
import '../scss/styles.scss'

import { todoFactory, parseToDos, addTodo, clearTodos, selectedToDo } from './todoItems.js'

//Table 
const table = document.getElementById('todo-content')
//Buttons 
const createTodoBtn = document.getElementById('form-submit')
const allRows = document.querySelectorAll('row-btn')
//Modals
const todoModal = document.getElementById('todoModal')


const item = todoFactory('title', 'description', '2/22/2024', 'completed');
const item2 = todoFactory('title2', 'description', '2/22/2024', 'completed');
const item3 = todoFactory('title3', 'description', '2/22/2024', 'completed');
// let todos = [item, item2, item3]

//Web Storage API
const todos = JSON.parse(localStorage.getItem('todos')) || [];

if (todoModal) {
  todoModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const row = event.relatedTarget
    // Update the modal's content.
    const modalTitle = todoModal.querySelector('.modal-title')
    const modalBody = todoModal.querySelector('.modal-body')
    modalTitle.textContent = selectedToDo(todos,row).title
    modalBody.textContent = selectedToDo(todos,row).description
  })
}

createTodoBtn.addEventListener('click', (e) => {
  console.log(todos)
  addTodo(todos)
  clearTodos(table)
  parseToDos(todos)
})

parseToDos(todos)
