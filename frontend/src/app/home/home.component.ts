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
    { id: 1, name: 'O Senhor dos Anéis', category: 'livros', imagePath: 'assets/senhordosaneis.jpg', descricao: 'Uma obra épica de fantasia escrita por J.R.R. Tolkien.', preco: 49.90 },
    { id: 2, name: 'MacBook Pro', category: 'notebook', imagePath: 'assets/macbookpro.jpg', descricao: 'Notebook de alta performance da Apple.', preco: 12999.90 },
    { id: 3, name: 'Jogo de Lençóis', category: 'cama-banho', imagePath: 'assets/lencois.jpg', descricao: 'Conjunto de lençóis macios e confortáveis.', preco: 199.90 },
    { id: 4, name: 'Sofá Retrátil', category: 'mobilia', imagePath: 'assets/sofa.jpg', descricao: 'Sofá retrátil e reclinável para maior conforto.', preco: 2599.90 },
    { id: 5, name: 'Harry Potter', category: 'livros', imagePath: 'assets/harry.jpg', descricao: 'A famosa série de livros escrita por J.K. Rowling.', preco: 39.90 },
    { id: 6, name: 'Dell Inspiron', category: 'notebook', imagePath: 'assets/dell.jpg', descricao: 'Notebook versátil e potente da Dell.', preco: 4999.90 },

    { id: 1, name: 'O Senhor dos Anéis', category: 'livros', imagePath: 'assets/senhordosaneis.jpg', descricao: 'Uma obra épica de fantasia escrita por J.R.R. Tolkien.', preco: 49.90 },
    { id: 2, name: 'MacBook Pro', category: 'notebook', imagePath: 'assets/macbookpro.jpg', descricao: 'Notebook de alta performance da Apple.', preco: 12999.90 },
    { id: 3, name: 'Jogo de Lençóis', category: 'cama-banho', imagePath: 'assets/lencois.jpg', descricao: 'Conjunto de lençóis macios e confortáveis.', preco: 199.90 },
    { id: 4, name: 'Sofá Retrátil', category: 'mobilia', imagePath: 'assets/sofa.jpg', descricao: 'Sofá retrátil e reclinável para maior conforto.', preco: 2599.90 },
    { id: 5, name: 'Harry Potter', category: 'livros', imagePath: 'assets/harry.jpg', descricao: 'A famosa série de livros escrita por J.K. Rowling.', preco: 39.90 },
    { id: 6, name: 'Dell Inspiron', category: 'notebook', imagePath: 'assets/dell.jpg', descricao: 'Notebook versátil e potente da Dell.', preco: 4999.90 },

    { id: 1, name: 'O Senhor dos Anéis', category: 'livros', imagePath: 'assets/senhordosaneis.jpg', descricao: 'Uma obra épica de fantasia escrita por J.R.R. Tolkien.', preco: 49.90 },
    { id: 2, name: 'MacBook Pro', category: 'notebook', imagePath: 'assets/macbookpro.jpg', descricao: 'Notebook de alta performance da Apple.', preco: 12999.90 },
    { id: 3, name: 'Jogo de Lençóis', category: 'cama-banho', imagePath: 'assets/lencois.jpg', descricao: 'Conjunto de lençóis macios e confortáveis.', preco: 199.90 },
    { id: 4, name: 'Sofá Retrátil', category: 'mobilia', imagePath: 'assets/sofa.jpg', descricao: 'Sofá retrátil e reclinável para maior conforto.', preco: 2599.90 },
    { id: 5, name: 'Harry Potter', category: 'livros', imagePath: 'assets/harry.jpg', descricao: 'A famosa série de livros escrita por J.K. Rowling.', preco: 39.90 },
    { id: 6, name: 'Dell Inspiron', category: 'notebook', imagePath: 'assets/dell.jpg', descricao: 'Notebook versátil e potente da Dell.', preco: 4999.90 },

    { id: 1, name: 'O Senhor dos Anéis', category: 'livros', imagePath: 'assets/senhordosaneis.jpg', descricao: 'Uma obra épica de fantasia escrita por J.R.R. Tolkien.', preco: 49.90 },
    { id: 2, name: 'MacBook Pro', category: 'notebook', imagePath: 'assets/macbookpro.jpg', descricao: 'Notebook de alta performance da Apple.', preco: 12999.90 },
    { id: 3, name: 'Jogo de Lençóis', category: 'cama-banho', imagePath: 'assets/lencois.jpg', descricao: 'Conjunto de lençóis macios e confortáveis.', preco: 199.90 },
    { id: 4, name: 'Sofá Retrátil', category: 'mobilia', imagePath: 'assets/sofa.jpg', descricao: 'Sofá retrátil e reclinável para maior conforto.', preco: 2599.90 },
    { id: 5, name: 'Harry Potter', category: 'livros', imagePath: 'assets/harry.jpg', descricao: 'A famosa série de livros escrita por J.K. Rowling.', preco: 39.90 },
    { id: 6, name: 'Dell Inspiron', category: 'notebook', imagePath: 'assets/dell.jpg', descricao: 'Notebook versátil e potente da Dell.', preco: 4999.90 },

    { id: 1, name: 'O Senhor dos Anéis', category: 'livros', imagePath: 'assets/senhordosaneis.jpg', descricao: 'Uma obra épica de fantasia escrita por J.R.R. Tolkien.', preco: 49.90 },
    { id: 2, name: 'MacBook Pro', category: 'notebook', imagePath: 'assets/macbookpro.jpg', descricao: 'Notebook de alta performance da Apple.', preco: 12999.90 },
    { id: 3, name: 'Jogo de Lençóis', category: 'cama-banho', imagePath: 'assets/lencois.jpg', descricao: 'Conjunto de lençóis macios e confortáveis.', preco: 199.90 },
    { id: 4, name: 'Sofá Retrátil', category: 'mobilia', imagePath: 'assets/sofa.jpg', descricao: 'Sofá retrátil e reclinável para maior conforto.', preco: 2599.90 },
    { id: 5, name: 'Harry Potter', category: 'livros', imagePath: 'assets/harry.jpg', descricao: 'A famosa série de livros escrita por J.K. Rowling.', preco: 39.90 },
    { id: 6, name: 'Dell Inspiron', category: 'notebook', imagePath: 'assets/dell.jpg', descricao: 'Notebook versátil e potente da Dell.', preco: 4999.90 },

    { id: 1, name: 'O Senhor dos Anéis', category: 'livros', imagePath: 'assets/senhordosaneis.jpg', descricao: 'Uma obra épica de fantasia escrita por J.R.R. Tolkien.', preco: 49.90 },
    { id: 2, name: 'MacBook Pro', category: 'notebook', imagePath: 'assets/macbookpro.jpg', descricao: 'Notebook de alta performance da Apple.', preco: 12999.90 },
    { id: 3, name: 'Jogo de Lençóis', category: 'cama-banho', imagePath: 'assets/lencois.jpg', descricao: 'Conjunto de lençóis macios e confortáveis.', preco: 199.90 },
    { id: 4, name: 'Sofá Retrátil', category: 'mobilia', imagePath: 'assets/sofa.jpg', descricao: 'Sofá retrátil e reclinável para maior conforto.', preco: 2599.90 },
    { id: 5, name: 'Harry Potter', category: 'livros', imagePath: 'assets/harry.jpg', descricao: 'A famosa série de livros escrita por J.K. Rowling.', preco: 39.90 },
    { id: 6, name: 'Dell Inspiron', category: 'notebook', imagePath: 'assets/dell.jpg', descricao: 'Notebook versátil e potente da Dell.', preco: 4999.90 },

    { id: 1, name: 'O Senhor dos Anéis', category: 'livros', imagePath: 'assets/senhordosaneis.jpg', descricao: 'Uma obra épica de fantasia escrita por J.R.R. Tolkien.', preco: 49.90 },
    { id: 2, name: 'MacBook Pro', category: 'notebook', imagePath: 'assets/macbookpro.jpg', descricao: 'Notebook de alta performance da Apple.', preco: 12999.90 },
    { id: 3, name: 'Jogo de Lençóis', category: 'cama-banho', imagePath: 'assets/lencois.jpg', descricao: 'Conjunto de lençóis macios e confortáveis.', preco: 199.90 },
    { id: 4, name: 'Sofá Retrátil', category: 'mobilia', imagePath: 'assets/sofa.jpg', descricao: 'Sofá retrátil e reclinável para maior conforto.', preco: 2599.90 },
    { id: 5, name: 'Harry Potter', category: 'livros', imagePath: 'assets/harry.jpg', descricao: 'A famosa série de livros escrita por J.K. Rowling.', preco: 39.90 },
    { id: 6, name: 'Dell Inspiron', category: 'notebook', imagePath: 'assets/dell.jpg', descricao: 'Notebook versátil e potente da Dell.', preco: 4999.90 },

    { id: 1, name: 'O Senhor dos Anéis', category: 'livros', imagePath: 'assets/senhordosaneis.jpg', descricao: 'Uma obra épica de fantasia escrita por J.R.R. Tolkien.', preco: 49.90 },
    { id: 2, name: 'MacBook Pro', category: 'notebook', imagePath: 'assets/macbookpro.jpg', descricao: 'Notebook de alta performance da Apple.', preco: 12999.90 },
    { id: 3, name: 'Jogo de Lençóis', category: 'cama-banho', imagePath: 'assets/lencois.jpg', descricao: 'Conjunto de lençóis macios e confortáveis.', preco: 199.90 },
    { id: 4, name: 'Sofá Retrátil', category: 'mobilia', imagePath: 'assets/sofa.jpg', descricao: 'Sofá retrátil e reclinável para maior conforto.', preco: 2599.90 },
    { id: 5, name: 'Harry Potter', category: 'livros', imagePath: 'assets/harry.jpg', descricao: 'A famosa série de livros escrita por J.K. Rowling.', preco: 39.90 },
    { id: 6, name: 'Dell Inspiron', category: 'notebook', imagePath: 'assets/dell.jpg', descricao: 'Notebook versátil e potente da Dell.', preco: 4999.90 },

    { id: 1, name: 'O Senhor dos Anéis', category: 'livros', imagePath: 'assets/senhordosaneis.jpg', descricao: 'Uma obra épica de fantasia escrita por J.R.R. Tolkien.', preco: 49.90 },
    { id: 2, name: 'MacBook Pro', category: 'notebook', imagePath: 'assets/macbookpro.jpg', descricao: 'Notebook de alta performance da Apple.', preco: 12999.90 },
    { id: 3, name: 'Jogo de Lençóis', category: 'cama-banho', imagePath: 'assets/lencois.jpg', descricao: 'Conjunto de lençóis macios e confortáveis.', preco: 199.90 },
    { id: 4, name: 'Sofá Retrátil', category: 'mobilia', imagePath: 'assets/sofa.jpg', descricao: 'Sofá retrátil e reclinável para maior conforto.', preco: 2599.90 },
    { id: 5, name: 'Harry Potter', category: 'livros', imagePath: 'assets/harry.jpg', descricao: 'A famosa série de livros escrita por J.K. Rowling.', preco: 39.90 },
    { id: 6, name: 'Dell Inspiron', category: 'notebook', imagePath: 'assets/dell.jpg', descricao: 'Notebook versátil e potente da Dell.', preco: 4999.90 },
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
