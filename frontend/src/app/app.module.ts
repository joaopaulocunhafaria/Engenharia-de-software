import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';
import { ListagemProdutosComponent } from './pages/listagem-produtos/listagem-produtos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { HeaderComponent } from './components/header/header.component';
import { ListagemProdutoComponent } from './listagem-produto/listagem-produto.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { SeusPedidosComponent } from './seus-pedidos/seus-pedidos.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ListagemUsuarioComponent } from './listagem-usuario/listagem-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginClientComponent,
    LayoutComponent,
    HomeComponent,
    CadastroUsuarioComponent,
    CadastrarProdutoComponent,
    ListagemProdutosComponent,
    NavbarComponent,
    DetalheProdutoComponent,
    HeaderComponent,
    ListagemProdutoComponent,
    MinhaContaComponent,
    DadosPessoaisComponent,
    SeusPedidosComponent,
    CheckoutComponent,
    ListagemUsuarioComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
