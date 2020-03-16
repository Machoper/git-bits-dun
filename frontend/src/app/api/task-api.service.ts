import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from 'src/app/dao/task';

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
    return this.http.get<IResponse>(`${baseUrl}/tasks`).pipe(catchError(this.handleError));
  }

  public addTask(task: Task): Observable<IResponse> {
    return this.http.post<IResponse>(`${baseUrl}/task`, task).pipe(catchError(this.handleError));
  }

  public getTask(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${baseUrl}/task/${taskId}`).pipe(catchError(this.handleError));
  }

  public updateTask(task: Task): Observable<IResponse> {
    return this.http.put<IResponse>(`${baseUrl}/task/${task._id}`, task).pipe(catchError(this.handleError));
  }

  public deleteTask(taskId: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${baseUrl}/task/${taskId}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ' + error.error.message);
    } else {
      console.log(`A server error occurred with code ${error.status}. Details: ${error.error}`);
    }
    return throwError('Something went wrong. Please try again later.');
  }
}
