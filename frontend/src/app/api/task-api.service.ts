import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './../dao/task';

const baseUrl = environment.apiUrl;

interface IResponse {
  data: any;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(private http: HttpClient) { }

  public getTasks(): Observable<IResponse> {
    return this.http.get<IResponse>(`${baseUrl}/tasks`);
  }

  public addTask(task: Task): Observable<IResponse> {
    return this.http.post<IResponse>(`${baseUrl}/task`, task);
  }

  getTask(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${baseUrl}/task/${taskId}`);
  }

  updateTask(task: Task): Observable<IResponse> {
    return this.http.put<IResponse>(`${baseUrl}/task/${task._id}`, task);
  }

  deleteTask(taskId: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${baseUrl}/task/${taskId}`);
  }
}
