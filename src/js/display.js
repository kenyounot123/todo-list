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
function formatDate(dueDate) {
  const currentDate = new Date();
  const formattedCurrentDate = `${currentDate.getFullYear()}-` +`${currentDate.getMonth() + 1}-` + `${currentDate.getDate()}` 
  console.log(formattedCurrentDate)
  const result = formatDistance(
    dueDate,
    formattedCurrentDate
  )
  return result
}

export { getFormData, formatDate }