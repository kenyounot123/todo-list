// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// Import our custom CSS
import '../scss/styles.scss'

import { todoFactory, parseToDos, addTodo, clearTodos, selectedToDo, deleteTodo, completeTodo } from './todoItems.js'
import { formatDistance } from "date-fns";
//Table 
const table = document.getElementById('todo-content')
//Buttons 
const createTodoBtn = document.getElementById('form-submit')
const deleteTodoBtn = document.getElementById('deleteTodo')
const completeTodoBtn = document.getElementById('completeTodo')
//Modals
const todoModal = document.getElementById('todoModal')


const item = todoFactory('title', 'description', '2/22/2024', 'completed');
const item2 = todoFactory('title2', 'description', '2/22/2024', 'completed');
const item3 = todoFactory('title3', 'description', '2/22/2024', 'completed');

//Web Storage API
let todos = JSON.parse(localStorage.getItem('todos')) || [];

if (todoModal) {
  todoModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const row = event.relatedTarget
    // Update the modal's content.
    const modalTitle = todoModal.querySelector('.modal-title')
    const modalBody = todoModal.querySelector('.modal-body')
    const modalDueDate = todoModal.querySelector('#modalDueDate')
    modalTitle.textContent = selectedToDo(todos,row).title
    modalBody.textContent = selectedToDo(todos,row).description
    modalDueDate.textContent = `Due Date: ${selectedToDo(todos, row).dueDate}`
    //Add event listeners for modal buttons
    deleteTodoBtn.addEventListener('click', () => {
      deleteTodo(todos, row)
      clearTodos(table)
      parseToDos(todos)
    })
    completeTodoBtn.addEventListener('click', () => {
      completeTodo(todos, row)
    })
  })
}

createTodoBtn.addEventListener('click', (e) => {
  addTodo(todos)
  clearTodos(table)
  parseToDos(todos)
})
parseToDos(todos)
