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

  private handleErrorlogin(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }


  constructor(private http: HttpClient) { }

  createMock(produto: any, imagem?: File): Observable<any> {
    // Aqui você pode simular sucesso ou erro, com um pequeno delay para parecer real
    return of({
      success: true,
      message: 'Produto cadastrado com sucesso!'
    }).pipe(delay(100)); // simula 1s de atraso da API
  }

  createProduto(produto: Produto): Observable<any> {

    console.log('Produto recebido no serviço:', produto);

    const token = localStorage.getItem('token') || produto.token;
    const headers = { Authorization: `Bearer ${token}` };
 

    return this.http.post<{ produtoRes: Produto }>(productApi + '/products/'+token, produto, { headers }).pipe(

      map((response => {
        if (response.produtoRes.token) {
          localStorage.setItem('token', response.produtoRes.token);
        }
        return response;
      }),
        catchError(this.handleErrorlogin)

      ));
  }
}