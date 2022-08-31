import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conocimiento',
  templateUrl: './conocimiento.component.html',
  styleUrls: ['./conocimiento.component.css']
})
export class ConocimientoComponent implements OnInit {
  agregarComponente: any;
  formulario: any;
  constructor() { }

  ngOnInit(): void {
    this.agregarComponente=false;
  }

  save(){

  }

}
