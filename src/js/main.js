// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
// Import our custom CSS
import "../scss/styles.scss";

import {
  parseToDos,
  deleteTodo,
  markTodo,
  submitTodo,
  updateEditModalFormContent,
  updateViewModalContent,
} from "./todoItems.js";
import { clearInnerHtml, findRowAndIndexOfButton } from "./miscellaneous.js";
import { formatDistance } from "date-fns";
import {
  projectFactory,
  generateProjectOptions,
  submitProject,
  displayProjects,
  getProject,
  createCurrentProjectDisplay,
  getCurrentProjectDisplayName,
  saveChanges,
  deleteProject,
} from "./projects.js";
//Buttons
const createTodoBtn = document.getElementById("form-submit");
const deleteTodoBtn = document.getElementById("deleteTodo");
const completeTodoBtn = document.getElementById("completeTodo");
const viewAllProjectsBtn = document.getElementById("viewProject");
const projectSubmitBtn = document.getElementById("projectSubmitBtn");
const content = document.getElementById("todo-list-main-content");

//Modals
const todoModal = document.getElementById("todoModal");
const formModal = document.getElementById("formModal");
//Web Storage API
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let projects = JSON.parse(localStorage.getItem("projects")) || [
  projectFactory("Home", []),
];
const homeProject = projects[0];

todoModal && todoModal.addEventListener("show.bs.modal", handleViewModal);
formModal && formModal.addEventListener("show.bs.modal", handleEditModal);
deleteTodoBtn.addEventListener("click", handleDeleteTodo);
completeTodoBtn.addEventListener("click", handleCompleteTodo);
createTodoBtn.addEventListener("click", handleCreateTodo);
viewAllProjectsBtn.addEventListener("click", handleViewAllProjects);
projectSubmitBtn.addEventListener("click", handleProjectSubmit);
content.addEventListener("click", handleContentClick);

initialize();

function handleViewModal(event) {
  const row = event.relatedTarget;
  const currentProject = getProject(projects, getCurrentProjectDisplayName());
  const todoIndex = row.getAttribute("data-index");
  const todo = currentProject.todos[todoIndex];
  updateViewModalContent(todoModal, todo, todoIndex);
}

function handleEditModal(event) {
  const currentProject = getProject(projects, getCurrentProjectDisplayName());
  generateProjectOptions(formModal, projects, currentProject);
  const btn = event.relatedTarget;
  const todoIndex = btn.getAttribute("data-index");
  if (todoIndex !== null) {
    const todo = currentProject.todos[todoIndex];
    updateEditModalFormContent(formModal, todo, todoIndex);
  }
}

function handleDeleteTodo() {
  const { row, rowIndex } = findRowAndIndexOfButton(deleteTodoBtn);
  const currentProject = getProject(projects, getCurrentProjectDisplayName());
  deleteTodo(currentProject.todos, row);
  saveChanges(projects);
  parseToDos(currentProject.todos);
}

function handleCompleteTodo() {
  const { row, rowIndex } = findRowAndIndexOfButton(completeTodoBtn);
  const currentProject = getProject(projects, getCurrentProjectDisplayName());
  const todo = currentProject.todos[rowIndex];
  markTodo(currentProject.todos, row, todo.status);
  saveChanges(projects);
}

function handleCreateTodo() {
  const index = createTodoBtn.getAttribute("data-index");
  const currentProject = getProject(projects, getCurrentProjectDisplayName());
  submitTodo(currentProject.todos, projects, index);
  parseToDos(currentProject.todos);
}

function handleViewAllProjects() {
  clearInnerHtml(content);
  const projectSectionContainer = document.createElement("div");
  projectSectionContainer.classList.add("row", "gap-3");
  const allProjectElements = displayProjects(projects);
  allProjectElements.forEach((element) => {
    projectSectionContainer.innerHTML += element;
    content.append(projectSectionContainer);
  });
}
function handleProjectDelete(e) {
  clearInnerHtml(content);
  deleteProject(projects, e.target.getAttribute("data-project"));
}
function handleProjectSubmit() {
  const projectName = document.querySelector("#projectName");
  const projectNameValue = projectName.value;
  submitProject(projects, projectNameValue);
}
//Handle events for clicking project folders

function handleContentClick(e) {
  if (e.target.id === "deleteProject") {
    handleProjectDelete(e);
  } else {
    handleProjectSelection(e);
  }
}

function handleProjectSelection(e) {
  let projectName = "";
  if (e.target.classList.contains("project-btn")) {
    projectName = e.target.textContent.trim();
  } else if (
    e.target.nodeName === "IMG" &&
    e.target.nextSibling.parentElement.classList.contains("project-btn")
  ) {
    projectName = e.target.nextSibling.parentElement.textContent.trim();
  } else {
    return;
  }
  const currentProject = getProject(projects, projectName);
  clearInnerHtml(content);
  const currentProjectDisplay = createCurrentProjectDisplay(currentProject);
  content.append(currentProjectDisplay);
  parseToDos(currentProject.todos);
}

function initialize() {
  const currentProjectDisplay = createCurrentProjectDisplay(homeProject);
  content.append(currentProjectDisplay);
  parseToDos(homeProject.todos);
}
