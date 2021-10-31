import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  asistencia=[{
    asignatura:'Programacion de Aplicaciones Moviles',
    codigo:'PGY-4121',
    porcentaje:'100% (10 de 10 clases)'
  },
  {
    asignatura:'Calidad de Software',
    codigo:'CSY-41111',
    porcentaje:'80% (8 de 10 clases)'
  },
  {
    asignatura:'Arquitectura',
    codigo:'ASY-4131',
    porcentaje:'100% (10 de 10 clases)'
  },
 {
  asignatura:'Inglés',
  codigo:'INI-5111',
  porcentaje:'60% (6 de 10 clases)'

}]
  constructor() { }

  ngOnInit() {
  }

}
