// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// Import our custom CSS
import '../scss/styles.scss'

import { parseToDos, selectedToDo, deleteTodo, markTodo, submitTodo, updateEditModalFormContent, updateViewModalContent } from './todoItems.js'
import { clearInnerHtml, findRowAndIndexOfButton } from './miscellaneous.js';
import { formatDistance } from "date-fns";
import { projectFactory, generateProjectOptions, submitProject, displayProjects, getProject, createCurrentProjectDisplay } from './projects.js';
//Buttons 
const createTodoBtn = document.getElementById('form-submit')
const deleteTodoBtn = document.getElementById('deleteTodo')
const completeTodoBtn = document.getElementById('completeTodo')
const viewAllProjectsBtn = document.getElementById('viewProject')
const projectSubmitBtn = document.getElementById('projectSubmitBtn')
const content = document.getElementById('todo-list-main-content')

//Modals
const todoModal = document.getElementById('todoModal')
const formModal = document.getElementById('formModal')
//Web Storage API
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let projects = JSON.parse(localStorage.getItem('projects')) || projectFactory('Home', []) ;
const homeProject = projects[0]
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
  generateProjectOptions(formModal, projects)
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
  submitTodo(todos, projects, index)
  parseToDos(todos)
})
viewAllProjectsBtn.addEventListener('click', () => {
  clearInnerHtml(content)
  let projectSectionContainer = document.createElement('div')
  projectSectionContainer.classList.add('row', 'gap-3')
  const allProjectElements = displayProjects(projects)
  allProjectElements.forEach((element) => {
    projectSectionContainer.innerHTML += element
    content.append(projectSectionContainer)
  })
})
projectSubmitBtn.addEventListener('click', () => {
  const projectName = document.querySelector('#projectName')
  const projectNameValue = projectName.value
  submitProject(projects, projectNameValue)
});
content.addEventListener('click', (e) => {
  let projectName = ''
  if (e.target.classList.contains('project-btn')) {
    projectName = e.target.textContent.trim()
  } else if (e.target.nodeName === 'IMG' && e.target.nextSibling.parentElement.classList.contains('project-btn')) {
    projectName = e.target.nextSibling.parentElement.textContent.trim()
  } else {
    return;
  }
  const currentProject = getProject(projects, projectName)
  clearInnerHtml(content)
  const currentProjectDisplay = createCurrentProjectDisplay(currentProject)
  content.append(currentProjectDisplay)
  parseToDos(currentProject.todos)
})

const currentProjectDisplay = createCurrentProjectDisplay(homeProject)
content.append(currentProjectDisplay)
parseToDos(homeProject.todos)