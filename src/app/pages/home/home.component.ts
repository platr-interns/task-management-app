import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/project.model';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projects = this.projectService.getProject();
  }

}
