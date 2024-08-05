import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { title } from 'process';

const BASIC_URL = "http://localhost:8082/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(BASIC_URL + "api/admin/users",{
      headers:this.createAuthorizationHeader()
    })   
  }

  postProject(projectDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/admin/project",projectDTO, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllProjects():Observable<any>{
    return this.http.get(BASIC_URL + "api/admin/projects",{
      headers:this.createAuthorizationHeader()
    })   
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + "api/admin/project/" + id, {
      headers: this.createAuthorizationHeader()
    })
  }

  
  getProjectById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + "api/admin/project/" + id, {
      headers: this.createAuthorizationHeader()
    })
  }

  updateProject(id: number, projectDTO: any): Observable<any> {
    return this.http.put(`${BASIC_URL}api/admin/project/${id}`, projectDTO, {
      headers: this.createAuthorizationHeader()
    })
  }

  searchProject(title: string): Observable<any> {
    return this.http.get(`${BASIC_URL}api/admin/projects/search/${title}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  createComment(id: number,content: string): Observable<any> {
    const params = {
      content: content
    }
    return this.http.post(BASIC_URL + "api/admin/project/comment/" + id, null, {
      params: params,
      headers: this.createAuthorizationHeader()
    })
  }

  getCommentsByProject(id: number): Observable<any> {
    return this.http.get(BASIC_URL + "api/admin/comments/" + id, {
      headers: this.createAuthorizationHeader()
    })
  }


  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }
}
