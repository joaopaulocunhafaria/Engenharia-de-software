import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categoriesMocks } from '../Domain/Mocks/Categories.Mocks';
import { ProdutoService } from '../services/produtos/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showCategories = false;
  selectedCategory = 'all';
  sidebarOpen = false;

  products: any = [];
  filteredProducts: any = [];
  categories = categoriesMocks;

  // --- PROPRIEDADES DE AUTENTICAÇÃO ---

  isLoggedIn: boolean = false;
  userName: string = '';
  userRole: string = '';

  constructor(private router: Router, private produtoService: ProdutoService) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');

    if (userString) {
      const user = JSON.parse(userString);
      this.isLoggedIn = true;
      this.userName = user.nome;
      this.userRole = user.role;
    } else {
      this.isLoggedIn = false;
      this.userName = '';
      this.userRole = 'VISITANTE';
    }

    this.produtoService.listarTodos().subscribe({
      next: (response) => {
        this.products = response;
        this.filteredProducts = response;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
      },
    });
  }

  logout(event: Event): void {
    event.preventDefault();
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.userName = '';
    this.userRole = 'VISITANTE';
    this.closeSidebar();
    this.router.navigate(['/login']);
  }

  // --- MÉTODOS DE NAVEGAÇÃO ---

  navigateTo(rota: string, event: Event): void {
    event.preventDefault();
    this.router.navigate([rota]);
    this.closeSidebar();
  }

  navigateToMinhaConta() {
    this.router.navigate(['/minha-conta']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/cadastro']);
  }

  navigateToCart(): void {
    console.log('Navegando para o carrinho');
    this.router.navigate(['/carrinho']);
  }

  // --- MÉTODOS ORIGINAIS ---
  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }

  selectCategory(categoryId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedCategory = categoryId;

    this.filteredProducts = this.products.filter((product: any) => {
      const matchesCategory =
        categoryId === 'all' || product.category === categoryId;
      return matchesCategory;
    });

    if (this.filteredProducts.length === 0) {
      this.filteredProducts = this.products;
    }

    this.showCategories = false;
  }

  searchProducts(searchTerm: string): void {
    const term = searchTerm.toLowerCase().trim();

    this.filteredProducts = this.products.filter((product: any) => {
      const matchesTerm = product.title?.toLowerCase().includes(term);
      const matchesCategory =
        this.selectedCategory === 'all' ||
        product.category === this.selectedCategory;

      return matchesTerm && matchesCategory;
    });
  
  
      if (this.filteredProducts.length === 0) {
        this.filteredProducts = this.products;
      }
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/produto', productId]);
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  navigateToSection(section: string, event: Event): void {
    event.preventDefault();
    console.log('Navegando para seção:', section);
    this.closeSidebar();
  }
}
