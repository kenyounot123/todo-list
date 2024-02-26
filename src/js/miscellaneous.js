import { formatDistance } from "date-fns";
//Return an object containing values for each form input
function getFormData(title, description, date, project) {
  const todoTitle = title.value
  const todoDescription = description.value
  const todoDueDate = date.value
  const todoProject = project.value 
  return { 
    title: todoTitle,
    description: todoDescription,
    dueDate: todoDueDate,
    project: todoProject
  }
}
//Get row and index given a button
function findRowAndIndexOfButton(button) {
  const allRows = document.querySelectorAll('tr.row-btn');
  const rowIndex = button.getAttribute('data-index');
  const row = allRows[rowIndex];
  return { row, rowIndex };
}
// To get the due date as a string
function formatDate(dueDate) {
  // Get the current date in the local timezone
  const currentDate = new Date();

  // Convert the due date string to a Date object
  const dueDateObject = new Date(dueDate);

  // Calculate the timezone offset in minutes between the local timezone and UTC
  const timezoneOffset = currentDate.getTimezoneOffset();

  // Adjust the due date to the local timezone by adding the offset
  const localDueDate = new Date(dueDateObject.getTime() + (timezoneOffset * 60 * 1000));

  // Format the local due date and current date as strings
  const formattedLocalDueDate = localDueDate.toISOString();
  const formattedCurrentDate = currentDate.toISOString();

  // Calculate the distance between the due date and current date
  const result = formatDistance(
    new Date(formattedLocalDueDate), // Pass the local due date as a Date object
    new Date(formattedCurrentDate), // Pass the current date as a Date object
    { addSuffix: true }
  );

  return result;
}
function datePassed(date) {
  const currentDate = new Date()
  return date < currentDate;
}
function clearFormInputs() {
  const inputs = document.querySelectorAll('input')
  inputs.forEach(input => {
    input.value = '';
  });
  const textArea = document.querySelector('textarea')
  if (textArea !== null) {
    textArea.value = '';
  }
  
}
function populateStorage(key,value) {
  localStorage.setItem(key,value)
}
function clearInnerHtml(element) {
  element.innerHTML = ""
}
export { getFormData, formatDate, clearFormInputs, findRowAndIndexOfButton, datePassed, populateStorage, clearInnerHtml }