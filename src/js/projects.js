import { populateStorage, clearFormInputs, clearInnerHtml } from "./miscellaneous"
//Project Factory 
const projectFactory = (name, todo = null) => {
  return { name, todos: [todo] }
}
//Add or edit project 
const submitProject = (arr, name) => {
  const newProject = projectFactory(name)
  arr.push(newProject)
  populateStorage('projects', JSON.stringify(arr))
  clearFormInputs()
}
//Display projects to DOM
function displayProjects(arr) {
  const todoContent = document.getElementById('todo-list-main-content')
  const projectContent = document.getElementById('project-main-content')
  clearInnerHtml(todoContent)
  clearInnerHtml(projectContent)
  arr.forEach((project) => {
    console.log(projectContent)
    projectContent.innerHTML += loadProject(project)
    todoContent.append(projectContent)
  });
}
//Project html creation
const loadProject = (currentProject) => {
  return `
  <button class="project-btn col-md btn btn-info">
    <img id="folder-icon" src="./assets/folder.svg" alt="Folder Icon"> ${currentProject.name}
  </button>
  `
}
const getProject = (project, todo) => {
  const todoProject = todo.project
  return project[todoProject]
}
//Generate project options for todo form
function generateProjectOptions(modal, projects) {
  const selectElement = modal.querySelector('#project') 
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
export { loadProject, generateProjectOptions, submitProject, displayProjects, projectFactory } 