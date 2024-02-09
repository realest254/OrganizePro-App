import createProjectPage from './item.js';
import { populateTodoPage } from './todoPage.js';

export default function handleClick() {
    // Get the name of the clicked div
    const divId = this.firstChild.textContent.trim();
    
    // Check if the divName exists as a key in localStorage
    if (divId !== '') {
        if (!localStorage.getItem(divId)) {
            // If the key doesn't exist, create it and set its value as an empty array
            localStorage.setItem(divId, JSON.stringify([]));
            createProjectPage(divId);
        } else {
            populateTodoPage(divId);
        }
    } else {
        console.error('Invalid project name'); // Handle empty project name
    }
}
