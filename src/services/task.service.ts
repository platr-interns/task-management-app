import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  getBuckets() {
    // We want to send a web request to get all the bucket
    return this.webReqService.get('buckets/all');
  }

  createBucket(title: string) {
    // We want to send a web request to create a bucket
    return this.webReqService.post('buckets', { title });
  }

  updateBucket(id: string, title: string) {
    // We want to send a web request to update a bucket
    return this.webReqService.patch(`buckets/${id}`, { title });
  }
  deleteBucket(id: string) {
    // We want to send a web request to delete a bucket
    return this.webReqService.delete(`buckets/${id}`);
  }

  getTask() {
    // We want to send a web request to get all the task in a bucket
    return this.webReqService.get('task/all');
  }
  createTask(title: string) {
    // We want to send a web request to get all the task in a bucket
    return this.webReqService.post(`tasks`, { title });
  }
  updateTask(id: string, title: string) {
    // We want to send a web request to get all the task in a bucket
    return this.webReqService.patch(`tasks/${id}`, { title });
  }
  deleteTask(id: string) {
    // We want to send a web request to delete a task
    return this.webReqService.delete(`tasks/${id}`)
  }

}
