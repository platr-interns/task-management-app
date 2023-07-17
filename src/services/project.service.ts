import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private project: Project[] = [];

    public addProject(name: string): void {
        const id = this.project.length + 1;
        const project = new Project(id, name);
        this.project.push(project);
    }

    getProject() {
        return this.project;
    }
}
