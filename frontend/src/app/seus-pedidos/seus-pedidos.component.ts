import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Pedido {
  id: number;
  nomeProduto: string;
  preco: number;
  quantidade: number;
  status: string;
}

@Component({
  selector: 'app-seus-pedidos',
  templateUrl: './seus-pedidos.component.html',
  styleUrls: ['./seus-pedidos.component.scss']
})
export class SeusPedidosComponent implements OnInit {
  pedidos: Pedido[] = [
    { id: 1, nomeProduto: 'Produto 1', preco: 20.00, quantidade: 1, status: 'Entregue' },
    { id: 2, nomeProduto: 'Produto 2', preco: 40.00, quantidade: 2, status: 'A caminho' },
    // Adicione mais pedidos mockados se desejar
    { id: 3, nomeProduto: 'Produto 3', preco: 15.50, quantidade: 3, status: 'Pendente' },
    { id: 4, nomeProduto: 'Produto 4', preco: 80.00, quantidade: 1, status: 'Cancelado' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/produto', productId]);
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(/\s/g, '-');
  }

}
