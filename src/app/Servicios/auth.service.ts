import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static isLogged: boolean = false;
  private storage: LocalStorageService = new LocalStorageService();
  constructor() {}

  login(user: string, pass: string): boolean {
    if (user == 'sevian' && pass == '1234') {
      AuthService.isLogged = true;
      return true;
    } else {
      return false;
    }
  }
  //obtenemos lista de usuarios
  loginStorage(user: string, pass: string): boolean {
    const listaUsuarios = this.storage.getItem('users') || [];

    const conectado = listaUsuarios.find(
      (userFind: any) =>
        (userFind.username == user || userFind.correo == user) &&
        userFind.pass == pass
    );

    if (conectado) {
      //guardado del usuario encontrado en el localStorage
      this.storage.setItem('conectado', conectado);
      return true;
    } else {
      return false;
    }
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
      id: listaUsuarios.lenght + 1,
      username: user,
      correo: correo,
      pass: pass,
    };

    listaUsuarios.push(nuevoUsuario);
    this.storage.setItem('users', listaUsuarios);
    return true;
  }

  isConnected(): boolean {
    return this.storage.getItem('conectado') !== null;
  }

  logout() {
    this.storage.removeItem('conectado');
  }
}
