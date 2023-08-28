import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { TaskService } from 'src/services/task.service';
import { ApiService } from 'src/services/project.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) { }
  // constructor(private router: Router, private taskService: TaskService) { }
  ngOnInit() { }


  createNewProject(title: string) {
    // this.apiService.addProject(title);
    this.router.navigate(['/home']);
  };
}
