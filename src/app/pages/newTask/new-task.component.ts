import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDataService } from 'src/services/user-data.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  bucketId: string = "";
  // constructor(private router: Router, private apiService: ApiService) { }
  constructor(private router: Router, private taskService: TaskService,
    private userDataService: UserDataService, private route: ActivatedRoute) {
    this.bucketId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.bucketId = params['id'];
        console.log(this.bucketId)
      }
    )
  }


  createNewTask(taskTitle: string) {
    if (taskTitle.trim() !== '') {
      const taskInfo = {
        name: taskTitle,
        bucketId: this.bucketId,
        labels: [],
        userId: this.userDataService.getUserId(),
      };
      console.log(taskInfo);

      this.taskService.createTask(taskInfo).subscribe({
        next: (taskData) => {
          console.log("sucess" + taskData)
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error: HttpErrorResponse) => {
          console.error("Error creating task: ", error)
        }
      })
    }
  }
}

