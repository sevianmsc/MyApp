import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { LocalStorageService } from './local-storage.service'; // Importa tu servicio de localStorage

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly DARK_MODE_KEY = 'darkModeEnabled';

  constructor(
    rendererFactory: RendererFactory2,
    private localStorageService: LocalStorageService // Inyecta tu servicio de localStorage
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme(); // Cargar el tema al inicializar el servicio
  }

  /**
   * Carga el tema guardado en localStorage o detecta la preferencia del sistema.
   */
  private loadTheme() {
    // getItem ya se encarga de JSON.parse, así que obtendremos true, false o null directamente
    const savedTheme: boolean | null = this.localStorageService.getItem(this.DARK_MODE_KEY);

    if (savedTheme === true) { // Si se guardó explícitamente como true
      this.enableDarkMode(true);
    } else if (savedTheme === false) { // Si se guardó explícitamente como false
      this.enableDarkMode(false);
    } else {
      // Si no hay preferencia guardada, verificar la preferencia del sistema operativo
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.enableDarkMode(prefersDark);
    }
  }

  /**
   * Habilita o deshabilita el modo oscuro y guarda la preferencia.
   * @param enable true para modo oscuro, false para modo claro.
   */
  enableDarkMode(enable: boolean) {
    if (enable) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.localStorageService.setItem(this.DARK_MODE_KEY, true); // Guardamos el booleano directamente
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.localStorageService.setItem(this.DARK_MODE_KEY, false); // Guardamos el booleano directamente
    }
  }

  /**
   * Verifica si el modo oscuro está actualmente habilitado.
   * @returns true si el modo oscuro está activo, false en caso contrario.
   */
  isDarkModeEnabled(): boolean {
    return document.body.classList.contains('dark-theme');
  }

  /**
   * Alterna el modo oscuro.
   */
  toggleDarkMode() {
    const currentMode = this.isDarkModeEnabled();
    this.enableDarkMode(!currentMode);
  }
}