// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// Import our custom CSS
import '../scss/styles.scss'

import { todoFactory, parseToDos, addTodo, clearTodos, selectedToDo } from './todoItems.js'
import { formatDistance, subDays } from "date-fns";
//Table 
const table = document.getElementById('todo-content')
//Buttons 
const createTodoBtn = document.getElementById('form-submit')
//Modals
const todoModal = document.getElementById('todoModal')


const item = todoFactory('title', 'description', '2/22/2024', 'completed');
const item2 = todoFactory('title2', 'description', '2/22/2024', 'completed');
const item3 = todoFactory('title3', 'description', '2/22/2024', 'completed');

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
  addTodo(todos)
  clearTodos(table)
  parseToDos(todos)
})

parseToDos(todos)
