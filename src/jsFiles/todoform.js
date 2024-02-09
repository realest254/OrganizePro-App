import '../styles/formStyle.css';
import extractFormDetails from './todObject.js';
import {addTodoItem, populateTodoPage} from './todoPage.js';
import createTodoPage from './todoPage.js';


export default function createToDoForm(divId) {
    const body = document.querySelector("body");
    body.innerHTML = ''; // Clear the body content

    // Create form container
    const formContainer = document.createElement("div");
    formContainer.classList.add("form-container");

    // Create form element
    const form = document.createElement("form");

    // Create title input
    const titleDiv = document.createElement("div");
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title: ";
    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("placeholder", "Enter title");
    titleInput.id = 'titleInput'; // Set ID for the input
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);

    // Create description input
    const descriptionDiv = document.createElement("div");
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description: ";
    const descriptionInput = document.createElement("textarea");
    descriptionInput.setAttribute("placeholder", "Enter description");
    descriptionInput.id = 'descriptionInput'; // Set ID for the input
    descriptionDiv.appendChild(descriptionLabel);
    descriptionDiv.appendChild(descriptionInput);

    // Create due date input
    const dueDateDiv = document.createElement("div");
    const dueDateLabel = document.createElement("label");
    dueDateLabel.textContent = "Due Date: ";
    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("type", "date");
    dueDateInput.id = 'dueDateInput'; 

    // Set default value to current date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    dueDateInput.value = formattedDate;

    dueDateDiv.appendChild(dueDateLabel);
    dueDateDiv.appendChild(dueDateInput);


    // Create priority input
    const priorityDiv = document.createElement("div");
    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority: ";
    const priorityInput = document.createElement("select");
    const priorityOptions = ["Low", "Medium", "High"];
    priorityOptions.forEach(optionText => {
        const option = document.createElement("option");
        option.textContent = optionText;
        priorityInput.appendChild(option);
    });
    priorityInput.id = 'priorityInput'; // Set ID for the input
    priorityDiv.appendChild(priorityLabel);
    priorityDiv.appendChild(priorityInput);

    // Create notes input
    const notesDiv = document.createElement("div");
    const notesLabel = document.createElement("label");
    notesLabel.textContent = "Notes: ";
    const notesInput = document.createElement("textarea");
    notesInput.setAttribute("placeholder", "Enter notes");
    notesInput.id = 'notesInput'; // Set ID for the input
    notesDiv.appendChild(notesLabel);
    notesDiv.appendChild(notesInput);

    // Create submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Add Todo";
    submitButton.classList.add("submit-button");
    submitButton.setAttribute("type", "button"); // Add type attribute as "submit"
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
    
        // Get the input values
        const titleInput = document.getElementById('titleInput'); 
        const descriptionInput = document.getElementById('descriptionInput'); 
        const dueDateInput = document.getElementById('dueDateInput'); 
        const priorityInput = document.getElementById('priorityInput'); 
        const notesInput = document.getElementById('notesInput'); 
    
        // Extract form details and log the todoObject
        const todoObject = extractFormDetails(titleInput, descriptionInput, dueDateInput, priorityInput, notesInput);
        addTodoItem(todoObject,divId); 
        populateTodoPage(divId);       
    });
    
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancel-button");
    cancelButton.setAttribute("type", "button"); // Add type attribute as "button"
    cancelButton.addEventListener("click",()=>{
        createTodoPage(divId);
    });


    // Append form elements to the form
    form.appendChild(titleDiv);
    form.appendChild(descriptionDiv);
    form.appendChild(dueDateDiv);
    form.appendChild(priorityDiv);
    form.appendChild(notesDiv);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    // Append form to the form container
    formContainer.appendChild(form);

    // Append form container to the body
    body.appendChild(formContainer);
}

