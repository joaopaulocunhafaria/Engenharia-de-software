import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { productsMocks } from '../Domain/Mocks/Products.Mocks'; 

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  
  products = productsMocks;


  listarTodos(): Observable<any[]> {
    return of(this.products);
  }

  buscarPorTermo(termo: string): Observable<any[]> {
    const termoLower = termo.toLowerCase();
    const filtrados = this.products.filter(p =>
      p.title.toLowerCase().includes(termoLower) ||
      p.description.toLowerCase().includes(termoLower)
    );
    return of(filtrados).pipe(delay(300));
  }

  createMock(produto: any, imagem?: File): Observable<any> {
    return of({
      success: true,
      message: 'Produto cadastrado com sucesso!'
    }).pipe(delay(100));
  }
}
