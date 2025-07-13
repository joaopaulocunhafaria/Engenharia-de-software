import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoriesMocks } from 'src/app/Domain/Mocks/Categories.Mocks';
import { productsMocks } from 'src/app/Domain/Mocks/Products.Mocks'; 

@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.scss']
})
export class ListagemProdutosComponent implements OnInit {
  termoBusca: string = '';
  produtos: any[] = [];
  carregando = true;
   showCategories = false;
    selectedCategory = 'all';
  
    products = productsMocks;
  
    categories = categoriesMocks;
  
  
  

  constructor(
    private router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.termoBusca = params['termoBusca'] || '';
      this.buscarProdutos();
    });
  }

  buscarProdutos(): void {
    
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
    if (searchTerm) {
       this.router.navigate(['/produtos/'+searchTerm]);
    }
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
