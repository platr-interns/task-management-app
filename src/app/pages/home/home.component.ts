import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import { Bucket } from 'src/models/bucket.model';
// import { Task } from 'src/models/task.model';
import { ApiResponse, Bucket, Task } from 'src/models/apiResponse.model';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  buckets: Bucket[] = [];
  editableBucketTitle: string = '';
  isEditingBucket: boolean = false;
  tasks: Task[] = [];
  completedTasks: Task[] = [];
  uncompletedTasks: Task[] = [];
  // selectedBucket: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        // console.log(typeof (params))
        console.log(params['id'])
        this.taskService.getTask(params['id']).subscribe({
          next: (taskData: ApiResponse<Bucket>) => {
            const task = taskData.data[0].tasks;
            this.tasks = task;

            console.log(this.tasks)
          },
          error: (error: HttpErrorResponse) => {
            console.error("Error fetching tasks: ", error)
          },
        })
      }
    )
    this.taskService.getBuckets().subscribe({
      next: (response: ApiResponse<Bucket>) => {
        this.buckets = response.data;
        console.log(this.buckets)
      },
      error: (error: HttpErrorResponse) => {
        console.error("Error fetching buckets: ", error)
      },

    });


    // this.taskService.getTask().subscribe({
    //   next: (taskData: any) => {
    //     this.tasks = taskData.data;
    //     console.log(this.tasks)
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.error("Error fetching tasks: ", error)
    //   },
    // });
  }

  addNewTask() {
    const newTask: Task = {
      status: 'none',
      name: "New Task",
      hovered: false,
      editable: true,
      userId: 0,
      _id: 0,
      completed: false
    };
    this.uncompletedTasks.push(newTask); // Assuming you want to add new tasks to the uncompletedTasks array
  }

  onEditBucketTitle(bucket: Bucket) {
    // Set the editableBucketTitle to the current bucket title
    this.editableBucketTitle = bucket.name;
    // Set isEditingBucket to true to indicate that editing is in progress
    this.isEditingBucket = true;
    // Set the current bucket to editable
    bucket.editable = true;
  }

  onBucketTitleBlur(bucket: Bucket) {
    // If the editableBucketTitle is not empty, update the bucket title
    if (this.editableBucketTitle.trim() !== '') {
      bucket.name = this.editableBucketTitle;
    }
    // Reset the editableBucketTitle and isEditingBucket
    this.editableBucketTitle = '';
    this.isEditingBucket = false;
    // Set the current bucket to non-editable
    bucket.editable = false;
  }

}
