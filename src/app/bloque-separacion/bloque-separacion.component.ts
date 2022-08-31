import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloque-separacion',
  templateUrl: './bloque-separacion.component.html',
  styleUrls: ['./bloque-separacion.component.css']
})
export class BloqueSeparacionComponent implements OnInit {

  nombre: string;
  descripcion: string;

  constructor() { 
  }

  ngOnInit(): void {
  }

  setNombre(nombre:string, descripcion:string){
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

}
