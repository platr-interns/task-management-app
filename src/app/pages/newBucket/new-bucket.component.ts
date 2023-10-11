import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDataService } from 'src/services/user-data.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-bucket.component.html',
  styleUrls: ['./new-bucket.component.scss'],
})
export class NewBucketComponent implements OnInit {
  // constructor(private router: Router, private apiService: ApiService) { }
  constructor(private router: Router, private taskService: TaskService, private userDataService: UserDataService) { }
  ngOnInit() { }


  createNewBucket(bucketTitle: string) {
    if (bucketTitle.trim() !== '') {
      const bucketInfo = {
        name: bucketTitle,
        tasks: [],
        user_id: this.userDataService.getUserId(),
      };
      this.taskService.createBucket(bucketInfo).subscribe({
        next: (bucketData) => {
          console.log("sucess" + bucketData)
          this.router.navigate(['/bucket']);
        },
        error: (error: HttpErrorResponse) => {
          console.error("Error creating bucket: ", error)
        }
      })
    }
  }
}

