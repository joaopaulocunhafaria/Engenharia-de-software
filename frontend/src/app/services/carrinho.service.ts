import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CarrinhoItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  quantityInCart: number;
  image?: any;
}



export interface Product {
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



@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  apiroute = 'http://localhost:8080/carrinho'; 

  constructor(private http: HttpClient) {} 
 
  getByUserId(userId: string) {
    console.log('Buscando itens do carrinho para o usuário:', userId);
    return this.http.get<CarrinhoItem[]>(`${this.apiroute}/user/${userId}`);
  }

  addItem(userId: string, itemId: String,quantity: number): any {
    console.log('Adicionando item ao carrinho:', itemId);

    const payload ={
      userId: userId,
      productId: itemId,
      quantity: quantity
    }
    return this.http.post<CarrinhoItem>(`${this.apiroute}`, payload );
  }
  finalizarCompra(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiroute}/clear/${userId}`);
  }
}
