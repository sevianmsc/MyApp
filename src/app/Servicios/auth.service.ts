import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { APIService } from './api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static isLogged: boolean = false;
  private storage: LocalStorageService = new LocalStorageService();
  private api: APIService = new APIService();

  constructor() {}

  login(user: string, pass: string): boolean {
    if (
      (user == 'j.riquelmee' || user == 'jo.riquelmee@duocuc.cl') &&
      pass == 'pass1234'
    ) {
      AuthService.isLogged = true;
      return true;
    } else {
      return false;
    }
  }

  loginStorage(user: string, pass: string): boolean {
    const listaUsuarios = this.storage.getItem('users') || [];
    const conectado = listaUsuarios.find(
      (userFind: any) =>
        (userFind.username == user || userFind.correo == user) &&
        userFind.pass == pass
    );

    if (conectado) {
      // Guardamos el usuario encontrado y su rol en localStorage
      this.storage.setItem('conectado', conectado);
      this.storage.setItem('role', conectado.role); // Guardar el rol
      return true;
    } else {
      return false;
    }
  }

  loginAPI(user: string, pass: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.api.login(user).subscribe((res: any) => {
        if (res.length > 0) {
          if (
            (res[0].username == user || res[0].correo == user) &&
            res[0].pass == pass
          ) {
            this.storage.setItem('conectado', JSON.stringify(res[0]));
            this.storage.setItem('role', res[0].role); // Guardar el rol
            resolve(true);
          } else {
            resolve(false);
            console.log('Credenciales no válidas');
          }
        } else {
          console.log('Llamada vacía');
        }
      });
    });
  }

  registrar(user: string, correo: string, pass: string) {
    const listaUsuarios = this.storage.getItem('users') || [];
    if (
      listaUsuarios.find(
        (userFind: any) =>
          userFind.username == user || userFind.correo == correo
      )
    ) {
      return false;
    }
    const nuevoUsuario = {
      id: listaUsuarios.length + 1,
      username: user,
      correo: correo,
      pass: pass,
    };
    listaUsuarios.push(nuevoUsuario);
    this.storage.setItem('users', listaUsuarios);
    return true;
  }

  async registerAPI(
    user: string,
    correo: string,
    pass: string
  ): Promise<boolean> {
    const users = await firstValueFrom(this.api.listarUsuarios());
    const exists =
      users.find((us: any) => us.username == user || us.correo == correo) !=
      null;
    if (exists) {
      return false;
    }

    const nuevoUsuario = {
      id: users.length + 1,
      username: user,
      correo: correo,
      pass: pass,
    };
    await this.api.register(nuevoUsuario).subscribe();

    return true;
  }

  isConnected(): boolean {
    return this.storage.getItem('conectado') !== null;
  }

  getUserRole(): string | null {
    return this.storage.getItem('role'); // Obtener el rol del usuario
  }

  isAuthenticated(): boolean {
    return this.isConnected(); // Verifica si hay sesión activa
  }

  logout() {
    this.storage.removeItem('conectado');
    this.storage.removeItem('role');
  }

  recuperarContrasena(username: string, nuevaContrasena: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.api.cambiarContrasena(username, nuevaContrasena).subscribe({
        next: () => {
          resolve(true);
        },
        error: (err) => {
          console.error(err.message);
          resolve(false);
        },
      });
    });
  }
}
