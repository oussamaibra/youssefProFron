import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8082/";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeProjectsById():Observable<any>{
    return this.http.get(BASIC_URL + "api/employee/projects",{
      headers:this.createAuthorizationHeader()
    })   
  }
  
  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }
}
