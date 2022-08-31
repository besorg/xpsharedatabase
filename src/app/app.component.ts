import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from './usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'XP Share Database';

  usuarios: any[] = [];

  public static loginAs: any = null;
  public static admin: boolean = false;

  public pickedUsuario: any;
  public loggedUsuario: any;
  
  situacion = "usuarios";

  formulario: FormGroup = this.fb.group({
    nombre: [],
    apellido: [],
    email: [],
    passcode: []
  });
  
  formularioLogin: FormGroup = this.fb.group({
    nombre: [],
    passcode: []
  });


  // Datos para la comprobación del login
  datos_recuperados: any = ({
    nombre: [],
    passcode: []
  });
  
  datos_locales: any = ({
    nombre: [],
    passcode: []
  });


  public static appCore: AppComponent;


  ngOnInit(){
    this.datos_locales.nombre = localStorage.getItem('usuario')==null||localStorage.getItem('usuario')==''?"":localStorage.getItem('usuario')?.split('"')[1]; 
    this.datos_locales.passcode = localStorage.getItem('passcode')==null||localStorage.getItem('passcode')==''?"":localStorage.getItem('passcode')?.split('"')[1]; 

    this.getUsers();

    this.login();

    this.checklogin();
  }

  getUsers(){
    this.usuarioService.getAll().subscribe((usuarios: any) => {
        console.log('usuarios', usuarios);
        this.usuarios = usuarios;
      })
  }

  constructor(private fb: FormBuilder, public usuarioService: UsuarioService){
    AppComponent.appCore = this;
    this.pickedUsuario = [];
    this.pickedUsuario.nombre = "";
    this.pickedUsuario.apellido = "";
    this.pickedUsuario.email = "";

    usuarioService.getAll();
  }

  getAdmin(){
    if(localStorage.getItem('admin') == 'true')AppComponent.admin = true; else AppComponent.admin=false;
    
    if(localStorage.getItem('usuario') != null && localStorage.getItem('usuario') != '')AppComponent.loginAs = localStorage.getItem('usuario'); else AppComponent.loginAs="";
    
    return AppComponent.admin;
  }

  public static unadmin(){
    console.log("unadmin");
    AppComponent.admin=false;

    localStorage.setItem('admin', "false");

    location.assign("../usuarios");
  }

  setformstate(){
    this.formulario.setValue({
      nombre: this.pickedUsuario.nombre,
      apellido: this.pickedUsuario.apellido,
      email: this.pickedUsuario.email
    });

    //this.usuarioService.createuser(this.formulario.value);
  }

  cerrarsesion(){
    alert("cerrar sesion.");
    localStorage.setItem('usuario', "");
  }

  checklogin(){
      //this.datos_locales.nombre = localStorage.getItem('usuario')==null||localStorage.getItem('usuario')==''?"":localStorage.getItem('usuario')?.split('"')[1]; 
      //this.datos_locales.passcode = localStorage.getItem('passcode')==null||localStorage.getItem('passcode')==''?"":localStorage.getItem('passcode')?.split('"')[1]; 
  
      console.log("checking login states...");      
  
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
    let k = document.getElementById("my-usuario") as HTMLElement;
    k.toggleAttribute("href", false);

    console.log("INTENTANDO HACER LOGIN COMO " + this.datos_locales.nombre);
    if(this.datos_locales.nombre == null || this.datos_locales.nombre == '')return;

    if(this.datos_locales.nombre == "admin" && this.datos_locales.passcode == "admin"){
      AppComponent.admin = true;
      
      localStorage.setItem('admin', JSON.stringify(true));
      
      //location.assign("../usuarios");

      return;
    }
    
    this.usuarioService.checklogin(this.datos_locales.nombre, this.datos_locales.passcode).subscribe(data=>{
      this.datos_recuperados = data;
      
      if(this.checklogin()){
        console.log("Inicianco sesión como " + this.datos_recuperados.nombre);
        
        k = document.getElementById("my-usuario") as HTMLElement;
        k.toggleAttribute("href", true);
        k.setAttribute("href", "/my-usuario");
      }
      else {
        console.log("ERROR al iniciar la sesión como " + this.datos_locales.nombre);
      }
    })

  }
}

