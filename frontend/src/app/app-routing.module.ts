import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginClientComponent } from './login-client/login-client.component';
import { HomeComponent } from './home/home.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';
import { ListagemProdutoComponent } from './listagem-produto/listagem-produto.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { SeusPedidosComponent } from './seus-pedidos/seus-pedidos.component';
import { ListagemUsuarioComponent } from './listagem-usuario/listagem-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginClientComponent },
  { path: 'cadastro', component: CadastroUsuarioComponent },
  { path: 'cadastrar-produto', component: CadastrarProdutoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detalhe', component: DetalheProdutoComponent },
  { path: 'listagem-produto', component: ListagemProdutoComponent},
  { path: 'produto/:id', component: DetalheProdutoComponent},
  { path: 'minha-conta', component: MinhaContaComponent},
  { path: 'dados-pessoais', component: DadosPessoaisComponent},
  { path: 'seus-pedidos', component: SeusPedidosComponent},
  { path: 'listagem-usuario', component: ListagemUsuarioComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
