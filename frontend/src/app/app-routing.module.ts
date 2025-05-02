import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginClientComponent } from './login-client/login-client.component';
import { HomeComponent } from './home/home.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component: LoginClientComponent},
  {path:"cadastro", component: CadastroUsuarioComponent},
  {path:"home", component: HomeComponent},
  {path:"**", redirectTo:""},
  {path:"home", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
