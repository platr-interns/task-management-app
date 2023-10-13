import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import { Bucket } from 'src/models/bucket.model';
// import { Task } from 'src/models/task.model';
import { ApiResponse, Bucket, Task } from 'src/models/apiResponse.model';
import { TaskService } from 'src/services/task.service';
import { AuthService } from 'src/services/auth.service';
import { UserDataService } from 'src/services/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  buckets: Bucket[] = [];
  editableBucketTitle: string = '';
  isEditingBucket: boolean = false;
  selectedBucket?: string;
  tasks: Task[] = [];
  completedTasks: Task[] = [];
  uncompletedTasks: Task[] = [];
  editableTaskTitle: string = '';
  isEditingTask: boolean = false;
  userId = this.userDataService.getUserId();

  constructor(private taskService: TaskService, private route: ActivatedRoute,
    private router: Router, private authService: AuthService, private userDataService: UserDataService) { }


  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      if (authenticated) {
        this.fetchData(); // Fetch data when authenticated
      }
    });
  }


  fetchData() {
    this.taskService.getUserBuckets().subscribe({
      next: (response: ApiResponse<Bucket>) => {
        this.buckets = response.data;
        console.log(this.buckets)
      },
      error: (error: HttpErrorResponse) => {
        console.error("Error fetching buckets: ", error)
      },

    });

    this.route.params.subscribe(
      (params: Params) => {
        // console.log(typeof (params))
        console.log(params['id'])
        if (params['id']) {
          this.selectedBucket = params['id'];
          this.buckets.forEach(bucket => {
            bucket.active = bucket._id === params['id']
          })
          this.taskService.getTask(params['id']).subscribe({
            next: (taskData: ApiResponse<Bucket>) => {
              const task = taskData.data[0].tasks;
              this.tasks = task;
            },
            error: (error: HttpErrorResponse) => {
              console.error("Error fetching tasks: ", error)
            }
          })
        }
      }
    )


  }

  addNewTask() {
    const id = this.route.snapshot.params['id'];
    this.router.navigate(['bucket', id, 'new-task']);
  }

  onEditBucketTitle(bucket: Bucket) {
    // Set the editableBucketTitle to the current bucket title
    this.editableBucketTitle = bucket.name;
    // Set isEditingBucket to true to indicate that editing is in progress
    this.isEditingBucket = true;
    // Set the current bucket to editable
    bucket.editable = true;
    bucket.saveMode = false;
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

  onSaveBucketTitle(bucket: Bucket) {
    if (this.editableBucketTitle.trim() !== '') {
      const payload = {
        name: this.editableBucketTitle,
        id: bucket._id
      }
      console.log(this.editableBucketTitle)
      this.taskService.updateBucket(payload).subscribe({
        next: (response) => {
          console.log("Bucket name successfully updated", response);
          // Reset editable and save mode states
          bucket.editable = false;
          bucket.saveMode = false;
        },
        error: (error) => {
          console.log("Error updating bucket name", error);
        }
      });
    }
  }



  onDeleteBucket(bucket: Bucket) {
    const confirmed = confirm(`Are you sure you want to delete ${bucket.name}?`);

    if (confirmed) {
      this.deleteBucket(bucket._id); // Assuming deleteBucket takes an id as an argument
    }
  }

  // Define deleteBucket function in your component
  deleteBucket(id: any) {
    // Send a delete HTTP request to your API
    // Example using Angular's HttpClient:
    this.taskService.deleteBucket(id).subscribe({
      next: (response) => {
        console.log("Bucket succesfully deleted", response)
        this.buckets = this.buckets.filter(bucket => bucket._id !== id);

      },
      error: (error) => {
        console.log("Error occur", error)
      }
    })
  }


  // Tasks functionality

  onEditTaskTitle(task: Task) {
    // Set the editableTaskTitle to the current Task title
    this.editableTaskTitle = task.name;
    // Set isEditingTask to true to indicate that editing is in progress
    this.isEditingTask = true;
    // Set the current task to editable
    task.editable = true;
    task.saveMode = false;
  }

  onTaskTitleBlur(task: Task) {
    // If the editableTaskTitle is not empty, update the Task title
    if (this.editableTaskTitle.trim() !== '') {
      task.name = this.editableTaskTitle;
    }
    // Reset the editableTaskTitle and isEditingTask
    this.editableTaskTitle = '';
    this.isEditingTask = false;
    // Set the current task to non-editable
    task.editable = false;
  }


  onSaveTaskTitle(task: Task) {
    if (this.editableTaskTitle.trim() !== '') {
      const payload = {
        name: this.editableTaskTitle,
        id: task.id
      }
      console.log(this.editableTaskTitle)
      this.taskService.updateTask(payload).subscribe({
        next: (response) => {
          console.log("Task name successfully updated", response);
          // Reset editable and save mode states
          task.editable = false;
          task.saveMode = false;
        },
        error: (error) => {
          console.log("Error updating Task name", error);
        }
      });
    }
  }



  onDeleteTask(task: Task) {
    const confirmed = confirm(`Are you sure you want to delete ${task.name}?`);

    if (confirmed) {
      console.log(task.id);

      this.deleteTask(task.id); // Assuming deleteTask takes an id as an argument
    }
  }

  // Define deleteTask function in your component
  deleteTask(id: any) {
    // Send a delete HTTP request to your API
    // Example using Angular's HttpClient:
    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        console.log("Bucket succesfully deleted", response)
        this.tasks = this.tasks.filter(task => task.id !== id);

      },
      error: (error) => {
        console.log("Error occur", error)
      }
    })
  }


}
