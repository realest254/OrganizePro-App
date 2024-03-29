import enableEdit from './edit.js';
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

export function populateTodoPage(project){
    createTodoPage(project);
}
// Function to populate todo page with items from local storage
export default function createTodoPage(project) {
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
            console.log(todoObject.checked);
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');

            const todoDetails = document.createElement('p');
            todoDetails.textContent = `Title: ${todoObject.title}`;
            
            todoDetails.addEventListener("click", function() {
                viewItemDetails(todoObject, project);
            });

            // Create checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkbox');
            
            checkbox.checked = todoObject.checked;


            checkbox.addEventListener('change',()=>{handleCheckBox(todoObject,checkbox,project)});
            

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
                // Remove checkbox state associated with the deleted item
                removeCheckboxState(todoObject.id, project);
            });

            todoItem.appendChild(checkbox);
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

// Function to view item details
function viewItemDetails(todoObject, project) {
    // Clear the existing content
    document.body.innerHTML = '';

    // Create a container for the item details
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');

    // Create elements for displaying item details
    const itemTitle = document.createElement('h2');
    itemTitle.textContent = todoObject.title;
    itemTitle.id = "title";
    itemTitle.addEventListener("click",()=>{enableEdit(itemTitle,project,todoObject)});

    const itemDescription = document.createElement('div');
    itemDescription.textContent = todoObject.description;
    itemDescription.id = "description";
    itemDescription.addEventListener("click",()=>{enableEdit(itemDescription,project,todoObject)});

    const dueDate = document.createElement('div');
    dueDate.textContent = `DUE: ${todoObject.dueDate}`;
    dueDate.id = "dueDate";
    dueDate.addEventListener("click",()=>{enableEdit(dueDate,project,todoObject)});

    const itemNotes = document.createElement('div');
    itemNotes.textContent = todoObject.notes;
    itemNotes.id = "notes";
    itemNotes.addEventListener("click",()=>{enableEdit(itemNotes,project,todoObject)});

    const objectPriority = document.createElement('div');
    objectPriority.textContent = `Priority: ${todoObject.priority}`;
    objectPriority.id = "priority";
    objectPriority.addEventListener("click",()=>{enableEdit(objectPriority,project,todoObject)});

    // Create a button for navigating back to the project item list
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Project';
    backButton.classList.add('back-button');

    // Add event listener to the back button
    backButton.addEventListener('click', function() {
        createTodoPage(project); // Navigate back to the project item list
    });

    itemContainer.appendChild(backButton);
    itemContainer.appendChild(itemTitle);
    itemContainer.appendChild(dueDate);
    itemContainer.appendChild(itemDescription);
    itemContainer.appendChild(objectPriority);
    itemContainer.appendChild(itemNotes);

    document.body.appendChild(itemContainer);

    // Add class names or IDs for styling purposes
    itemTitle.classList.add('item-title');
    itemDescription.classList.add('item-description');
    backButton.classList.add('back-button');
}

function handleCheckBox(todoObject,checkbox,project) {
    todoObject.checked = checkbox.checked;

    // Retrieve todo items array from local storage
    const todoItems =  getTodoItemsFromLocalStorage(project);

    // Find the index of the todoObject in the todoItems array
    const index = todoItems.findIndex(item => item.title === todoObject.title);

    if (index !== -1) {
        // Update the todo object in the array
        todoItems[index] = todoObject;

        // Save the updated array back to local storage
        localStorage.setItem(project, JSON.stringify(todoItems));
    }
}
