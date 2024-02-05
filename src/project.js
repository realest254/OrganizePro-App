import createProjectPage from './item.js';
import populateTodoPage from './formBtns.js';

export default function handleClick() {
    // Get the name of the clicked div
    const divId = this.id.trim();
    
    // Check if the divName exists as a key in localStorage
    if (!localStorage.getItem(divId)) {
        // If the key doesn't exist, create it and set its value as an empty array
        localStorage.setItem(divId, JSON.stringify([]));
        createProjectPage(divId);
        console.log(`Key '${divId}' created in local storage.`);
    } else {
        populateTodoPage(divId);
        console.log(`Key '${divId}' already exists in local storage.`);
    }
}
