// Function to extract details from the form and create an object
export default function extractFormDetails(titleInput,descriptionInput,dueDateInput,priorityInput,notesInput) {
    const title = titleInput.value;
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    const notes = notesInput.value;

    const todoObject = {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        notes: notes
    };

    return todoObject;
}


