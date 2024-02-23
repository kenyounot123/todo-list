// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// Import our custom CSS
import '../scss/styles.scss'

import { todoFactory, parseToDos, addTodo, clearTodos } from './todoItems.js'

//Table 
const table = document.getElementById('todo-content')
//Buttons 
const createTodoBtn = document.getElementById('form-submit')

const item = todoFactory('title', 'description', '2/22/2024', 'completed');
const item2 = todoFactory('title2', 'description', '2/22/2024', 'completed');
const item3 = todoFactory('title3', 'description', '2/22/2024', 'completed');
console.log(item)
console.log(item.description) 
let listTodos = [item, item2, item3]

createTodoBtn.addEventListener('click', (e) => {
  console.log(e)
  addTodo(listTodos)
  clearTodos(table)
  parseToDos(listTodos)
  console.log(listTodos)
})

parseToDos(listTodos)
