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
  sidebarOpen = false; // Nova propriedade para controlar a sidebar

  products = productsMocks;
  categories = categoriesMocks;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  // Métodos existentes
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
      this.router.navigate(['/produtos/' + searchTerm]);
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

  // Novos métodos para a sidebar
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  navigateToSection(section: string, event: Event): void {
    event.preventDefault();
    
    console.log('Navegando para seção:', section);
    
    // Fechar sidebar após navegar
    this.closeSidebar();
    
    // Implementar navegação baseada na seção
    switch (section) {
      case 'home':
        this.router.navigate(['/home']);
        break;
      case 'categories':
        console.log('Navegando para categorias');
        // this.router.navigate(['/categories']);
        break;
      case 'offers':
        console.log('Navegando para ofertas');
        // this.router.navigate(['/offers']);
        break;
      case 'favorites':
        console.log('Navegando para favoritos');
        // this.router.navigate(['/favorites']);
        break;
      case 'orders':
        console.log('Navegando para pedidos');
        // this.router.navigate(['/orders']);
        break;
      case 'profile':
        console.log('Navegando para perfil');
        // this.router.navigate(['/profile']);
        break;
      case 'settings':
        console.log('Navegando para configurações');
        // this.router.navigate(['/settings']);
        break;
      case 'help':
        console.log('Navegando para ajuda');
        // this.router.navigate(['/help']);
        break;
      default:
        console.log('Seção não encontrada:', section);
    }
  }

  logout(event: Event): void {
    event.preventDefault();
    
    console.log('Fazendo logout...');
    
    // Implementar lógica de logout
    // Limpar dados do usuário, tokens, etc.
    
    // Fechar sidebar
    this.closeSidebar();
    
    // Navegar para login
    this.router.navigate(['/login']);
  }
}
