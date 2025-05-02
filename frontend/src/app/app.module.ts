import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import {  HttpClientModule } from '@angular/common/http';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginClientComponent,
    LayoutComponent,
    HomeComponent,
    CadastroUsuarioComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
