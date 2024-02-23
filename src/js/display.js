function loadTodo(todo) {
  return `
    <td>${todo.title}</td>
    <td>${todo.dueDate}</td>
    <td>${todo.status}</td>
  `
}
export { loadTodo }