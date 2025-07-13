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

<<<<<<< HEAD
  private handleErrorlogin(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }


  constructor(private http: HttpClient) { }

  listarTodos(): Observable<any[]> { 

    const token = localStorage.getItem('token') ;
    const headers = { Authorization: `Bearer ${token}` };
 
    return this.http.get<any[]>(productApi + '/products',{headers}).pipe(
      map((response: any[]) => {
        console.log('Produtos recebidos do servidor:', response);
        return response;
      }),
      catchError(this.handleErrorlogin) 
    );
  }
  createProduto(produto: any): Observable<any> {

    console.log('Produto recebido no serviço:', produto);

    const token = localStorage.getItem('token') || produto.token;
    const headers = { Authorization: `Bearer ${token}` };
 

    return this.http.post<{ produtoRes: Produto }>(productApi + '/products/'+token, produto, { headers }).pipe(

      map((response => {
        
        return response;
      }),
        catchError(this.handleErrorlogin)

      ));
=======
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
>>>>>>> ab52663c46deb4a02103c2be8af34c7ef7e1f2f3
  }
}