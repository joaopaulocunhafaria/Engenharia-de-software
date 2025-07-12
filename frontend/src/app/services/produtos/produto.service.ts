import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { Produto } from '../../Domain/Models/Product.Model';
import { productApi } from 'src/app/Domain/HttpUrls/ProductUrl';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor() {}

  // Simula sucesso (como se o backend tivesse respondido bem)
  createMock(produto: Produto): Observable<any> {
    console.log('Simulando envio do produto:', produto);
    return of({
      success: true,
      message: 'Produto cadastrado com sucesso!',
      produto: produto
    }).pipe(delay(1000)); // simula 1 segundo de espera
  }

  createProduto(produto: Produto): Observable<any> {
    // ⚠ Aqui usamos o mock, já que não há API real
    return this.createMock(produto);
  }
}