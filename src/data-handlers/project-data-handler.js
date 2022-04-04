import {Project} from '../components'
import { projects } from '../globals';
import { updateProjectStorage } from '../helpers';

const addProject = (name) => {
    const newProj = new Project(name);
    projects.push(newProj);
    updateProjectStorage(projects);
}

export {addProject};