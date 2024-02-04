import './style.css';
import handleClick from './project.js';

export default function mainPageLoad() {
    const title = document.createElement("h1");
    title.textContent = 'OrganizePro';
    title.classList.add('main-title');

    const homeSection = document.createElement("section");
    homeSection.classList.add('home-section');

    // Create a div for the default project
    const defaultProject = createProjectDiv();
    defaultProject.textContent = 'Default Project';

    // Create a button with text '+'
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.addEventListener('click', handleAddButtonClick);

    homeSection.appendChild(defaultProject); // Append the default project container to the home section
    homeSection.appendChild(addButton); // Append the button to the home section

    document.body.appendChild(title);
    document.body.appendChild(homeSection);
}

function createProjectDiv() {
    const projects = document.querySelectorAll('.project-container');
    const id = projects.length + 1;

    const projectContainer = document.createElement('div');
    projectContainer.textContent = `Project${id}`;
    projectContainer.classList.add('project-container');
    projectContainer.id = `project${id}`;
    projectContainer.addEventListener("click", handleClick);
    return projectContainer;
}

function handleAddButtonClick() {
    const newProject = createProjectDiv();
    newProject.addEventListener("click", handleClick);
    document.querySelector('.home-section').appendChild(newProject);
}



