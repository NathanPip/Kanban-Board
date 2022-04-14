import { projects } from "../data-state";

const getProjectIndex = projID => {
  for (let proj of projects) {
    if (proj.getID === projID) {
      return projects.indexOf(proj);
    }
  }
  console.error("project not found");
};

export { getProjectIndex };
