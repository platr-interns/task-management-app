import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';
import { ApiResponse, Bucket, Task } from 'src/models/apiResponse.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserDataService } from './user-data.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // buckets: Bucket[] = [];
  // tasks: Task[] = [];
  // selectedBucket?: string;

  constructor(private webReqService: WebRequestService,
    private route: ActivatedRoute,
    private userDataService: UserDataService,
    private authService: AuthService) { }



  getBuckets(): Observable<ApiResponse<Bucket>> {
    // We want to send a web request to get all the bucket
    return this.webReqService.get<ApiResponse<Bucket>>('bucket/all');
  }
  getUserBuckets(): Observable<ApiResponse<Bucket>> {
    const user_id = this.userDataService.getUserId()
    // We want to send a web request to get all the bucket
    return this.webReqService.get<ApiResponse<Bucket[]>>(`user/${user_id}/buckets`);
  }
  getOneBuckets() {
    // We want to send a web request to get all the bucket
    return this.webReqService.get('bucket/:id');
  }

  createBucket(bucketInfo: { name: string, tasks: any[] }) {
    // We want to send a web request to create a bucket
    return this.webReqService.post('bucket/add', bucketInfo);
  }

  updateBucket(payload: { id: string, name: string }) {
    // We want to send a web request to update a bucket
    return this.webReqService.patch(`bucket/update/${payload.id}`, payload);
  }
  deleteBucket(id: string) {
    // We want to send a web request to delete a bucket
    return this.webReqService.delete(`bucket/delete/${id}`);
  }

  getTask(bucketid: string): Observable<ApiResponse<Bucket>> {
    // We want to send a web request to get all the task in a bucket
    return this.webReqService.get<ApiResponse<Bucket>>(`bucket/${bucketid}/tasks`);
  }
  createTask(taskInfo: { name: string, userId: string, bucketId: string, labels: string[], status: string }) {
    // We want to send a web request to get all the task in a bucket
    return this.webReqService.post('task/add', taskInfo);
  }
  updateTaskStatus(payload: { id: string, status: string }) {
    // We want to send a web request to get all the task in a bucket
    return this.webReqService.patch(`task/update-status/${payload.id}`, payload);
  }
  updateTask(payload: { id: string, name: string }) {
    // We want to send a web request to get all the task in a bucket
    return this.webReqService.patch(`task/update/${payload.id}`, payload);
  }
  deleteTask(id: string) {
    // We want to send a web request to delete a task
    return this.webReqService.delete(`task/delete/${id}`)
  }

}
