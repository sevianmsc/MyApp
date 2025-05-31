import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { APIService } from './api.service';
import { firstValueFrom, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static isLogged: boolean = false;
  private storage: LocalStorageService = new LocalStorageService();
  private api: APIService;

  constructor(private http: HttpClient) {
    console.log('AuthService: Constructor ejecutado.');
    this.api = new APIService();
  }

  login(user: string, pass: string): boolean {
    console.log('AuthService: Llamada a login (hardcoded/legacy).');
    if (
      (user == 'j.riquelmee' || user == 'jo.riquelmee@duocuc.cl') &&
      pass == 'pass1234'
    ) {
      AuthService.isLogged = true;
      console.log('AuthService: Login hardcoded exitoso.');
      return true;
    } else {
      console.log('AuthService: Login hardcoded fallido.');
      return false;
    }
  }

  loginStorage(user: string, pass: string): boolean {
    console.log('AuthService: Llamada a loginStorage.');
    const listaUsuarios = this.storage.getItem('users') || [];
    const conectado = listaUsuarios.find(
      (userFind: any) =>
        (userFind.username == user || userFind.correo == user) &&
        userFind.pass == pass
    );

    if (conectado) {
      this.storage.setItem('conectado', conectado);
      this.storage.setItem('role', conectado.rol); // Asegúrate que sea "rol" en tu estructura
      return true;
    } else {
      console.log('AuthService: Usuario NO encontrado en localStorage.');
      return false;
    }
  }

  async loginAPI(user: string, pass: string): Promise<boolean> {
    console.log('AuthService: Iniciando loginAPI.');

    const intentarLogin = async (): Promise<boolean> => {
      try {
        let userFound: any[] = await firstValueFrom(
          this.api.login(user).pipe(
            catchError((error) => {
              console.error('Error login por username:', error);
              return of([]);
            })
          )
        );

        if (userFound.length === 0) {
          userFound = await firstValueFrom(
            this.api.logCorreo(user).pipe(
              catchError((error) => {
                console.error('Error login por correo:', error);
                return of([]);
              })
            )
          );
        }

        if (userFound.length > 0) {
          const currentUser = userFound[0];

          if (
            (currentUser.username === user || currentUser.correo === user) &&
            currentUser.pass === pass
          ) {
            this.storage.setItem('conectado', currentUser);
            this.storage.setItem('role', currentUser.role);
            return true;
          } else {
            console.log('AuthService: Credenciales incorrectas.');
            return false;
          }
        } else {
          console.log('AuthService: Usuario no encontrado.');
          return false;
        }
      } catch (error) {
        console.error('AuthService: Error en loginAPI:', error);
        return false;
      }
    };

    const primerIntento = await intentarLogin();
    if (primerIntento) return true;

    console.log('AuthService: Reintentando...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await intentarLogin();
  }

  registrar(user: string, correo: string, pass: string, rol: string): boolean {
    const listaUsuarios = this.storage.getItem('users') || [];
    if (
      listaUsuarios.find(
        (userFind: any) =>
          userFind.username == user || userFind.correo == correo
      )
    ) {
      console.log('AuthService: Usuario ya registrado.');
      return false;
    }

    const nuevoUsuario = {
      id: listaUsuarios.length + 1,
      username: user,
      correo: correo,
      pass: pass,
      rol: rol,
    };

    listaUsuarios.push(nuevoUsuario);
    this.storage.setItem('users', listaUsuarios);
    return true;
  }

  async registerAPI(
    user: string,
    correo: string,
    pass: string,
    role: string
  ): Promise<boolean> {
    console.log('AuthService: Iniciando registerAPI para usuario:', user);

    try {
      const users = await firstValueFrom(this.api.listarUsuarios());

      const exists = users.find(
        (us: any) => us.username === user || us.correo === correo
      );
      if (exists) {
        console.log('AuthService: Usuario/Correo ya existe en la API.');
        return false;
      }

      const nuevoUsuario = {
        id: users.length + 1,
        username: user,
        correo: correo,
        pass: pass,
        role: role,
      };

      await firstValueFrom(this.api.register(nuevoUsuario));
      console.log('AuthService: Usuario registrado correctamente en la API.');
      return true;
    } catch (error) {
      console.error('AuthService: Error durante el registro en la API:', error);
      return false;
    }
  }

  isAuthenticated(): boolean {
    const conectado = this.storage.getItem('conectado');
    return conectado !== null;
  }

  getUserRole(): string | null {
    const role = this.storage.getItem('role');
    return role ? String(role) : null;
  }

  logout() {
    this.storage.removeItem('conectado');
    this.storage.removeItem('role');
  }

  recuperarContrasena(username: string, nuevaContrasena: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.api.cambiarContrasena(username, nuevaContrasena).subscribe({
        next: () => {
          resolve(true);
        },
        error: (err) => {
          console.error('Error al cambiar contraseña:', err.message);
          resolve(false);
        },
      });
    });
  }
}
