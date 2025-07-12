import { Component, OnInit } from '@angular/core';
import { CarrinhoService, CarrinhoItem } from '../services/carrinho.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  itens: CarrinhoItem[] = [];
  total = 0;

  endereco = {
    rua: 'Rua do Cliente, 1910 - Bairro do Cliente',
    cidade: 'Cidade do Cliente',
    destinatario: 'nome_usuario'
  };

  constructor(private carrinho: CarrinhoService) {}

  ngOnInit(): void {
  this.itens = [
    {
      id: 1,
      nome: 'Pão de Queijo (500g)',
      preco: 20.00,
      quantidade: 2,
      imagem: 'https://via.placeholder.com/80?text=Pão+de+Queijo'
    },
    {
      id: 2,
      nome: 'Café Especial (250g)',
      preco: 30.00,
      quantidade: 1,
      imagem: 'https://via.placeholder.com/80?text=Café'
    },
    {
      id: 3,
      nome: 'Doce de Leite (400g)',
      preco: 18.50,
      quantidade: 1,
      imagem: 'https://via.placeholder.com/80?text=Doce+de+Leite'
    }
  ];

  // Atualiza o total automaticamente
  this.total = this.itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
}


  mais(item: CarrinhoItem) {
    this.carrinho.updateQuantidade(item.id, 1);
  }

  menos(item: CarrinhoItem) {
    this.carrinho.updateQuantidade(item.id, -1);
  }

  remover(item: CarrinhoItem) {
    this.carrinho.removeItem(item.id);
  }

  comprar() {
    alert('Compra finalizada com sucesso!');
    this.carrinho.clear();
  }
}
