// app-routing.module.ts (CORRIGIDO E PROTEGIDO)

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 1. IMPORTE O GUARD
import { AuthGuard } from './auth.guard';

// Importe seus componentes
import { LoginClientComponent } from './login-client/login-client.component';
import { HomeComponent } from './home/home.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';
import { ListagemProdutoComponent } from './listagem-produto/listagem-produto.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { SeusPedidosComponent } from './seus-pedidos/seus-pedidos.component';
<<<<<<< HEAD
import { CheckoutComponent } from './checkout/checkout.component';
=======
import { ListagemUsuarioComponent } from './listagem-usuario/listagem-usuario.component';
>>>>>>> 2b4ec39637e9d243546012f64ed9e0c0e24a44de

const routes: Routes = [
  // --- Rotas Públicas ---
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginClientComponent },
  { path: 'cadastro', component: CadastroUsuarioComponent },
  { path: 'produto/:id', component: DetalheProdutoComponent },
  { path: 'detalhe', component: DetalheProdutoComponent },
<<<<<<< HEAD
  { path: 'listagem-produto', component: ListagemProdutoComponent},
  { path: 'produto/:id', component: DetalheProdutoComponent},
  { path: 'minha-conta', component: MinhaContaComponent},
  { path: 'dados-pessoais', component: DadosPessoaisComponent},
  { path: 'seus-pedidos', component: SeusPedidosComponent},
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirecionamento padrão
=======

  // --- Rotas Protegidas ---
  { 
    path: 'minha-conta', 
    component: MinhaContaComponent,
    canActivate: [AuthGuard], // "Segurança" na porta
    data: { roles: ['CLIENTE', 'VENDEDOR', 'ADMIN'] } // Regra de acesso
  },
  { 
    path: 'dados-pessoais', 
    component: DadosPessoaisComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CLIENTE', 'VENDEDOR', 'ADMIN'] }
  },
  { 
    path: 'seus-pedidos', 
    component: SeusPedidosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CLIENTE'] }
  },
  { 
    path: 'cadastrar-produto', 
    component: CadastrarProdutoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['VENDEDOR', 'ADMIN'] }
  },
  { 
    path: 'listagem-produto', 
    component: ListagemProdutoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['VENDEDOR', 'ADMIN'] }
  },
  { 
    path: 'listagem-usuario', 
    component: ListagemUsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },

  // Rota de fallback sempre por último
>>>>>>> 2b4ec39637e9d243546012f64ed9e0c0e24a44de
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}