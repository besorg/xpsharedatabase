import { JsonPipe } from '@angular/common';
import { HttpClient, HttpClientJsonpModule, HttpClientModule, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  
  getCon(id: string){
    return this.http.get('http://localhost:8080/getcon/' + id);
  }

  getAll(){
    return this.http.get('http://localhost:8080/getusers');
  }

  createuser(usuario:any){
    return this.http.post('http://localhost:8080/new/', usuario);
  }

  createlogin(login:any){
    return this.http.post('http://localhost:8080/newlogin/', login);
  }

  createconocimiento(con:any){
    return this.http.post('http://localhost:8080/newconocimiento', con);
  }

  addconocimiento(login:any, con:any){
    return this.http.put('http://localhost:8080/addcon/' + con.nombre + "/" +  con.descripcion + "/" + con.nivel + "/" + con.tiempo, login);
  }
  
  update(id:number, usuario:any){
    console.log(" - usuario - ");
    return this.http.put('http://localhost:8080/' + id, usuario);
  }

  updatelogin(id:number, login: any, newlogin: any){
    console.log(" - login - ");
    return this.http.put('http://localhost:8080/l/' + id, login, newlogin);
  }

  delete(id:number){
    return this.http.delete('http://localhost:8080/del/' + id);
  }

  delcon(id:number){
    return this.http.delete('http://localhost:8080/delcon/' + id);
  }

  checklogin(usuario:string, passcode:string){
    return this.http.get("http://localhost:8080/login/"+ usuario + "/" + passcode);
  }
  
  /*
  login(usuario:string, passcode:string){
    
    console.log(this.http.get("http://localhost:8080/login/"+ usuario + "/" + passcode));

    localStorage.setItem('usuario', usuario);
    localStorage.setItem('passcode', passcode);
    return this.http.get("http://localhost:8080/login/"+ usuario + "/" + passcode);

    let f:any = [];
    f.push("usuario", usuario);
    f.push("passcode", passcode);

    let j:any = 
    console.log(j);

  }
  */
}
