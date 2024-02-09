import '../styles/style.css';
import handleClick from './project.js';
import { getTodoItemsFromLocalStorage } from './todoPage.js';

export default function mainPageLoad() {
    const mainContainer = document.createElement('div');
    mainContainer.id = 'home-page';

    const title = document.createElement("h1");
    title.textContent = 'OrganizePro';
    title.classList.add('main-title');
    const addButton = createButton('+', handleAddButtonClick);
    
    const homeSection = document.createElement("section");
    homeSection.classList.add('home-section');

    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    console.log(projects);

    if (projects.length === 0) {
        const defaultProject = createProjectDiv('Project1','Project1');
        homeSection.appendChild(defaultProject);
        localStorage.setItem('projects', JSON.stringify(['Project1']));
        localStorage.setItem('Project1', ''); 
    } else {
        // Create project divs based on the order in the projects array
        projects.forEach((projectName, index) => {
            
            const formattedProjectName = `project${index+1}`;
            const projectDiv = createProjectDiv(formattedProjectName,projectName);
            homeSection.appendChild(projectDiv);
        });
    }

    mainContainer.appendChild(title);
    mainContainer.appendChild(addButton);
    mainContainer.appendChild(homeSection);
    document.body.innerHTML = '';
    document.body.appendChild(mainContainer);
}

export function createProjectDiv(formattedProjectName,name) {
    const projectContainer = document.createElement('div');
    projectContainer.textContent = name;
    projectContainer.classList.add('project-container');
    projectContainer.id = formattedProjectName;
    projectContainer.addEventListener("click", handleClick);

    // Create edit link to Flaticon
    const editLink = document.createElement('div');
        
    editLink.classList.add('edit-link'); 
    projectContainer.appendChild(editLink);
    editLink.addEventListener('click', (event) => {
        // Prevent the event from bubbling up to the parent div
        event.stopPropagation();

        editProjectName(projectContainer);
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-projectBtn');
    deleteButton.addEventListener('click', (event) => {
        // Prevent the event from bubbling up to the parent div
        event.stopPropagation();
        
        deleteProject(name);
        projectContainer.remove(); // Remove the project from the DOM
    });
    projectContainer.appendChild(deleteButton);

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
    let projects = JSON.parse(localStorage.getItem('projects') || '[]');

    // Filter projects that start with 'Project'
    const filteredProjects = projects.filter(project => project.startsWith('Project'));

    // Find the highest project number
    let highestNumber = 0;
    filteredProjects.forEach(project => {
        const number = parseInt(project.replace('Project', ''));
        if (number > highestNumber) {
            highestNumber = number;
        }
    });

    // Generate the next project name and ID
    const newProjectNumber = highestNumber + 1;
    const newProjectName = `Project${newProjectNumber}`;
    const newProjectId = projects.length + 1;

    // Create the project container
    const newProject = createProjectDiv(newProjectId,newProjectName);
    newProject.id = `project-${newProjectId}`; // Assign ID based on the length of projects array
    newProject.addEventListener("click", handleClick);
    document.querySelector('.home-section').appendChild(newProject);

    // Update the projects array with the new project name
    projects.push(newProjectName);
    localStorage.setItem('projects', JSON.stringify(projects));
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

export function editProjectName(projectContainer) {
    const projectNameElement = projectContainer.firstChild;
    const projectName = projectNameElement.textContent;
    const projectId = projectContainer.id;

    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const index = projects.indexOf(projectName);
    let storedItems = getTodoItemsFromLocalStorage(projectName); // Retrieve associated items

    const area = document.createElement('input');
    area.className = 'edit';
    area.value = projectName;

    area.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const newProjectName = area.value.trim();
            if (newProjectName !== '') { // Ensure the new project name is not empty
                projects.splice(index, 1); 
                localStorage.removeItem(projectName); // Remove old project name from storage
                projectNameElement.textContent = newProjectName; // Update project name text
                projectContainer.id = projectId; // Restore original project ID
                projects.splice(index, 0, newProjectName); // Insert new project name
                localStorage.setItem('projects', JSON.stringify(projects)); // Update projects in storage

                if (storedItems.length > 0) {
                    localStorage.setItem(newProjectName, JSON.stringify(storedItems)); // Update new project name with its items
                } else {
                    localStorage.setItem(newProjectName, JSON.stringify([])); // Set it to an empty list if storedItems is empty
                }

                area.parentNode.removeChild(area); // Remove input element
            }
        }
    });

    // Insert the input before the project name element
    projectContainer.insertBefore(area, projectNameElement);
    area.focus();
}