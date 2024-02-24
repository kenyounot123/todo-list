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

export { getFormData }