import { Component, OnInit } from '@angular/core';

import { getLocaleCurrencyCode } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})



export class FormularioLoginComponent implements OnInit {

  usuarios: any[] = [];
  conocimientos: any[] = [];
  formulario: FormGroup = this.fb.group({
    nombre: [],
    passcode: []
  });
  viendoUsuario: any;
  editandoUsuario: any;

  
  datos_recuperados: any = ({
    nombre: [],
    passcode: []
  });
  
  datos_locales: any = ({
    nombre: [],
    passcode: []
  });


  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {    
    this.datos_locales = [];

    

    this.datos_locales.nombre = localStorage.getItem('usuario')==null||localStorage.getItem('usuario')==''?"":localStorage.getItem('usuario')?.split('"')[1]; 
    this.datos_locales.passcode = localStorage.getItem('passcode')==null||localStorage.getItem('passcode')==''?"":localStorage.getItem('passcode')?.split('"')[1]; 
    
    //this.formulario.value['nombre'] = this.h.valueOf('nombre');
    //this.formulario.value['passcode'] = JSON.parse(this.h.nombre+"");

    // this.formulario.setValue({ nombre: this.h.nombre, passcode: this.h.passcode });

    console.log("datos_locales = usuario: " + this.datos_locales.nombre + " - contraseña: " + this.datos_locales.passcode);

    if(this.datos_locales.nombre==null)return;
    if(this.datos_locales.nombre=='')return;

    this.usuarioService.checklogin(this.datos_locales.nombre, this.datos_locales.passcode).subscribe(data=>{
      this.datos_recuperados = data;
    })
    

  }

  checklogin(){
    return AppComponent.appCore.checklogin();
  }


  login(){
    // console.log(this.formulario.value['usuario']);
    if(this.formulario.value['nombre'] == null || this.formulario.value['nombre'] == ''){
      alert("debes ingresar un nombre de usuario válido para iniciar la sesión");
      return;
    }

    if(this.formulario.value['nombre'] == "admin" && this.formulario.value['passcode'] == "admin"){
      AppComponent.admin = true;
      
      localStorage.setItem('admin', JSON.stringify(true));
      
      alert("ingresando como admin");
      location.assign("../usuarios");

      return;
    }

    
    localStorage.setItem('usuario', JSON.stringify(this.formulario.value['nombre']));
    localStorage.setItem('passcode', JSON.stringify(this.formulario.value['passcode']));

    console.log(localStorage.getItem('usuario'));
    
    this.usuarioService.checklogin(this.formulario.value['nombre'], this.formulario.value['passcode']).subscribe(data=>{
      this.datos_recuperados = data;
      location.assign("../my-usuario");

      //console.log("1 " + data.hasOwnProperty('nombre'));
    })


    // this.usuarioService.login(this.formulario.value['nombre'], this.formulario.value['passcode']);
  }
}


  /*
  checklogin(){
    this.datos_locales.nombre = localStorage.getItem('usuario')==null||localStorage.getItem('usuario')==''?"":localStorage.getItem('usuario')?.split('"')[1]; 
    this.datos_locales.passcode = localStorage.getItem('passcode')==null||localStorage.getItem('passcode')==''?"":localStorage.getItem('passcode')?.split('"')[1]; 

    console.log("checking login states:");
    
    
    //this.usuarioService.checklogin(this.h.nombre, this.h.passcode).subscribe(data=>{
    //  this.f = data;
      //console.log("1 " + data.hasOwnProperty('nombre'));
    //})
    

    console.log("locales: usuario: " + this.datos_locales.nombre + " - contraseña: " + this.datos_locales.passcode);
    console.log("credenciales: usuario: " + this.datos_recuperados.nombre + " - contraseña: " + this.datos_recuperados.passcode);

    let valid = true;

    if(this.datos_locales.nombre == this.datos_recuperados.nombre)console.log("nombre es igual...");else valid = false;
    if(this.datos_locales.passcode == this.datos_recuperados.passcode)console.log("contraseña es correcta es igual...");else valid = false;

    return valid;
  }
  */


