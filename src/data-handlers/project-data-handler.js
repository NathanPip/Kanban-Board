import {Project} from '../components'
import {projects} from '../data-state';
import { updateCurrentProjectStorage, updateProjectStorage } from '../helpers';


const addProject = (name) => {
    const newProj = new Project(name);
    projects.push(newProj);
    updateProjectStorage(projects);
    return newProj;
}

const updateCurrentProject = (newProj) => {
    setCurrentProject(newProj);
    updateCurrentProjectStorage(newProj)
}

export {addProject, updateCurrentProject};