import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css']
})
export class FormularioRegistroComponent implements OnInit {

  formulario: FormGroup = this.fb.group({
    nombre: [],
    apellido: [],
    email: [],
    passcode: []
  });
  formularioUser: FormGroup = this.fb.group({
    nombre: [],
    apellido: [],
    email: []
  });
  formularioLogin: FormGroup = this.fb.group({
    nombre: [],
    passcode: []
  });

  viendoUsuario: any;
  router: Router;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.viendoUsuario = AppComponent.appCore.pickedUsuario;
    
    this.viendoUsuario.nombre = AppComponent.appCore.pickedUsuario.nombre;
    this.viendoUsuario.apellido = AppComponent.appCore.pickedUsuario.apellido;
    this.viendoUsuario.email = AppComponent.appCore.pickedUsuario.email;
    //this.viendoUsuario.passcode = AppComponent.appCore.pickedUsuario.passcode;

    /*
    this.formulario.setValue({
      nombre: this.viendoUsuario.nombre,
      apellido: this.viendoUsuario.apellido,
      email: this.viendoUsuario.email//,
      //passcode: this.viendoUsuario.passcode
    });
    */
  }

  save(){
    let valido = true;

    if(this.formulario.value['nombre'] == ""){alert("nombre inválido, debes asignar un nombre o nick para registrar un nuevo usuario");valido = false;}
    else if(this.formulario.value['email'] == ""){alert("debes asignar un email para la activación de la cuenta");valido = false;}
    
    if(!valido)return;

    this.formularioLogin.setValue({
      nombre: this.formulario.value['nombre'],
      passcode: this.formulario.value['passcode']
    });
    
    this.formularioUser.setValue({
      nombre: this.formulario.value['nombre'],
      apellido: this.formulario.value['apellido'],
      email: this.formulario.value['email']
    });


    this.usuarioService.createlogin(this.formularioLogin.value).subscribe(() => {
      
      console.log(this.formulario.value['nombre']);
      console.log(this.formulario.value['passcode']);

      localStorage.setItem('usuario', JSON.stringify(this.formulario.value['nombre']));
      localStorage.setItem('passcode', JSON.stringify(this.formulario.value['passcode']));

      this.usuarioService.createuser(this.formularioUser.value).subscribe(() => {
        location.assign("../usuarios");      
      })
    })
  }
      

}