import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { LocalStorageService } from './local-storage.service'; 

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly DARK_MODE_KEY = 'darkModeEnabled';

  constructor(
    rendererFactory: RendererFactory2,
    private localStorageService: LocalStorageService 
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme(); 
  }

 
  private loadTheme() {
    
    const savedTheme: boolean | null = this.localStorageService.getItem(this.DARK_MODE_KEY);

    if (savedTheme === true) {
      this.enableDarkMode(true);
    } else if (savedTheme === false) {
      this.enableDarkMode(false);
    } else {
      
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
      this.localStorageService.setItem(this.DARK_MODE_KEY, true);
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.localStorageService.setItem(this.DARK_MODE_KEY, false);
    }
  }

  /**
   * Verifica si el modo oscuro está actualmente habilitado.
   * @returns true si el modo oscuro está activo, false en caso contrario.
   */
  isDarkModeEnabled(): boolean {
    return document.body.classList.contains('dark-theme');
  }

 
  toggleDarkMode() {
    const currentMode = this.isDarkModeEnabled();
    this.enableDarkMode(!currentMode);
  }
}