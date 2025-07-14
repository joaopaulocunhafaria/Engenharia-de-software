import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private carrinho: CarrinhoService, private userService:UserService, private router: Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');

 if (!this.userId) {
        // Se não houver ID de usuário, redireciona para o login ou home
        this.router.navigate(['/login']);
        return;
    }

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

comprar(): void {
    this.carrinho.finalizarCompra(this.userId).subscribe({
      next: () => {
        alert('Compra finalizada com sucesso! ✅');
        this.router.navigate(['/']);
      },
      // A correção está em (err: any)
      error: (err: any) => { 
        console.error('Falha ao finalizar a compra:', err);
        alert('Ocorreu um erro ao processar sua compra. Tente novamente. ❌');
      }
    });
  }
mais(item:any){}

remover(item:any): void {}
menos(item:any): void {}

calcularTotal(): number {
    return this.itens.reduce((soma, item) => soma + item.price * item.quantityInCart, 0);
  }
}
