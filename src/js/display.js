import { formatDistance, subDays } from "date-fns";
//Return an object containing values for each form input
function getFormData(title, description, date) {
  const todoTitle = title.value
  const todoDescription = description.value
  const todoDueDate = date.value
  return { 
    title: todoTitle,
    description: todoDescription,
    dueDate: todoDueDate
  }
}
// To get the due date as a string
function formatDate(dueDate) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const formattedCurrentDate = `${currentYear}-` +`${currentMonth}-` + `${currentDay}` 
  const result = formatDistance(
    dueDate,
    formattedCurrentDate
  )
  return result
}
function clearFormInputs() {
  const inputs = document.querySelectorAll('input')
  inputs.forEach(input => {
    input.value = '';
  });
  const textArea = document.querySelector('textarea')
  textArea.value = '';
}

export { getFormData, formatDate, clearFormInputs }