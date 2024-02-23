import { getFormData } from "./display";

//Table 
const table = document.getElementById('todo-content')
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
    tableRow.setAttribute('data', index)
    tableRow.innerHTML = loadTodo(todo)
    table.append(tableRow)
  });
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

function clearTodos(div) {
  div.innerHTML = ''
}

export { todoFactory, parseToDos, addTodo, clearTodos }