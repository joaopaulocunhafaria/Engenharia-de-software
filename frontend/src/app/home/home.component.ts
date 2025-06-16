import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Propriedades para o dropdown de categorias
  showCategories = false;
  selectedCategory = 'all';
  
  // Array de produtos
  products: any[] = [
    { id: 1, name: 'nome_produto', category: 'livros' },
    { id: 2, name: 'nome_produto', category: 'notebook' },
    { id: 3, name: 'nome_produto', category: 'cama-banho' },
    { id: 4, name: 'nome_produto', category: 'mobilia' },
    { id: 5, name: 'nome_produto', category: 'livros' },
    { id: 6, name: 'nome_produto', category: 'notebook' }
  ];

  // Lista de categorias disponíveis
  categories = [
    { id: 'all', name: 'Todas as categorias', icon: 'fa-th' },
    { id: 'livros', name: 'Livros', icon: 'fa-book' },
    { id: 'notebook', name: 'Notebook', icon: 'fa-laptop' },
    { id: 'cama-banho', name: 'Cama e banho', icon: 'fa-bed' },
    { id: 'mobilia', name: 'Mobília', icon: 'fa-couch' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Inicializar dados ou fazer chamadas API aqui
  }

  // Método para mostrar/esconder dropdown de categorias
  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }

  // Método para selecionar uma categoria
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

  // Método para navegação ao carrinho
  navigateToCart(): void {
    console.log('Navegando para o carrinho');
    // this.router.navigate(['/carrinho']);
  }

  // Método para busca de produtos
  searchProducts(searchTerm: string): void {
    console.log('Buscando por:', searchTerm);
  }

  // Método para carregar todos os produtos
  loadAllProducts(): void {
    console.log('Carregando todos os produtos');
  }

  // Método para filtrar produtos por categoria
  filterProductsByCategory(category: string): void {
    console.log('Filtrando produtos por categoria:', category);
  }

  // Método para visualizar detalhes do produto
  viewProductDetails(productId: number): void {
    console.log('Visualizando produto:', productId);
  }
}
