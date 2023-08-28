import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Bucket } from 'src/models/bucket.model';
import { Task } from 'src/models/task.model';
import { Project } from 'src/models/project.model';
import { ApiService } from 'src/services/project.service';
// import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  buckets: Bucket[] = [];
  projects: Project[] = [];
  editableBucketTitle: string = '';
  isEditingBucket: boolean = false;
  tasks: Task[] = [];
  completedTasks: Task[] = [];
  uncompletedTasks: Task[] = [];

  constructor(private apiService: ApiService) { }

  // constructor(private taskService: TaskService) { }

  ngOnInit() {
    // this.taskService.getBuckets().subscribe({
    //   next: (bucketsData: any) => {
    //     this.buckets = bucketsData;
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.error("Error fetching projects: ", error)
    //   },

    // });

    // this.taskService.getTask().subscribe({
    //   next: (taskData: any) => {
    //     this.tasks = taskData;
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.error("Error fetching tasks: ", error)
    //   },
    // });


    this.apiService.getProjects().subscribe({
      next: (projectData: any) => {
        this.projects = projectData;
      },
      error: (error: HttpErrorResponse) => {
        console.error("Error fetching projects:", error)
      },
    });

    this.apiService.getTasks().subscribe({
      next: (taskData: any) => {
        this.tasks = taskData;
        this.completedTasks = taskData.filter((task: any) => task.completed);
        this.uncompletedTasks = taskData.filter((task: any) => !task.completed);
      },
      error: (error: HttpErrorResponse) => {
        console.error("Error fetching tasks:", error);
      },
    })

  }

  addNewTask() {
    const newTask: Task = {
      title: "New Task",
      hovered: false,
      editable: true,
      userId: 0,
      id: 0,
      completed: false
    };
    this.uncompletedTasks.push(newTask); // Assuming you want to add new tasks to the uncompletedTasks array
  }

  // ...

  onEditBucketTitle(bucket: Bucket) {
    // Set the editableBucketTitle to the current bucket title
    this.editableBucketTitle = bucket.title;
    // Set isEditingBucket to true to indicate that editing is in progress
    this.isEditingBucket = true;
    // Set the current bucket to editable
    bucket.editable = true;
  }

  onBucketTitleBlur(bucket: Bucket) {
    // If the editableBucketTitle is not empty, update the bucket title
    if (this.editableBucketTitle.trim() !== '') {
      bucket.title = this.editableBucketTitle;
    }
    // Reset the editableBucketTitle and isEditingBucket
    this.editableBucketTitle = '';
    this.isEditingBucket = false;
    // Set the current bucket to non-editable
    bucket.editable = false;
  }

  // ...


}
