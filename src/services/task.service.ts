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
  createTask(taskInfo: { name: string },) {
    // We want to send a web request to get all the task in a bucket
    return this.webReqService.post(`task/add`, { taskInfo });
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
