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


const item = todoFactory('title', 'description', '2/22/2024', 'completed');
const item2 = todoFactory('title2', 'description', '2/22/2024', 'completed');
const item3 = todoFactory('title3', 'description', '2/22/2024', 'completed');
let listTodos = [item, item2, item3]

const todoModal = document.getElementById('todoModal')
if (todoModal) {
  todoModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const row = event.relatedTarget
    // Extract info from data-bs-* attributes
    const index = row.getAttribute('data-index')
    // Update the modal's content.
    const modalTitle = todoModal.querySelector('.modal-title')
    const modalBody = todoModal.querySelector('.modal-body')
    console.log(listTodos)
    console.log(selectedToDo(listTodos, index))
    modalTitle.textContent = selectedToDo(listTodos,index).title
    modalBody.textContent = selectedToDo(listTodos,index).description
  })
}

createTodoBtn.addEventListener('click', (e) => {
  addTodo(listTodos)
  clearTodos(table)
  parseToDos(listTodos)
})

parseToDos(listTodos)
