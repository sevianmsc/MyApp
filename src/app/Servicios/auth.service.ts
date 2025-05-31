import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { APIService } from './api.service';
import { firstValueFrom, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Sólo necesitamos catchError
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
    this.api = new APIService(); // Correcto, APIService inyecta HttpClient internamente.
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
    console.log('AuthService: Llamada a loginStorage (localStorage de usuarios registrados).');
    const listaUsuarios = this.storage.getItem('users') || [];
    console.log('AuthService: Usuarios en localStorage:', listaUsuarios);

    const conectado = listaUsuarios.find(
      (userFind: any) =>
        (userFind.username == user || userFind.correo == user) &&
        userFind.pass == pass
    );

    if (conectado) {
      console.log('AuthService: Usuario encontrado en localStorage:', conectado);
      this.storage.setItem('conectado', conectado); // LocalStorageService lo serializa
      this.storage.setItem('role', conectado.role);
      console.log('AuthService: Sesión guardada en localStorage (loginStorage).');
      return true;
    } else {
      console.log('AuthService: Usuario NO encontrado en localStorage.');
      return false;
    }
  }

  async loginAPI(user: string, pass: string): Promise<boolean> {
    console.log('AuthService: Iniciando loginAPI para usuario/correo:', user);
    console.log('AuthService: Contraseña ingresada:', pass);
    
    // Función auxiliar para el intento de login
    const intentarLogin = async (): Promise<boolean> => {
      try {
        // Intentar buscar por username
        console.log('AuthService: Buscando por username:', user);
        let userFound: any[] = await firstValueFrom(
          this.api.login(user).pipe(
            catchError((error) => {
              console.error('AuthService: Error buscando por username en API:', error);
              return of([]); // Retorna un observable vacío en caso de error
            })
          )
        );
        console.log('AuthService: Resultado búsqueda por username:', userFound);

        // Si no se encontró por username, intentar buscar por correo
        if (userFound.length === 0) {
          console.log('AuthService: No se encontró por username, intentando buscar por correo:', user);
          userFound = await firstValueFrom(
            this.api.logCorreo(user).pipe(
              catchError((error) => {
                console.error('AuthService: Error buscando por correo en API:', error);
                return of([]); // Retorna un observable vacío en caso de error
              })
            )
          );
          console.log('AuthService: Resultado búsqueda por correo:', userFound);
        }

        if (userFound.length > 0) {
          const currentUser = userFound[0];
          console.log('AuthService: Usuario encontrado en API:', currentUser);
          console.log('AuthService: Contraseña del usuario en API:', currentUser.pass);
          console.log('AuthService: Rol del usuario en API:', currentUser.role);

          // Aquí verificamos las credenciales
          const userOrEmailMatch = (currentUser.username === user || currentUser.correo === user);
          const passwordMatch = (currentUser.pass === pass);

          console.log('AuthService: ¿Coincide username/correo?', userOrEmailMatch);
          console.log('AuthService: ¿Coincide contraseña?', passwordMatch);

          if (userOrEmailMatch && passwordMatch) {
            console.log('AuthService: Credenciales válidas. Guardando sesión en localStorage.');
            this.storage.setItem('conectado', currentUser); // Pasa el objeto directamente
            this.storage.setItem('role', currentUser.role);
            console.log('AuthService: Sesión guardada (loginAPI).');
            return true; // Credenciales válidas
          } else {
            console.log('AuthService: Credenciales no válidas: Contraseña incorrecta o usuario/correo no coincide.');
            return false; // Contraseña incorrecta o el usuario/correo no coincide con el encontrado
          }
        } else {
          console.log('AuthService: Usuario NO encontrado por username ni correo en la API.');
          return false; // Usuario no encontrado
        }
      } catch (error) {
        console.error('AuthService: Error en intento de login:', error);
        return false;
      }
    };

    // Primer intento
    console.log('AuthService: Ejecutando primer intento de login...');
    const primerIntento = await intentarLogin();
    if (primerIntento) {
      console.log('AuthService: Primer intento exitoso.');
      return true;
    }

    // Si falló el primer intento, esperar un poco y reintentar
    console.log('AuthService: Primer intento falló, reintentando en 1 segundo...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Segundo intento
    console.log('AuthService: Ejecutando segundo intento de login...');
    const segundoIntento = await intentarLogin();
    if (segundoIntento) {
      console.log('AuthService: Segundo intento exitoso.');
      return true;
    } else {
      console.log('AuthService: Ambos intentos de login fallaron.');
      return false;
    }
  }

  registrar(user: string, correo: string, pass: string) {
    console.log('AuthService: Llamada a registrar (localStorage de usuarios).');
    const listaUsuarios = this.storage.getItem('users') || [];
    if (
      listaUsuarios.find(
        (userFind: any) =>
          userFind.username == user || userFind.correo == correo
      )
    ) {
      console.log('AuthService: Usuario/Correo ya existe (localStorage).');
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
    console.log('AuthService: Nuevo usuario registrado en localStorage.');
    return true;
  }

  async registerAPI(
    user: string,
    correo: string,
    pass: string
  ): Promise<boolean> {
    console.log('AuthService: Iniciando registerAPI para usuario:', user);
    try {
      const users = await firstValueFrom(this.api.listarUsuarios());
      console.log('AuthService: Usuarios existentes en API para registro:', users);

      const exists = users.find((us: any) => us.username == user || us.correo == correo) != null;
      if (exists) {
        console.log('AuthService: Usuario/Correo ya existe en la API. Registro fallido.');
        return false;
      }

      const nuevoUsuario = {
        // id: users.length + 1, // json-server autogenera el id si no se proporciona
        username: user,
        correo: correo,
        pass: pass,
        role: 'student' // Rol por defecto
      };
      console.log('AuthService: Enviando nuevo usuario a la API para registro:', nuevoUsuario);
      await firstValueFrom(this.api.register(nuevoUsuario));
      console.log('AuthService: Usuario registrado exitosamente en la API.');
      return true;
    } catch (error) {
      console.error('AuthService: Error en registerAPI:', error);
      return false;
    }
  }

  isAuthenticated(): boolean {
    console.log('AuthService: Verificando autenticación (isAuthenticated).');
    const conectado = this.storage.getItem('conectado');
    console.log('AuthService: Valor de "conectado" en localStorage:', conectado);
    return conectado !== null;
  }

  getUserRole(): string | null {
    console.log('AuthService: Intentando obtener rol del usuario.');
    const role = this.storage.getItem('role'); // Obtener el rol del usuario
    console.log('AuthService: Valor de "role" en localStorage:', role);

    // Si 'role' no está en localStorage o es null/undefined, devuelve null.
    // Si es una cadena, la devuelve. Si es un objeto, lo convierte a cadena.
    return role ? String(role) : null;
  }

  logout() {
    console.log('AuthService: Ejecutando logout. Limpiando localStorage.');
    this.storage.removeItem('conectado');
    this.storage.removeItem('role');
  }

  recuperarContrasena(username: string, nuevaContrasena: string): Promise<boolean> {
    console.log('AuthService: Iniciando recuperación de contraseña para:', username);
    return new Promise((resolve) => {
      this.api.cambiarContrasena(username, nuevaContrasena).subscribe({
        next: () => {
          console.log('AuthService: Contraseña cambiada exitosamente via API.');
          resolve(true);
        },
        error: (err) => {
          console.error('AuthService: Error al cambiar contraseña via API:', err.message);
          resolve(false);
        },
      });
    });
  }
}