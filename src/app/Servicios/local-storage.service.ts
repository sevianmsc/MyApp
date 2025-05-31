import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string): any {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(`Error al parsear el valor de la clave "${key}" en localStorage`, e);
    return null;
  }
}


  setItem(key:string, value:any):void{
    localStorage.setItem(key,JSON.stringify(value))
  }

  removeItem(key:string):void{
    localStorage.removeItem(key);
  }
}
