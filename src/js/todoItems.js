import { getFormData, formatDate, clearFormInputs, datePassed, populateStorage } from "./miscellaneous";


//Todo Factory 
const todoFactory = (title, description, dueDate, project = null) => {
  return { title, 
    description, 
    dueDate,
    status: false,
    project }
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
  const formValues = getFormData(title, description, date, project)
  if (arr[index] !== undefined) { 
    arr[index].title = formValues.title
    arr[index].description = formValues.description
    arr[index].dueDate = formValues.dueDate
    arr[index].project = formValues.project
  } else {
    const newTodo = todoFactory(formValues.title, formValues.description, formValues.dueDate, formValues.project)
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
  <table id="todoTable" class="table table-bordered table-hover">
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
  row.classList.remove('table-danger')
  row.classList.toggle('table-success')
  row.classList.add('crossed-out')
}
function uncross(row) {
  row.classList.toggle('table-success')
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
function todoStatus(todo) {
  if (todo.status === true) {
    return 'Completed'
  } else {
    return 'Incomplete'
  }
}
// Function to update modal content for viewing a todo
const updateViewModalContent = (modal, todo, todoIndex) => {
  const modalTitle = modal.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body');
  const modalDueDate = modal.querySelector('#modalDueDate');

  modalTitle.textContent = `${todo.title} (${todoStatus(todo)})`;
  modalBody.textContent = todo.description;
  modalDueDate.textContent = `Due Date: ${todo.dueDate}`;

  const completeTodoBtn = modal.querySelector('#completeTodo');
  completeTodoBtn.setAttribute('data-index', todoIndex);

  const deleteTodoBtn = modal.querySelector('#deleteTodo');
  deleteTodoBtn.setAttribute('data-index', todoIndex);

  const editBtn = modal.querySelector('#editTodo');
  editBtn.setAttribute('data-index', todoIndex);

  if (todo.status) {
    completeTodoBtn.classList.remove('btn-outline-success');
    completeTodoBtn.classList.add('btn-outline-danger');
    completeTodoBtn.textContent = "Mark incomplete";
    modalDueDate.classList.remove('text-danger');
    modalDueDate.classList.add('text-success');
  } else {
    completeTodoBtn.classList.remove('btn-outline-danger');
    completeTodoBtn.classList.add('btn-outline-success');
    completeTodoBtn.textContent = "Complete";
    modalDueDate.classList.remove('text-success');
    modalDueDate.classList.add('text-danger');
  }
};

// Function to update modal content for editing a todo
const updateEditModalFormContent = (modal, todo, todoIndex) => {
  const todoTitleInput = modal.querySelector('#title');
  const todoDescriptionInput = modal.querySelector('#description');
  const todoDueDateInput = modal.querySelector('#date');
  const modalTitle = modal.querySelector('#formModalLabel');
  const formSubmitBtn = modal.querySelector('#form-submit');

  formSubmitBtn.textContent = 'Update';
  formSubmitBtn.setAttribute('data-index', todoIndex);
  modalTitle.textContent = 'Edit Task';
  todoTitleInput.value = todo.title;
  todoDescriptionInput.value = todo.description;
  todoDueDateInput.value = todo.dueDate;
};



export { todoFactory, parseToDos, submitTodo, selectedToDo, deleteTodo, markTodo, todoStatus, updateEditModalFormContent, updateViewModalContent }