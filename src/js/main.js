// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// Import our custom CSS
import '../scss/styles.scss'

import { TodoFactory } from './todoItems.js'

const item = new TodoFactory('title', 'title', 'title', 'title');
console.log(item)
console.log(item.description) 