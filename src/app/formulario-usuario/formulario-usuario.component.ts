import { Component, OnInit, DoCheck, Input } from '@angular/core';

import { getLocaleCurrencyCode } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})


export class FormularioUsuarioComponent implements OnInit, DoCheck {

  formulario: FormGroup = this.fb.group({
    nombre: [],
    apellido: [],
    email: []
  });

  conForm: FormGroup = this.fb.group({
    nombre: [],
    descripcion: [],
    nivel: [],
    tiempo: []
  });

  viendoUsuario: any;

  miPorfolio = false;
  editable = false;

  loggedUsuario: any;
  loadedname: string;

  // public static reload = true;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) { }


  checkLogged(){
    if(this.loggedUsuario != null)return true;
    return false;
  }

  ngDoCheck() {
    if(location.pathname=="/my-usuario")if(this.loggedUsuario != AppComponent.appCore.loggedUsuario){
      this.loggedUsuario = AppComponent.appCore.loggedUsuario;
      console.log("Cambio");

      AppComponent.appCore.pickedUsuario = AppComponent.appCore.loggedUsuario;

      if(AppComponent.appCore.loggedUsuario != null && AppComponent.appCore.pickedUsuario != null)
        this.miPorfolio = AppComponent.appCore.pickedUsuario.nombre == AppComponent.appCore.loggedUsuario.nombre;

      console.log("este es mi porfolio = " + this.miPorfolio);

      console.log("AppComponent.appCore.pickedUsuario ");
      console.log(AppComponent.appCore.pickedUsuario);
      
      if(AppComponent.appCore.pickedUsuario != null) {
        this.viendoUsuario = AppComponent.appCore.pickedUsuario;
      
        this.viendoUsuario.nombre = AppComponent.appCore.pickedUsuario.nombre;
        this.viendoUsuario.apellido = AppComponent.appCore.pickedUsuario.apellido;
        this.viendoUsuario.email = AppComponent.appCore.pickedUsuario.email;

        this.viendoUsuario.conocimientos = AppComponent.appCore.pickedUsuario.conocimientos as String;

        this.viendoUsuario.listaConocimientos = [];
        let str = AppComponent.appCore.pickedUsuario.conocimientos.split(',') as string[];
        // console.log("Valor de STR = " + this.viendoUsuario.conocimientos);

        str.forEach(conId => {
          console.log("conId = " + conId);
          this.usuarioService.getCon(conId).subscribe(e=>{
            
            let valor = true;
            for(let i = 0; i < this.viendoUsuario.listaConocimientos.length; i++){
                // console.log("i = " + i + " --> " + this.viendoUsuario.listaConocimientos[i].nombre);
                if(this.viendoUsuario.listaConocimientos[i].id == conId) valor = false;
            }

            if(valor && e != null) {
              this.viendoUsuario.listaConocimientos.push(e);
              console.log("recibido para id " + conId + " --> valor de dato ");
            }
            
          });
        });

        this.formulario.setValue({
          nombre: this.viendoUsuario.nombre,
          apellido: this.viendoUsuario.apellido,
          email: this.viendoUsuario.email
        });
        
      }

      console.log("Porfolio es editable = " + this.editable);
      this.editable = true;

      let t;
      t = document.getElementById("minombre") as HTMLTextAreaElement; //t.readOnly = false;
      t.value = this.loggedUsuario.nombre;
      //this.loadedname = this.loggedUsuario.nombre;

      t = document.getElementById("miapellido") as HTMLTextAreaElement; t.readOnly = false;
      t.value = this.loggedUsuario.apellido;

      t = document.getElementById("miemail") as HTMLTextAreaElement; t.readOnly = false;
      t.value = this.loggedUsuario.email;

      t = document.getElementById("sobremitexto") as HTMLTextAreaElement; t.readOnly = false;

      
      //d.readOnly = false;
      //d.value = 'Some value';
      
    }
  }

  cargarConocimientos(){
    this.viendoUsuario.conocimientos = AppComponent.appCore.pickedUsuario.conocimientos as String;

    this.viendoUsuario.listaConocimientos = [];
    let str = AppComponent.appCore.pickedUsuario.conocimientos.split(',') as string[];

    str.forEach(conId => {
      console.log("conId = " + conId);
      this.usuarioService.getCon(conId).subscribe(e=>{
        
        let valor = true;
        for(let i = 0; i < this.viendoUsuario.listaConocimientos.length; i++){
            if(this.viendoUsuario.listaConocimientos[i].id == conId) valor = false;
        }

        if(valor && e != null) {
          this.viendoUsuario.listaConocimientos.push(e);
          console.log("recibido para id " + conId + " --> valor de dato ");
        }
        
      });
    });
  }

