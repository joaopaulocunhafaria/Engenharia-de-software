import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // IMPORTANTE: Adicione esta propriedade products
  products: any[] = [
    { id: 1, name: 'nome_produto' },
    { id: 2, name: 'nome_produto' },
    { id: 3, name: 'nome_produto' },
    { id: 4, name: 'nome_produto' },
    { id: 5, name: 'nome_produto' },
    { id: 6, name: 'nome_produto' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Aqui você pode carregar os produtos de uma API
    // this.loadProducts();
  }

  // Método exemplo para carregar produtos
  loadProducts(): void {
    // Futuramente, você pode fazer uma chamada HTTP aqui
    // this.productService.getProducts().subscribe(products => {
    //   this.products = products;
    // });
  }
}