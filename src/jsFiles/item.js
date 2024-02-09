import createToDoForm from './todoform.js';
import mainPageLoad from './first.js';

export default function createProjectPage(divId) {
    const body = document.querySelector("body");
    body.innerHTML = '';

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add("backBtn");
    backButton.addEventListener("click", mainPageLoad);
    

    const newToDoButton = document.createElement('button');
    newToDoButton.textContent = 'New To Do';
    newToDoButton.classList.add("add-toDo");
    newToDoButton.addEventListener("click", function() {
        createToDoForm(divId);
    });
    

    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');

    body.appendChild(backButton);
    body.appendChild(newToDoButton);
    body.appendChild(itemContainer); 
}


