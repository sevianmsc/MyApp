import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private baseURL = "http://localhost:3000/";
  
  constructor(private http:HttpClient) { }
  login(username:string):Observable<any>{
    return this.http.get(this.baseURL+"/users?username=" + username).pipe(retry(3));
  }

  register(data:any):Observable<any>{
    return this.http.post(this.baseURL + "/users", data).pipe(retry(3));
  }

  eliminarUsuario(username:string):Observable<any>{
    return this.http.delete(this.baseURL+"users?username="+username).pipe(retry(3));
  }

  listarUsuarios():Observable<any>{
    return this.http.get(this.baseURL + "/users").pipe(retry(3));
  }
}
