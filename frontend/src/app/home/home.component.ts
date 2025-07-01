import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  termo: string = '';

  constructor(private router: Router) {}

  buscar(): void {
    if (this.termo.trim()) {
      this.router.navigate(['/produtos', this.termo.trim()]);
    }
  }
<<<<<<< Updated upstream
=======

  navigateToCart(): void {
    console.log('Navegando para o carrinho');
  }

  searchProducts(searchTerm: string): void {
    if (searchTerm) {
      console.log('Buscando produtos por termo:', searchTerm);
      this.router.navigate(['/produtos/'+searchTerm]);
    }
  }

  loadAllProducts(): void {
    console.log('Carregando todos os produtos');
  }

  filterProductsByCategory(category: string): void {
    console.log('Filtrando produtos por categoria:', category);
  }

  viewProductDetails(productId: number): void {
    console.log('Visualizando produto:', productId);
  }

  navigateToProductDetails(productId: number){
    this.router.navigate(['/detalhe-produto', productId]);
  }
>>>>>>> Stashed changes
}
