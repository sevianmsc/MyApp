import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // <-- Asegúrate que esté esta importación

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true, // <-- Esta línea es CRÍTICA
  imports: [IonicModule] // <-- Esta línea es CRÍTICA para que reconozca los componentes Ionic
})
export class AboutPage implements OnInit {
  constructor() { }
  ngOnInit() { }
}