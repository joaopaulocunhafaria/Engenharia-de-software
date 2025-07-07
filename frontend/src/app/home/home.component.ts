import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productsMocks } from '../Domain/Mocks/Products.Mocks';
import { categoriesMocks } from '../Domain/Mocks/Categories.Mocks';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showCategories = false;
  selectedCategory = 'all';

  products = productsMocks;

  categories = categoriesMocks;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }

  selectCategory(categoryId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.selectedCategory = categoryId;
    this.showCategories = false;

    console.log('Categoria selecionada:', categoryId);

    if (categoryId === 'all') {
      this.loadAllProducts();
    } else {
      this.filterProductsByCategory(categoryId);
    }
  }

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
    this.router.navigate(['/produto', productId]);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToMinhaConta() {
    this.router.navigate(['/minha-conta']);
  }

  navigateToMinhasVendas() {
    this.router.navigate(['/minhas-vendas']);
  }
}
