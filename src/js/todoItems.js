import { getFormData, formatDate, clearFormInputs, datePassed } from "./miscellaneous";

//Table 
// const table = document.getElementById('todo-content')

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
  clearTodosIfNeeded();
  appendTodoRows(arr);
};

function createTodoRow(todo, index) {
  const tableRow = document.createElement('tr')
  tableRow.classList.add('row-btn')
  if (todo.status === true) {
    tableRow.classList.add('crossed-out')
    tableRow.classList.add('table-success')
  } else if (datePassed(new Date(todo.dueDate))) {
    tableRow.classList.add('table-danger')
  }
  tableRow.setAttribute('data-index', index)
  tableRow.setAttribute('data-bs-target', '#todoModal')
  tableRow.setAttribute('data-bs-toggle', 'modal')
  tableRow.innerHTML = loadTodo(todo)
  return tableRow
}
const appendTodoRows = (arr) => {
  const table = document.getElementById('todo-content');
  arr.forEach((todo, index) => {
    const tableRow = createTodoRow(todo, index);
    table.appendChild(tableRow);
  });
};

const selectedToDo = (arr,row) => {
  const index = selectedTodoIndex(row)
  const todo = arr[index]
  return todo
}
const selectedTodoIndex = (row) => {
  return row.getAttribute('data-index')
} 

//Adding new todo through form submission
function submitTodo(arr, index = null) {
  const formValues = getFormData(title, description, date)
  if (arr[index] !== undefined) { 
    arr[index].title = formValues.title
    arr[index].description = formValues.description
    arr[index].dueDate = formValues.dueDate
  } else {
    const newTodo = todoFactory(formValues.title, formValues.description, formValues.dueDate)
    arr.push(newTodo)
  }
  populateStorage('todos', JSON.stringify(arr))
  clearFormInputs()
}

//Load html for todo   
function loadTodo(todo) {
  return `
    <td>${todo.title}</td>
    <td>${todo.dueDate}</td>
    <td>${formatDate(todo.dueDate)}</td>
  `
}
//Load html for table creation 
function loadTable() {
  return `
  <table class="table table-bordered mt-3 table-hover">
    <thead>
      <th>Title</th>
      <th>Date Due</th>
      <th>Status</th>
    </thead>
    <tbody id="todo-content" class="table-group-divider">
    </tbody>
  </table>
  `
}
//Change status of todo
function markTodo(arr, row, status) {
  if (!status) {
    arr[selectedTodoIndex(row)].status = true
    crossOut(row)
  } else {
    arr[selectedTodoIndex(row)].status = false
    uncross(row)
  }
  populateStorage('todos', JSON.stringify(arr))
}
//Table UI
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
function clearTodosIfNeeded() {
  const table = document.getElementById('todo-content');
  if (table !== null) {
    clearTodos(table);
  } else {
    const contentContainer = document.getElementById('todo-list-main-content');
    contentContainer.innerHTML += loadTable();
  }
};
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


export { todoFactory, parseToDos, submitTodo, selectedToDo, deleteTodo, markTodo, todoStatus }