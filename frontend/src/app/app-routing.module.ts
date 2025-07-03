import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginClientComponent } from './login-client/login-client.component';
import { HomeComponent } from './home/home.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';
import { ListagemProdutosComponent } from './pages/listagem-produtos/listagem-produtos.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginClientComponent },
  { path: 'cadastro', component: CadastroUsuarioComponent },
  { path: 'cadastrar-produto', component: CadastrarProdutoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detalhe', component: DetalheProdutoComponent },
  { path: 'produtos/:termoBusca', component: ListagemProdutosComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
