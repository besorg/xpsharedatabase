
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaComponent } from './galeria/galeria.component';
import { BsoLandingPageStructureComponent } from './bso-landing-page-structure/bso-landing-page-structure.component';
import { InfoComponent } from './info/info.component';
import { UrlNotFoundComponent } from './url-not-found/url-not-found.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { HomeComponent } from './home/home.component';
import { FormularioLoginComponent } from './formulario-login/formulario-login.component';
import { FormularioRegistroComponent } from './formulario-registro/formulario-registro.component';

const routes: Routes = [
  {path:'nuevo',component:GaleriaComponent},
  {path:'login',component:FormularioLoginComponent},
  {path:'registrar',component:FormularioRegistroComponent},
  {path:'usuario',component:FormularioUsuarioComponent},
  {path:'usuarios',component:UsuariosComponent},
  {path:'my-usuario',component:FormularioUsuarioComponent},
  {path:'info',component:InfoComponent},
  {path:'bso',component:BsoLandingPageStructureComponent},
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'**',component:UrlNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
