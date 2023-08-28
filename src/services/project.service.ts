import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseUrl = 'https://jsonplaceholder.typicode.com';

    constructor(private http: HttpClient) { }

    getProjects() {
        return this.http.get(`${this.baseUrl}/users/1/posts`);
    }

    getTasks() {
        return this.http.get(`${this.baseUrl}/users/1/todos`);
    }
}
