import { populateStorage, clearFormInputs, clearInnerHtml } from "./miscellaneous"
//Project Factory 
const projectFactory = (name, todo = []) => {
  return { name, todos: todo }
}
//Add or edit project 
const submitProject = (arr, name) => {
  // const projectIndex = findProjectIndex(arr, name)
  // if (projectIndex !== -1) {
  //   const project = getProject(arr, projectIndex)
  // }
  const newProject = projectFactory(name)
  arr.push(newProject)
  populateStorage('projects', JSON.stringify(arr))
  clearFormInputs()
}
//Append todo to project on todo creation 
const addTodoToProject = (arr, name, todo) => {
  const projectIndex = findProjectIndex(arr, name)
  const project = getProject(arr, projectIndex)
  const projectTodos = project.todos
  projectTodos.push(todo) 
  populateStorage('projects', JSON.stringify(arr))
}
//Remove todo from project on todo deletion 
// const deleteTodoFromProject = (arr, name, todo) => {
//   const projectIndex = findProjectIndex(arr, name)
//   const project = getProject(arr, projectIndex)
//   const projectTodos = project.todos
//   projectTodos.pop(projectIndex) 
// }
//Display projects to DOM
function displayProjects(arr) {
  const todoContent = document.getElementById('todo-list-main-content')
  const projectContent = document.getElementById('project-main-content')
  clearInnerHtml(todoContent)
  clearInnerHtml(projectContent)
  arr.forEach((project) => {
    projectContent.innerHTML += loadProject(project)
    todoContent.append(projectContent)
  });
}
//Project html creation
const loadProject = (currentProject) => {
  return `
  <button class="project-btn col-auto btn btn-info">
    <img id="folder-icon" src="./assets/folder.svg" alt="Folder Icon"> ${currentProject.name}
  </button>
  `
}
const getProject = (projects, index) => {
  return projects[index]
}
const findProjectIndex = (projects, name) => {
  return projects.findIndex(project => project.name === name); 
}
//Generate project options for todo form
function generateProjectOptions(modal, projects) {
  const selectElement = modal.querySelector('#project') 
  clearInnerHtml(selectElement)
  //Generate select options for each project
  projects.forEach((project) => {
    const projectName = project.name
    const option = document.createElement('option')
    option.value = projectName
    option.textContent = projectName
    if (projectName === 'Home') {
      option.selected = true;
    }
    selectElement.append(option)
  })
}
export { loadProject, generateProjectOptions, submitProject, displayProjects, projectFactory, addTodoToProject } 