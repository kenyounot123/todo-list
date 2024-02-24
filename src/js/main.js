// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// Import our custom CSS
import '../scss/styles.scss'

import { todoFactory, parseToDos, addTodo, clearTodos, selectedToDo, deleteTodo, markTodo, todoStatus } from './todoItems.js'
import { findRowAndIndexOfButton } from './display.js';
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
    const todoIndex = row.getAttribute('data-index')
    // Todo for selected row that triggerd the modal 
    const todo = selectedToDo(todos, row)
    console.log(todo)
    console.log(row)
    // Update the modal's content.
    const modalTitle = todoModal.querySelector('.modal-title')
    const modalBody = todoModal.querySelector('.modal-body')
    const modalDueDate = todoModal.querySelector('#modalDueDate')
    // Dynamically create and style modal buttons/text
    if (todo.status === true) {
      completeTodoBtn.classList.remove('btn-outline-success')
      completeTodoBtn.classList.add('btn-outline-danger')
      completeTodoBtn.textContent = "Mark incomplete"
      modalDueDate.classList.remove('text-danger')
      modalDueDate.classList.add('text-success')
    } else {
      completeTodoBtn.classList.remove('btn-outline-danger')
      completeTodoBtn.classList.add('btn-outline-success')
      completeTodoBtn.textContent = "Completed"
      modalDueDate.classList.remove('text-success')
      modalDueDate.classList.add('text-danger')
    }
    modalTitle.textContent = `${todo.title} (${todoStatus(todo)})` 
    modalBody.textContent = todo.description
    modalDueDate.textContent = `Due Date: ${todo.dueDate}`
    // Give data attributes to modal buttons
    deleteTodoBtn.setAttribute('data-index', todoIndex)
    completeTodoBtn.setAttribute('data-index', todoIndex)
  })
}
//Add event listeners for modal buttons
deleteTodoBtn.addEventListener('click', () => {
  const { row, rowIndex } = findRowAndIndexOfButton(deleteTodoBtn)
  deleteTodo(todos, row)
  clearTodos(table)
  parseToDos(todos)
})
completeTodoBtn.addEventListener('click', () => {
  const { row, rowIndex } = findRowAndIndexOfButton(deleteTodoBtn)
  const todo = todos[rowIndex]
  markTodo(todos, row, todo.status)
})
createTodoBtn.addEventListener('click', () => {
  addTodo(todos)
  clearTodos(table)
  parseToDos(todos)
})
parseToDos(todos)
