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
  arr.forEach((todo, index) => {
    const tableRow = document.createElement('tr')
    tableRow.classList.add('row-btn')
    tableRow.setAttribute('data-index', index)
    tableRow.setAttribute('data-bs-target', '#todoModal')
    tableRow.setAttribute('data-bs-toggle', 'modal')
    tableRow.innerHTML = loadTodo(todo)
    table.append(tableRow)
  });
}

const selectedToDo = (arr,row) => {
  const index = row.getAttribute('data-index')
  const todo = arr[index]
  return todo
}

//Adding new todo through form submission
function addTodo(arr) {
  const formValues = getFormData(title, description, date)
  const newTodo = todoFactory(formValues.title, formValues.description, formValues.dueDate)
  arr.push(newTodo)
  populateStorage('todos', JSON.stringify(arr))
}

//Load html for todo   
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
function populateStorage(key,value) {
  localStorage.setItem(key,value)
}


export { todoFactory, parseToDos, addTodo, clearTodos, selectedToDo }