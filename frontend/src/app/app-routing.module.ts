import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginClientComponent } from './login-client/login-client.component';
import { HomeComponent } from './home/home.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';
import { ListagemProdutoComponent } from './listagem-produto/listagem-produto.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { SeusPedidosComponent } from './seus-pedidos/seus-pedidos.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ListagemUsuarioComponent } from './listagem-usuario/listagem-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginClientComponent },
  { path: 'cadastro', component: CadastroUsuarioComponent },
  { path: 'produto/:id', component: DetalheProdutoComponent },
  { path: 'detalhe', component: DetalheProdutoComponent }, 
  { path: 'listagem-produto', component: ListagemProdutoComponent},
  { path: 'produto/:id', component: DetalheProdutoComponent},
  { path: 'minha-conta', component: MinhaContaComponent},
  { path: 'dados-pessoais', component: DadosPessoaisComponent},
  { path: 'seus-pedidos', component: SeusPedidosComponent},
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirecionamento padrão 

  // --- Rotas Protegidas ---
  { 
    path: 'minha-conta', 
    component: MinhaContaComponent,
    canActivate: [AuthGuard], // "Segurança" na porta
    data: { roles: ['ROLE_USER', 'ROLE_SELLER', 'ROLE_ADMIN'] } // Regra de acesso
  },
  {
    path: 'dados-pessoais',
    component: DadosPessoaisComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER', 'ROLE_SELLER', 'ROLE_ADMIN'] }
  },
  { 
    path: 'seus-pedidos', 
    component: SeusPedidosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  { 
    path: 'cadastrar-produto', 
    component: CadastrarProdutoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_SELLER', 'ROLE_ADMIN'] }
  },

  {
    path: 'listagem-produto',
    component: ListagemProdutoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_SELLER', 'ROLE_ADMIN'] }
  },
  {
    path: 'listagem-usuario',
    component: ListagemUsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
 
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
