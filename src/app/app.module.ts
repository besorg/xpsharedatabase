import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConocimientoComponent } from './conocimiento/conocimiento.component';
import { BloqueSeparacionComponent } from './bloque-separacion/bloque-separacion.component';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { AcercaUsComponent } from './acerca-us/acerca-us.component';
import { PieDePaginaComponent } from './pie-de-pagina/pie-de-pagina.component';
import { CabeceraPaginaComponent } from './cabecera-pagina/cabecera-pagina.component';
import { UrlNotFoundComponent } from './url-not-found/url-not-found.component';
import { FormularioLoginComponent } from './formulario-login/formulario-login.component';
import { PanelLateralComponent } from './panel-lateral/panel-lateral.component';
import { BarraDeNavegacionComponent } from './barra-de-navegacion/barra-de-navegacion.component';
import { BsoLandingPageStructureComponent } from './bso-landing-page-structure/bso-landing-page-structure.component';
import { InfoComponent } from './info/info.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { FormularioRegistroComponent } from './formulario-registro/formulario-registro.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    ConocimientoComponent,
    BloqueSeparacionComponent,
    TablaUsuariosComponent,
    FormularioUsuarioComponent,
    GaleriaComponent,
    AcercaUsComponent,
    PieDePaginaComponent,
    CabeceraPaginaComponent,
    UrlNotFoundComponent,
    FormularioLoginComponent,
    PanelLateralComponent,
    BarraDeNavegacionComponent,
    BsoLandingPageStructureComponent,
    InfoComponent,
    ContactoComponent,
    HomeComponent,
    FormularioRegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
