import './style.css';
import handleClick from './project.js';

export default function mainPageLoad() {
    const mainContainer = document.createElement('div');

    const title = document.createElement("h1");
    title.textContent = 'OrganizePro';
    title.classList.add('main-title');
    const addButton = createButton('+', handleAddButtonClick);
    
    const homeSection = document.createElement("section");
    homeSection.classList.add('home-section');

    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    if (projects.length === 0) {
        const defaultProject = createProjectDiv('Project1');
        homeSection.appendChild(defaultProject);
        localStorage.setItem('projects', JSON.stringify(['Project1']));
        localStorage.setItem('Project1', ''); // Store an empty string as the value
        
    } else {
        // Create project divs based on the order in the projects array
        projects.forEach(projectName => {
            const projectDiv = createProjectDiv(projectName);
            homeSection.appendChild(projectDiv);
        });
    }

    mainContainer.appendChild(title);
    mainContainer.appendChild(addButton);
    mainContainer.appendChild(homeSection);
    document.body.innerHTML = '';
    document.body.appendChild(mainContainer);
}

export function createProjectDiv(text) {
    const projectContainer = document.createElement('div');
    projectContainer.textContent = text;
    projectContainer.classList.add('project-container');
    projectContainer.id = text;
    projectContainer.addEventListener("click", handleClick);

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-projectBtn');
    deleteButton.addEventListener('click', () => {
        deleteProject(text);
        projectContainer.remove(); // Remove the project from the DOM
    });
    projectContainer.appendChild(deleteButton);

    // Check if Project1 is included in the projects array, and if not, add it
    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    if (!projects.includes('Project1')) {
        projects.unshift('Project1'); // Add Project1 to the beginning of the array
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    
    return projectContainer;
}

export function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add("add-projectBtn");
    button.addEventListener('click', clickHandler);
    return button;
}

export function handleAddButtonClick() {
    const newProjectName = `Project${localStorage.length}`;
    const newProject = createProjectDiv(newProjectName);
    newProject.addEventListener("click", handleClick);
    document.querySelector('.home-section').appendChild(newProject);
    localStorage.setItem(newProjectName, ''); // Store an empty string as the value

    // Update the projects array with the new project name
    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    if (!projects.includes(newProjectName)) {
        projects.push(newProjectName); // Add the new project name to the array
        localStorage.setItem('projects', JSON.stringify(projects));
    }
}
function deleteProject(projectName) {
    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const index = projects.indexOf(projectName);
    if (index !== -1) {
        projects.splice(index, 1); // Remove the project name from the array
        localStorage.setItem('projects', JSON.stringify(projects));
        // Remove the project's data from localStorage
        localStorage.removeItem(projectName);
    }
}