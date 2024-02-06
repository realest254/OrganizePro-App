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
export default function populateTodoPage(project){
    createTodoPage(project);
}
// Function to populate todo page with items from local storage
export function createTodoPage(project) {
    createProjectPage(project);
    const itemContainer = document.querySelector('.item-container');
    itemContainer.innerHTML = ''; 

    const todoItems = getTodoItemsFromLocalStorage(project);

    // Populate todo items
    if (!todoItems || todoItems.length === 0) {
        const noItemsMessage = document.createElement('p');
        noItemsMessage.textContent = 'No todo items available.';
        itemContainer.appendChild(noItemsMessage);
    } else {
        todoItems.forEach(todoObject => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            

            const todoDetails = document.createElement('p');
            todoDetails.textContent = `Title: ${todoObject.title}`;
            todoDetails.addEventListener("click", function() {
                viewItemDetails(todoObject,project);
            });
            ;

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

function viewItemDetails(todoObject, project) {
    // Clear the existing content
    document.body.innerHTML = '';
    
    // Create elements for displaying item details
    const itemTitle = document.createElement('h2');
    itemTitle.textContent = todoObject.title;

    const itemDescription = document.createElement('p');
    itemDescription.textContent = todoObject.description;

    // Create a button for navigating back to the project item list
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Project';
    backButton.classList.add('back-button');

    // Add event listener to the back button
    backButton.addEventListener('click', function() {
        console.log(project);
        createTodoPage(project); // Navigate back to the project item list
    });

    // Append elements to the container
    document.body.appendChild(backButton);
    document.body.appendChild(itemTitle);
    document.body.appendChild(itemDescription);

    // Add class names or IDs for styling purposes
    itemTitle.classList.add('item-title');
    itemDescription.classList.add('item-description');
    backButton.classList.add('back-button');
}