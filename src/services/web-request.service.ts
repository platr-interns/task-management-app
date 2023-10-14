import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Bucket, Task } from 'src/models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL

  constructor(private http: HttpClient) {
    // this.ROOT_URL = 'http://localhost:3050'
    this.ROOT_URL = 'https://task-management-application-backend.vercel.app'
  }


  get<T>(url: string): Observable<ApiResponse<Bucket>> {
    return this.http.get<ApiResponse<Bucket>>(`${this.ROOT_URL}/${url}`);
  }

  post(url: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${url}`, payload);
  }

  patch(url: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${url}`, payload);
  }

  delete(url: string) {
    return this.http.delete(`${this.ROOT_URL}/${url}`);
  }


}
