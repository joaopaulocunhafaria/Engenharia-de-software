import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productsMocks } from '../Domain/Mocks/Products.Mocks';
import { ProdutoService } from '../services/produtos/produto.service';
import { UserService } from '../services/user/user.service';
import { CarrinhoService } from '../services/carrinho.service';


  interface Seller{
    id: String;
    name: string;
    email: string;
    phone: string;
    endereco: string;
  }

interface Product {
  id: string;
  title: string;
  description: string;
  imageName: string;
  image: any; 
  category: string;
  ownerId: string;
  price: number;
  quantity: number;
}
@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.scss']
})
export class DetalheProdutoComponent implements OnInit {
  product: Product | null = null;
  seller: Seller | null = null;
  user:Seller | null = null;
  productQuantity: number = 1;
  userRating: number = 0;
  userComment: string = '';
  maxStock: number = 20;

  

  constructor(private route: ActivatedRoute,
        private produtoService: ProdutoService,
      private userService: UserService,
    private carrinhoService:CarrinhoService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    
    this.produtoService.getById(productId).subscribe({
      next: (response) => {
        console.log('Detalhes do produto recebidos:', response);
        this.product = response;
        this.maxStock = this.product?.quantity ?? 0;  
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes do produto:', error);
        this.product = null;  
      }
    });

    this.userService.getById(this.product?.ownerId||"").subscribe({
      next: (response) => {
        this.seller = response;
        console.log('Detalhes do vendedor recebidos:', response);
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes do vendedor:', error);
      }
    });

    const userId = localStorage.getItem('id');

    if (userId) {
      this.userService.getById(userId).subscribe({
        next: (response) => {
          this.user = response;
          console.log('Detalhes do usuário recebidos:', response);
        },
        error: (error) => {
          console.error('Erro ao carregar detalhes do usuário:', error);
        }
      });
    }

  }

  increaseQuantity(): void {
    if (this.productQuantity < this.maxStock) { // Verifica se não excede o estoque máximo
      this.productQuantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.productQuantity > 1) { // Garante que a quantidade não seja menor que 1
      this.productQuantity--;
    }
  }

  setRating(rating: number): void {
    this.userRating = rating;
  }

  submitReview(): void {
    if (this.userRating > 0 && this.userComment.trim()) {
      // Lógica para enviar a avaliação
      console.log('Avaliação enviada:', {
        rating: this.userRating,
        comment: this.userComment
      });
      this.userRating = 0;
      this.userComment = '';
    }
  }

  addToCart(): void {
    const userId: string = this.user?.id ? String(this.user.id) : "";
    const productId: string = this.product?.id ? String(this.product.id) : "";
    console.log('Adicionando produto ao carrinho:', productId, 'para o usuário:', userId);
    console.log('Quantidade do produto:', this.productQuantity);
    this.carrinhoService.addItem(userId, productId, this.productQuantity).subscribe({
      next: () => {
        console.log('Produto adicionado ao carrinho:');
        alert('Produto adicionado ao carrinho com sucesso!');

      },
      error: () => { 
        console.error('Erro ao adicionar produto ao carrinho:');
        alert('Erro ao adicionar produto ao carrinho. Tente novamente mais tarde.');
      }
    });

  }

  buyNow(): void {
    console.log('Compra rápida do produto:', this.product?.id);
  }
  
}