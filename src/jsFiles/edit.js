import { getTodoItemsFromLocalStorage } from './todoPage.js';

// Function to enable editing of a view element
export default function enableEdit(view, project, todoObject) {
    let area = null;

    // Trigger edit mode when the view element is clicked
    view.onclick = function() {
        editStart();
    };

    // Function to start the edit mode
    function editStart() {
        // Create a textarea element for editing
        area = document.createElement('textarea');
        area.className = 'edit';
        area.value = view.innerHTML;

        // Handle the 'Enter' key to exit edit mode
        area.onkeydown = function(event) {
            if (event.key == 'Enter') {
                this.blur();
            }
        };

        // Handle the blur event to end edit mode
        area.onblur = function() {
            editEnd();
        };

        // Replace the view element with the textarea element
        view.replaceWith(area);
        area.focus(); // Focus on the textarea
    }

    // Function to end the edit mode
    function editEnd() {
        // Update the content of the view element with the textarea value
        view.innerHTML = area.value;
        // Call the function to update todo object and save to local storage
        updateTodoObject(view, project, todoObject);
        // Replace the textarea element with the original view element
        area.replaceWith(view);
    }
}

// Function to update todo object and save to local storage
function updateTodoObject(view, project, todoObject) {
    const todoItems = getTodoItemsFromLocalStorage(project);
    let content = view.innerHTML;

    // Find the index of the todo object in the array
    const index = todoItems.findIndex(item => item.title === todoObject.title);

    if (index !== -1) {
        // Update the specified property of the todo object
        todoObject[view.id] = content;
        todoItems[index] = todoObject;

        // Save the updated array back to local storage
        localStorage.setItem(project, JSON.stringify(todoItems));
    }
}