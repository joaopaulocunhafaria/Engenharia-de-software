import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {

  usuario = {
    nome: 'nome_usuario',
    email: 'nome_usuario@email.com'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    // Implemente a lógica de logout aqui
    console.log('Usuário deslogado');
    this.router.navigate(['/login']);
  }

  
  navigateToListagemProduto() {
    this.router.navigate(['/listagem-produto']);
  }

  navigateToDadosPessoais(){
    this.router.navigate(['/dados-pessoais']);
  }

  navigateToSeusPedidos(){
    this.router.navigate(['/seus-pedidos']);
  }

  
}
