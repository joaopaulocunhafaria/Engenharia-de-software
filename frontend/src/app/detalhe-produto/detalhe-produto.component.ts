import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productsMocks } from '../Domain/Mocks/Products.Mocks';
import { ProdutoService } from '../services/produtos/produto.service';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.scss']
})
export class DetalheProdutoComponent implements OnInit {
  product: any;
  productQuantity: number = 1;
  userRating: number = 0;
  userComment: string = '';
  maxStock: number = 20;

  constructor(private route: ActivatedRoute,
        private produtoService: ProdutoService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    
    //Chamar no back end para retornar os dados do produto, tem que criar o metodo getById.
    //Chamar na rota /products/:id no back end 
    //this.produtoService 
    
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
    console.log('Adicionado ao carrinho:', {
      productId: this.product.id,
      productQuantity: this.productQuantity
    });
  }

  buyNow(): void {
    console.log('Compra rápida do produto:', this.product.id);
  }
  
}