import { Component, OnInit } from '@angular/core';
import { APIService } from '../Servicios/api.service';

@Component({
  selector: 'app-ramos',
  templateUrl: './ramos.page.html',
  styleUrls: ['./ramos.page.scss'],
  standalone: false,
})
export class RamosPage implements OnInit {

  clases: any[] = [];
  profesores: any[] = [];

  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.cargarClases();
    this.cargarProfesores();
  }
  cargarClases() {
    this.apiService.listarClases().subscribe((clases: any[]) => {
      this.clases = clases;
    });
  }
  cargarProfesores() {
    this.apiService.listarUsuarios().subscribe((usuarios: any[]) => {
      this.profesores = usuarios.filter((usuario) => usuario.role === 'teacher');
    });
  }
  obtenerNombreProfesor(teacher_id: number): string {
    const profesor = this.profesores.find((profesor) => profesor.id === teacher_id);
    return profesor ? profesor.username : 'Profesor no encontrado';
  }
}
