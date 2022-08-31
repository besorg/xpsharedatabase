import { getLocaleCurrencyCode } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];
  conocimientos: any[] = [];
  formulario: FormGroup = this.fb.group({
    nombre: [],
    apellido: [],
    email: []
  });
  viendoUsuario: any;
  editandoUsuario: any;

  usuariosQ: number;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.usuariosQ = 0;
    this.getAll();
  }

  getAll() {
    this.usuarioService.getAll().subscribe((usuarios: any) => {
        console.log('usuarios', usuarios);
        this.usuarios = usuarios;
        

        if(this.usuarios != null){if(this.usuarios.length>0)this.usuariosQ = 1;else this.usuariosQ=0;}else this.usuariosQ=0;
      })
  }

  checkUsuarios(){
    // console.log(this.usuariosQ);
    if(this.usuariosQ == 0)return 0;
    return 1;
  }

  ver(usuario: any) {
    this.viendoUsuario = usuario;
    this.editandoUsuario = null;

    AppComponent.appCore.pickedUsuario=usuario; // establecer que la global sea el usuario pickeado;
  }

  /*
  save() {
    const values = this.formulario.value;

    console.log(values);

    if (this.editandoUsuario) {
      this.usuarioService.update(this.editandoUsuario.id, values).subscribe(() => {
        this.getAll();
        this.editandoUsuario=null;
        this.formulario.setValue({ nombre: '', apellido: '', email:'' });
      })
    } else {
      this.usuarioService.create(values).subscribe(() => {
        this.getAll();
        this.formulario.setValue({ nombre: '', apellido: '', email:'' });
      })
    }
  }
  */

  edit(usuario: any) {
    this.viendoUsuario = null;
    this.editandoUsuario = usuario;

    this.formulario.setValue({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email
    });

  }

  delete(id: number) {
    const okey = confirm('¿Estás seguro de eliminar el usuario?');

    if (okey) {
      this.usuarioService.delete(id).subscribe(() => {
        this.getAll();
      })
    }
  }

  getAdmin(){
    if(localStorage.getItem('admin') == 'true')return true;
    return false;
  }

  checkLogin(u:any){
    // console.log(u.id);

    if(this.getAdmin())return true;
    if(AppComponent.appCore.checklogin()){
      if(AppComponent.appCore.datos_locales == null)return false;
      if(AppComponent.appCore.datos_locales.nombre == null)return false;
      if(AppComponent.appCore.datos_locales.nombre == "")return false;

      // console.log("----> " + AppComponent.appCore.datos_locales.nombre == this.usuarios[u.id].nombre);

      for (let i = 0; i < this.usuarios.length; i++) {
        if(this.usuarios[i].id == u.id) if(this.usuarios[i].nombre == AppComponent.appCore.datos_locales.nombre)return true;
      }

      //return  AppComponent.appCore.datos_locales.nombre == this.usuarios[u.id].nombre;
    }
    
    return false;
  }

}
