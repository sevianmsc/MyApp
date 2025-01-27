import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, retry, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private baseURL = 'https://cq7nwvn1-3000.brs.devtunnels.ms/';
  private http: HttpClient = inject(HttpClient);
  constructor() {}

  login(username: string): Observable<any> {
    return this.http
      .get(this.baseURL + '/users?username=' + username)
      .pipe(retry(3));
  }

  logCorreo(username: string): Observable<any> {
    return this.http.get(this.baseURL + '/users?correo=' + username).pipe(retry(3));
  }

  register(data: any): Observable<any> {
    return this.http.post(this.baseURL + '/users', data).pipe(retry(3));
  }

  eliminarUsuario(username: string): Observable<any> {
    return this.http
      .delete(this.baseURL + '/users?username=' + username)
      .pipe(retry(3));
  }

  listarUsuarios(): Observable<any> {
    return this.http.get(this.baseURL + '/users').pipe(retry(3));
  }
  cambiarContrasena(username: string, nuevaContrasena: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseURL}/users?username=${username}`).pipe(
      retry(3),
      switchMap((usuarios) => {
        if (usuarios.length > 0) {
          const usuario = usuarios[0];
          usuario.pass = nuevaContrasena;
          return this.http.put(`${this.baseURL}/users/${usuario.id}`, usuario);
        } else {
          throw new Error('Usuario no encontrado');
        }
      })
    );
  }
  
}