  onMouseClick(){
    if(AppComponent.appCore.loggedUsuario != null){
      let t = document.activeElement as HTMLInputElement;
      if(t != null) t.readOnly = false;
      // console.log("onMouseClick");
    }
  }

  /*
  onSaveChanges(){
    confirm("¿Quieres guardar los cambios?");
  }

  onKeyDown(event:any) {
    
    var codigo = event.which || event.keyCode;

    console.log("Presionada: " + codigo);
     
    if(codigo === 13){
      console.log("Tecla ENTER");
    }

    if(codigo >= 65 && codigo <= 90){
      console.log(String.fromCharCode(codigo));
    }
  }

  onMouseOut(){
    confirm("Guardar cambios");
  }
  */

  checklogin(){
    return this.miPorfolio || AppComponent.admin;
  }

  delcon(target : any){
    console.log("delcon");
    if(this.checklogin()) if(this.viendoUsuario != null) { 
        if(confirm("El conocimiento será borrado... no se puede deshacer\nSe recargará la página para actualizarla")){
          console.log("CONOCIMIENTO ELIMINADO");
          let s = target;
          
          console.log(" --> eliminato = " + s.getAttribute('id'));
          this.usuarioService.delcon(s.getAttribute('id')).subscribe(d =>{
              location.assign("../usuarios");
            });
        }
    }
  }

  deleteOrder(){
    console.log(AppComponent.appCore.getAdmin());
    if(AppComponent.appCore.getAdmin()) if(this.viendoUsuario != null){ 
        if(confirm("El usuario será borrado... no se puede deshacer")){
          console.log("USUARIO ELIMINADO");
          this.usuarioService.delete(this.viendoUsuario.id);
          location.assign("../usuarios");
        }
    }
  }

  ngOnInit(): void {
    console.clear();
    console.log("location.pathname = " + location.pathname);

    if(this.viendoUsuario != null) if(this.viendoUsuario.nombre == ''){
      this.viendoUsuario.nombre = "Testeo temporal";
      this.viendoUsuario.apellido = "Testeo apellido temporal";
      this.viendoUsuario.email = "Testeo email temporal";
      this.viendoUsuario.conocimientos = "";
    }

    if(AppComponent.appCore.loggedUsuario != null)
      console.log("AppComponent.appCore.loggedUsuario no es null");

    if(AppComponent.appCore.loggedUsuario == null){
      AppComponent.appCore.getUsers();
      
      AppComponent.appCore.login();

      AppComponent.appCore.checklogin();

      // if(location.pathname == "/my-usuario"){location.assign("../usuarios");}
    }

    
    if(AppComponent.appCore.loggedUsuario != null){
      console.log("AppComponent.appCore.loggedUsuario");
      console.log(AppComponent.appCore.loggedUsuario);
    }


      // Si se está cargando el porfolio personal del usuario registrado pasa esto...

      if(location.pathname != "/my-usuario"){

        if(AppComponent.appCore.loggedUsuario != null && AppComponent.appCore.pickedUsuario != null)
          this.miPorfolio = AppComponent.appCore.pickedUsuario.nombre == AppComponent.appCore.loggedUsuario.nombre;

        console.log("este es mi porfolio = " + this.miPorfolio);

        console.log("AppComponent.appCore.pickedUsuario ");
        console.log(AppComponent.appCore.pickedUsuario);
      }
      
      if(AppComponent.appCore.pickedUsuario != null) {
        this.viendoUsuario = AppComponent.appCore.pickedUsuario;
      
        this.viendoUsuario.nombre = AppComponent.appCore.pickedUsuario.nombre;
        this.viendoUsuario.apellido = AppComponent.appCore.pickedUsuario.apellido;
        this.viendoUsuario.email = AppComponent.appCore.pickedUsuario.email;
        this.viendoUsuario.conocimientos = AppComponent.appCore.pickedUsuario.conocimientos;

        if(this.miPorfolio == false) this.cargarConocimientos();

        this.formulario.setValue({
          nombre: this.viendoUsuario.nombre,
          apellido: this.viendoUsuario.apellido,
          email: this.viendoUsuario.email
        });

        let t;
        t = document.getElementById("minombre") as HTMLTextAreaElement;
        t.value = this.viendoUsuario.nombre;
        //this.loadedname = t.value;
        
        t = document.getElementById("miapellido") as HTMLTextAreaElement;
        t.value = this.viendoUsuario.apellido;

        t = document.getElementById("miemail") as HTMLTextAreaElement;
        t.value = this.viendoUsuario.email;
      }

    
      console.log("Porfolio es editable = " + this.editable);

  }


