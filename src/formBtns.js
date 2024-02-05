import createProjectPage from './item.js';

// Function to retrieve todo items from local storage
export function getTodoItemsFromLocalStorage(project) {
    const storedItems = localStorage.getItem(project);
    return storedItems ? JSON.parse(storedItems) : [];
}

// Function to save todo items to local storage
function saveTodoItemsToLocalStorage(todoItems, project) {
    localStorage.setItem(project, JSON.stringify(todoItems));
}

// Function to populate todo page with items from local storage
export default function populateTodoPage(project) {
    createProjectPage(project);
    const itemContainer = document.querySelector('.item-container');
    itemContainer.innerHTML = ''; // Clear existing items

    const todoItems = getTodoItemsFromLocalStorage(project);

    // Populate todo items
    if (!todoItems || todoItems.length === 0) {
        const noItemsMessage = document.createElement('p');
        noItemsMessage.textContent = 'No todo items available.';
        itemContainer.appendChild(noItemsMessage);
    } else {
        // Populate todo items
        todoItems.forEach(todoObject => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            

            const todoDetails = document.createElement('p');
            todoDetails.textContent = `Title: ${todoObject.title}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');

            // Add event listener to delete button
            deleteButton.addEventListener('click', function() {
                // Remove item from array and update local storage
                const updatedTodoItems = todoItems.filter(item => item !== todoObject);
                saveTodoItemsToLocalStorage(updatedTodoItems, project);
                // Remove item from UI
                todoItem.remove();
            });

            todoItem.appendChild(todoDetails);
            todoItem.appendChild(deleteButton);

            itemContainer.appendChild(todoItem);
        });
    }
}

// Function to add a new todo item
export function addTodoItem(todoObject, project) {
    const todoItems = getTodoItemsFromLocalStorage(project);
    todoItems.push(todoObject);
    saveTodoItemsToLocalStorage(todoItems, project);
}
