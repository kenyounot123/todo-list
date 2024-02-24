import { getFormData, formatDate, clearFormInputs } from "./display";

//Table 
const table = document.getElementById('todo-content')

//Form
const title = document.getElementById('title');
const description = document.getElementById('description')
const date = document.getElementById('date')

//Todo Factory 
const todoFactory = (title, description, dueDate) => {
  return { title, description, dueDate, status: false }
}

//Take in a list of all todo objects and append it to the DOM 
const parseToDos = (arr) => {
  arr.forEach((todo, index) => {
    const tableRow = document.createElement('tr')
    tableRow.classList.add('row-btn')
    if (todo.status === true) {
      tableRow.classList.add('crossed-out')
    }
    tableRow.setAttribute('data-index', index)
    tableRow.setAttribute('data-bs-target', '#todoModal')
    tableRow.setAttribute('data-bs-toggle', 'modal')
    tableRow.innerHTML = loadTodo(todo)
    table.append(tableRow)
  });
}

const selectedToDo = (arr,row) => {
  const index = selectedTodoIndex(row)
  const todo = arr[index]
  return todo
}
const selectedTodoIndex = (row) => {
  return row.getAttribute('data-index')
} 

//Adding new todo through form submission
function addTodo(arr) {
  const formValues = getFormData(title, description, date)
  const newTodo = todoFactory(formValues.title, formValues.description, formValues.dueDate)
  arr.push(newTodo)
  populateStorage('todos', JSON.stringify(arr))
  clearFormInputs()
}

//Load html for todo   
function loadTodo(todo) {
  return `
    <td>${todo.title}</td>
    <td>${todo.dueDate}</td>
    <td class="status">${formatDate(todo.dueDate)}</td>
  `
}

function markTodo(arr, row, status) {
  const todo = selectedToDo(arr, row)
  todo.status = status
  if (!status) {
    crossOut(row)
  } else {
    uncross(row)
  }
  populateStorage('todos', JSON.stringify(arr))
}

function crossOut(row) {
  row.classList.add('crossed-out')
}
function uncross(row) {
  row.classList.remove('crossed-out')
}
//Delete todo
function deleteTodo(arr, row) {
  const index = selectedTodoIndex(row)
  arr.splice(index, 1)
  populateStorage('todos', JSON.stringify(arr))
}
//Clear the table so we can input new entries
function clearTodos(div) {
  div.innerHTML = ''
}
//Add to local storage
function populateStorage(key,value) {
  localStorage.setItem(key,value)
}
function todoStatus(todo) {
  if (todo.status === true) {
    return 'Completed'
  } else {
    return 'Incomplete'
  }
}


export { todoFactory, parseToDos, addTodo, clearTodos, selectedToDo, deleteTodo, markTodo, todoStatus }