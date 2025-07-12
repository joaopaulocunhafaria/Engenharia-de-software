import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { productsMocks } from '../Domain/Mocks/Products.Mocks'; 

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
   


  listarTodos(): Observable<any[]> {
    return of(productsMocks).pipe(delay(300));
  }

  buscarPorTermo(termo: string): Observable<any[]> {
    const termoLower = termo.toLowerCase();
    const filtrados =  productsMocks;
    return of(filtrados).pipe(delay(300));
  }

  createMock(produto: any, imagem?: File): Observable<any> {
    return of({
      success: true,
      message: 'Produto cadastrado com sucesso!'
    }).pipe(delay(100));
  }
}
