import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  constructor(private router: Router, private projectService: ProjectService) { }
  ngOnInit() { }

  createNewProject(title: string) {
    this.projectService.addProject(title);
    this.router.navigate(['/home']);
  };
}
