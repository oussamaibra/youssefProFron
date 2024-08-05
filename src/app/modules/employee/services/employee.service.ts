import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8082/';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployeeProjectsById(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/employee/projects', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getTasksByUserId(id: number): Observable<any> {
    return this.http.get(BASIC_URL + 'api/v1/task/user/' + id, {
      headers: this.createAuthorizationHeader(),
    });
  }
  addTask(task: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/v1/task', task, {
      headers: this.createAuthorizationHeader(),
    });
  }
  updateTask(task: any, id: number): Observable<any> {
    return this.http.put(BASIC_URL + 'api/v1/task/' + id, task, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + 'api/v1/task/' + id, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
