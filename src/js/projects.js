//Project Factory 
const projectFactory = (name, todo) => {
  return { name, todos: [todo] }
}
const addProject = (arr, name) => {
  arr.push()
}

const loadProject = (currentProject) => {
  return `
  <button class="container col-5 mt-5 btn btn-info">
    <img id="folder-icon" src="./assets/folder.svg" alt="Folder Icon"> ${currentProject.name} Project
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
    option.textContent = projectName + ' project'
    if (projectName === 'Home') {
      option.selected = true;
    }
    selectElement.append(option)
  })
}
export { loadProject, generateProjectOptions } 