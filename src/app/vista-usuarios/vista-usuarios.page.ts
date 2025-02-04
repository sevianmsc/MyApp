import { Component, OnInit } from '@angular/core';
import { APIService } from '../Servicios/api.service';

@Component({
  selector: 'app-vista-usuarios',
  templateUrl: './vista-usuarios.page.html',
  styleUrls: ['./vista-usuarios.page.scss'],
  standalone: false
})
export class VistaUsuariosPage implements OnInit {

  usuariosStudent: any[] = [];
  cantidadEstudiantes: number = 0;

  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.cargarUsuariosStudent();
  }

  cargarUsuariosStudent() {
    this.apiService.listarUsuarios().subscribe((usuarios: any[]) => {
      this.usuariosStudent = usuarios.filter((usuario) => usuario.role === 'student');
      this.cantidadEstudiantes = this.usuariosStudent.length;
    });
  }
}