  edit(e: number){
    if(e == 0){
      console.log("TEXT 0");

      let c = {nombre: "Mi Conocimiento es:", descripcion: "Descripción básica del conocimiento o habilidad", nivel: "Básico", tiempo: "Menos de tres meses"};

      //AppComponent.appCore.loggedUsuario.conocimientos.push(c);
      //console.log(AppComponent.appCore.loggedUsuario);

      this.usuarioService.createconocimiento(c).subscribe(con =>{
        console.log("Se supone que se creo el conocimiento");
        console.log("AppComponent.appCore.datos_recuperados");
        console.log(AppComponent.appCore.datos_recuperados);

        let k = {id: Number, nombre: String, passcode: String};
        k.id = AppComponent.appCore.datos_recuperados.id;
        console.log(k.id);
        k.nombre = AppComponent.appCore.datos_recuperados.nombre;
        console.log(k.nombre);
        k.passcode = AppComponent.appCore.datos_recuperados.passcode;
        console.log(k.passcode);
        console.log(k);

        if(con == 201) // conocimiento creado...
          this.usuarioService.addconocimiento(k, c).subscribe(u =>{
            console.log("Usuario actualizado con su nuevo conocimiento");
            location.reload();
          });
        else if(con == 409){ // en caso de que no se haya creado, entonces existe y se asigna
          this.usuarioService.addconocimiento(k, c).subscribe(u =>{
            console.log("Conocimiento ya existe y será asignado al Usuario");
            location.reload();
          });
        }
      });

      // location.reload();
    }
  }

  save(){
    
  }

  ind = -1;

  getInd(){
    this.ind++;
    return this.ind;
  }
  
  saveChanges(){
    console.log("logged nombre = " + AppComponent.appCore.loggedUsuario.nombre);
    console.log("reg recuperado nombre = " + AppComponent.appCore.datos_recuperados.nombre);
    if(AppComponent.appCore.loggedUsuario.nombre==AppComponent.appCore.datos_recuperados.nombre){
      console.log("GUARDANDO CAMBIOS EN EL SERVIDOR...");

      //let updateLogin = false; // determina si se intentará guardar los cambios en la base de datos del Usuario y la contraseña...
      //let l = {nombre: "", passcode: ""}; // objeto contenedor que se transformara en un JSON para guardarlo
      let t;
      /*
      t = document.getElementById("minombre") as HTMLTextAreaElement;
      if(this.loadedname != t.value) {
        updateLogin = true;

        l.nombre = t.value;   l.passcode = AppComponent.appCore.loggedUsuario.passcode;
      }
      AppComponent.appCore.loggedUsuario.nombre = t.value;
      */

      t = document.getElementById("miapellido") as HTMLTextAreaElement;
      AppComponent.appCore.loggedUsuario.apellido = t.value;

      t = document.getElementById("miemail") as HTMLTextAreaElement;
      AppComponent.appCore.loggedUsuario.email = t.value;

      AppComponent.appCore.loggedUsuario.conocimientos = "";

      let i = 0;
      let ta = document.getElementsByName("ta") as NodeListOf<HTMLInputElement>;

      t = document.getElementsByName("cn") as NodeListOf<HTMLInputElement>;
      t.forEach(e => {
        //console.log("cn " +  e.id + " --> " + e.value);
        if(e.value != null) { 
          if(e.value != "") {
            this.viendoUsuario.listaConocimientos[i].nombre = e.value; 
            //this.viendoUsuario.listaConocimientos[e.id].nombre = e.value; 
            //this.viendoUsuario.listaConocimientos[e.id].descripcion = e.value; 
          }
        }
        this.viendoUsuario.listaConocimientos[i].descripcion = ta[i].value; 
        i++;
        
        if(AppComponent.appCore.loggedUsuario.conocimientos == "")AppComponent.appCore.loggedUsuario.conocimientos = e.id + "";
        else AppComponent.appCore.loggedUsuario.conocimientos = AppComponent.appCore.loggedUsuario.conocimientos + "," + e.id;
      });



      console.log("Lista de conocimientos para guardar: " + AppComponent.appCore.loggedUsuario.conocimientos);
      console.log("Estados de los conocimientos editados en la lista para guardar");
      console.log(this.viendoUsuario.listaConocimientos);

      // Envio de la información para guardar los datos de cada conocimiento
      for (let index = 0; index < this.viendoUsuario.listaConocimientos.length; index++) {
        this.usuarioService.addconocimiento(AppComponent.appCore.datos_locales, this.viendoUsuario.listaConocimientos[index]);
      }      

      //AppComponent.appCore.loggedUsuario.email = t.value;


      //console.log("AppComponent.appCore.loggedUsuario");
      //console.log(AppComponent.appCore.loggedUsuario);

      /*
      if(updateLogin){
        this.usuarioService.updatelogin(AppComponent.appCore.loggedUsuario.id, AppComponent.appCore.datos_recuperados, JSON.stringify(l)).subscribe(() => {
          console.log("Cambios de login guardados para " + AppComponent.appCore.loggedUsuario.nombre);

          this.usuarioService.update(AppComponent.appCore.loggedUsuario.id, AppComponent.appCore.loggedUsuario).subscribe(() => {
            console.log("Cambios guardados para " + AppComponent.appCore.loggedUsuario.nombre);

            AppComponent.appCore.loggedUsuario.nombre = l.nombre;       localStorage.setItem('usuario', l.nombre);
            AppComponent.appCore.loggedUsuario.passcode = l.passcode;   localStorage.setItem('passcode', l.passcode);

            updateLogin = false;

            location.reload();
          })
      })
      }else {
      */
        this.usuarioService.update(AppComponent.appCore.loggedUsuario.id, AppComponent.appCore.loggedUsuario).subscribe(() => {
          console.log("Cambios guardados para " + AppComponent.appCore.loggedUsuario.nombre);
        })
      //}

      
    }
  }


