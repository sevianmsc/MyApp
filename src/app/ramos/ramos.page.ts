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

  constructor() {}

  ngOnInit() {
    this.clases = [
      {
        id: 1,
        name: 'Matemáticas Avanzadas',
        code: 'MAT101',
        teacher_id: 101,
        room: 'Sala 204',
        schedule: 'Lunes y Miércoles 10:00 - 11:30',
        section: 'A'
      },
      {
        id: 2,
        name: 'Física Moderna',
        code: 'FIS202',
        teacher_id: 102,
        room: 'Laboratorio F1',
        schedule: 'Martes y Jueves 14:00 - 15:30',
        section: 'B'
      }
    ];

    this.profesores = [
      { id: 101, username: 'Dra. Martínez' },
      { id: 102, username: 'Prof. González' }
    ];
  }

  obtenerNombreProfesor(teacher_id: number): string {
    const profesor = this.profesores.find(p => p.id === teacher_id);
    return profesor ? profesor.username : 'Profesor no encontrado';
  }
}