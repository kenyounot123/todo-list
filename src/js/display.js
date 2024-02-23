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

// Form validation
// function validateFormData(title, description, date) {
//   const todoTitle = title.value
//   const todoDescription = description.value
//   const todoDueDate = date.value
//   inputs = [todoTitle, todoDescription, todoDueDate]
//   if (inputs.some(input => input === '')) {

//   }
// }

export { getFormData }