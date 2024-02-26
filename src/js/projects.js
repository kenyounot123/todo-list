import { populateStorage, clearFormInputs } from "./miscellaneous"
//Project Factory 
const projectFactory = (name, todo) => {
  return { name, todos: [todo] }
}
const submitProject = (arr, name) => {
  const newProject = { 'name': name }
  arr.push(newProject)
  populateStorage('projects', JSON.stringify(arr))
  clearFormInputs()
}

const loadProject = (currentProject) => {
  return `
  <button class="container col-5 mt-5 btn btn-info">
    <img id="folder-icon" src="./assets/folder.svg" alt="Folder Icon"> ${currentProject.name}
  </button>
  `
}
const getProject = (project, todo) => {
  const todoProject = todo.project
  return project[todoProject]
}
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
export { loadProject, generateProjectOptions, submitProject } 