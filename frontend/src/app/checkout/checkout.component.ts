import { Component, OnInit } from '@angular/core';
import { CarrinhoService, CarrinhoItem } from '../services/carrinho.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  itens: CarrinhoItem[] = [];
  total = 0;
  userId:any;
  user:any;

  endereco = {
    rua: 'Rua do Cliente, 1910 - Bairro do Cliente',
    cidade: 'Cidade do Cliente',
    destinatario: 'nome_usuario'
  };

  constructor(private carrinho: CarrinhoService, private userService:UserService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');

    this.carrinho.getByUserId(this.userId).subscribe({
      next: (response:any) => {
        console.log('Itens do carrinho recebidos:', response); 
        this.itens = response;
        this.total = this.calcularTotal()
      },
      error: (error:any) => {
        console.error('Erro ao carregar itens do carrinho:', error);
        this.itens = [];
        this.total = 0;
      }
    });

   this.userService.getById(this.userId).subscribe({
      next: (response:any) => {
        this.user = response;
        console.log('Dados do usuário recebidos:', this.user);
      },
      error: (error:any) => { 
        console.error('Erro ao carregar dados do usuário:', error);
        this.user = null;  
      }
    });
  // Atualiza o total automaticamente
  this.total = this.itens.reduce((soma, item) => soma + item.price * item.quantity, 0);
}

comprar(): void {}

mais(item:any){}

remover(item:any): void {}
menos(item:any): void {}

calcularTotal(): number {
    return this.itens.reduce((soma, item) => soma + item.price * item.quantityInCart, 0);
  }
}
