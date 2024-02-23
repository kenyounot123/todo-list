import { loadTodo } from "./display";

const todoFactory = (title, description, dueDate) => {
  return { title, description, dueDate, status: false}
}

//Take in a list of all todo objects and append it to the DOM 
const table = document.getElementById('todo-content')
const parseToDos = (allToDos) => {
  allToDos.forEach((todo, index) => {
    const tableRow = document.createElement('tr')
    tableRow.setAttribute('data', index)
    tableRow.innerHTML = loadTodo(todo)
    table.append(tableRow)
  });
}

export { todoFactory, parseToDos }