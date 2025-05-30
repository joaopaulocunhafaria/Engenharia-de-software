import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  createMock(produto: any, imagem?: File): Observable<any> {
    // Aqui você pode simular sucesso ou erro, com um pequeno delay para parecer real
    return of({
      success: true,
      message: 'Produto cadastrado com sucesso!'
    }).pipe(delay(100)); // simula 1s de atraso da API
  }
}