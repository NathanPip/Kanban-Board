import { v4 as uuidv4 } from "uuid";

export class User {
    constructor({name, projects, uid}) {
        this._name = name;
        this._projects = projects || [];
        this._uid = uuidv4();
    }

    get getName() {
        return this._name;
    }
    
    get getProjects() {
        return this._projects;
    }

    set setProjects(projects) {
        this._projects = projects;
    }
}