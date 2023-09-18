import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';
import { ApiResponse, Bucket, Task } from 'src/models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }


  getBuckets(): Observable<ApiResponse<Bucket>> {
    // We want to send a web request to get all the bucket
    return this.webReqService.get<ApiResponse<Bucket>>('bucket/all');
  }
  getOneBuckets() {
    // We want to send a web request to get all the bucket
    return this.webReqService.get('bucket/:id');
  }

  createBucket(bucketInfo: { name: string, tasks: any[] }) {
    // We want to send a web request to create a bucket
    return this.webReqService.post('bucket/add', bucketInfo);
  }

  updateBucket(id: string, title: string) {
    // We want to send a web request to update a bucket
    return this.webReqService.patch(`bucket/${id}`, { title });
  }
  deleteBucket(id: string) {
    // We want to send a web request to delete a bucket
    return this.webReqService.delete(`bucket/${id}`);
  }

  getTask(bucketid: string): Observable<ApiResponse<Bucket>> {
    // We want to send a web request to get all the task in a bucket
    return this.webReqService.get<ApiResponse<Bucket>>(`bucket/${bucketid}/tasks`);
  }
  createTask(title: string) {
    // We want to send a web request to get all the task in a bucket
    return this.webReqService.post(`task`, { title });
  }
  updateTask(id: string, title: string) {
    // We want to send a web request to get all the task in a bucket
    return this.webReqService.patch(`task/${id}`, { title });
  }
  deleteTask(id: string) {
    // We want to send a web request to delete a task
    return this.webReqService.delete(`task/${id}`)
  }

}