  checkislogin(){
    //console.log("Check: " + AppComponent.appCore.loggedUsuario);
    //console.log("Check login nombre: " + AppComponent.appCore.loggedUsuario.nombre);
    if(AppComponent.appCore.loggedUsuario==null)return false;
    if(AppComponent.appCore.loggedUsuario.nombre==null)return false;
    if(this.viendoUsuario==null)return false;
    if(this.viendoUsuario.nombre==null)return false; 

    if(this.viendoUsuario.nombre == AppComponent.appCore.loggedUsuario.nombre)return true;
    return false;
  }





}


/*
checklogin(){
  console.log("checking login states:");      

  console.log("locales: usuario: " + this.datos_locales.nombre + " - contraseña: " + this.datos_locales.passcode);
  if(this.datos_recuperados != null) {console.log("credenciales: usuario: " + this.datos_recuperados.nombre + " - contraseña: " + this.datos_recuperados.passcode);}
  else return false;

  let valid = true;

  if(this.datos_locales.nombre == this.datos_recuperados.nombre)console.log("nombre es igual...");else valid = false;
  if(this.datos_locales.passcode == this.datos_recuperados.passcode)console.log("contraseña es correcta es igual...");else valid = false;

  if(valid){
    for (let i = 0; i < this.usuarios.length; i++) {
      //if(this.usuarios[i].id == u.id)
      if(this.usuarios[i].nombre == this.datos_recuperados.nombre) {
        this.loggedUsuario = this.usuarios[i];
        console.log("comprobación de nombre correcta en el indice " + i + " --> nombre: " + this.usuarios[i].nombre);
      }
    }
  }

  return valid;
}


login(){
console.log("INTENTANDO HACER LOGIN COMO " + this.datos_locales.nombre);
if(this.datos_locales.nombre == null || this.datos_locales.nombre == '')return;

if(this.datos_locales.nombre == "admin" && this.datos_locales.passcode == "admin"){
  AppComponent.admin = true;    
  localStorage.setItem('admin', JSON.stringify(true));
  return;
}

this.usuarioService.checklogin(this.datos_locales.nombre, this.datos_locales.passcode).subscribe(data=>{
  this.datos_recuperados = data;
  
  if(this.checklogin()){
    console.log("Inicianco sesión como " + this.datos_recuperados.nombre);
  }
  else {
    console.log("ERROR al iniciar la sesión como " + this.datos_locales.nombre);
  }
})

}
*/