import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import { Bucket } from 'src/models/bucket.model';
// import { Task } from 'src/models/task.model';
import { ApiResponse, Bucket, Task } from 'src/models/apiResponse.model';
import { TaskService } from 'src/services/task.service';
import { AuthService } from 'src/services/auth.service';

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
  selectedBucket?: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute,
    private router: Router, private authService: AuthService) { }


  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      if (authenticated) {
        this.fetchData(); // Fetch data when authenticated
      }
    });
  }


  fetchData() {
    this.route.params.subscribe(
      (params: Params) => {
        // console.log(typeof (params))
        console.log(params['id'])
        if (params['id']) {
          this.selectedBucket = params['id'];
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

    this.taskService.getUserBuckets().subscribe({
      next: (response: ApiResponse<Bucket>) => {
        this.buckets = response.data;
        console.log(this.buckets)
      },
      error: (error: HttpErrorResponse) => {
        console.error("Error fetching buckets: ", error)
      },

    });
  }

  addNewTask() {
    const newTask: Task = {
      status: 'none',
      name: "New Task",
      hovered: false,
      editable: true,
      userId: '',
      _id: '1',
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


}
