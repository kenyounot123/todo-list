// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// Import our custom CSS
import '../scss/styles.scss'

import { parseToDos, selectedToDo, deleteTodo, markTodo, submitTodo, updateEditModalFormContent, updateViewModalContent } from './todoItems.js'
import { findRowAndIndexOfButton } from './miscellaneous.js';
import { formatDistance } from "date-fns";

//Buttons 
const createTodoBtn = document.getElementById('form-submit')
const deleteTodoBtn = document.getElementById('deleteTodo')
const completeTodoBtn = document.getElementById('completeTodo')
const viewAllProjectsBtn = document.getElementById('viewProject')
//Modals
const todoModal = document.getElementById('todoModal')
const formModal = document.getElementById('formModal')

//Web Storage API
let todos = JSON.parse(localStorage.getItem('todos')) || [];
// Event listener for showing the view modal
if (todoModal) {
  todoModal.addEventListener('show.bs.modal', event => {
    const row = event.relatedTarget;
    const todoIndex = row.getAttribute('data-index');
    const todo = selectedToDo(todos, row);
    updateViewModalContent(todoModal, todo, todoIndex);
  });
}

// Event listener for showing the edit modal
formModal.addEventListener('show.bs.modal', event => {
  const btn = event.relatedTarget;
  const todoIndex = btn.getAttribute('data-index');
  if (todoIndex !== null) {
    const todo = todos[todoIndex];
    updateEditModalFormContent(formModal, todo, todoIndex);
  }
});
//Add event listeners for modal buttons
deleteTodoBtn.addEventListener('click', () => {
  const { row, rowIndex } = findRowAndIndexOfButton(deleteTodoBtn)
  deleteTodo(todos, row)
  parseToDos(todos)
})
completeTodoBtn.addEventListener('click', () => {
  const { row, rowIndex } = findRowAndIndexOfButton(completeTodoBtn)
  const todo = todos[rowIndex]
  markTodo(todos, row, todo.status)
})
createTodoBtn.addEventListener('click', () => {
  const index = createTodoBtn.getAttribute('data-index')
  submitTodo(todos, index)
  parseToDos(todos)
})
// viewAllProjectsBtn.addEventListener('click', () => {
//   const table = document.getElementById('todoTable')
// })
parseToDos(todos)