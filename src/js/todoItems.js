import { getFormData } from "./display";

//Table 
const table = document.getElementById('todo-content')
const allRows = document.querySelectorAll('row-btn')

//Form
const title = document.getElementById('title');
const description = document.getElementById('description')
const date = document.getElementById('date')

//Todo Factory 
const todoFactory = (title, description, dueDate) => {
  return { title, description, dueDate, status: false}
}

//Take in a list of all todo objects and append it to the DOM 
const parseToDos = (arr) => {
  let allToDos = getTodosFromStorage(arr)
  allToDos.forEach((todo, index) => {
    const tableRow = document.createElement('tr')
    tableRow.classList.add('row-btn')
    tableRow.setAttribute('data-index', index)
    tableRow.setAttribute('data-bs-target', '#todoModal')
    tableRow.setAttribute('data-bs-toggle', 'modal')
    tableRow.innerHTML = loadTodo(todo)
    table.append(tableRow)
  });
}

const showToDo = (arr,row) => {
  const index = row.getAttribute('data')
  const todo = arr[index]
}

function getTodosFromStorage(arr) {
  //If storage has array then return it 
  //If no existing array then return none
  if (arr.length === 0) {
    return 
  } else {
    return arr
  }
}
//Adding new todo through form submission
function addTodo(arr) {
  const formValues = getFormData(title, description, date)
  arr.push(todoFactory(formValues.title, formValues.description, formValues.dueDate))
}

function loadTodo(todo) {
  return `
    <td>${todo.title}</td>
    <td>${todo.dueDate}</td>
    <td>${todo.status}</td>
  `
}

//Clear the table so we can input new entries
function clearTodos(div) {
  div.innerHTML = ''
}

export { todoFactory, parseToDos, addTodo, clearTodos }