import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos = [
    { nome: 'Camisa', descricao: 'Camisa de algodão', preco: 49.9, imagem: 'https://via.placeholder.com/150' },
    { nome: 'Calça', descricao: 'Calça jeans', preco: 89.9, imagem: 'https://via.placeholder.com/150' },
    { nome: 'Tênis', descricao: 'Tênis esportivo', preco: 199.9, imagem: 'https://via.placeholder.com/150' },
  ];

  listarTodos(): Observable<any[]> {
    return of(this.produtos);
  }

  buscarPorTermo(termo: string): Observable<any[]> {
    const termoLower = termo.toLowerCase();
    const filtrados = this.produtos.filter(p =>
      p.nome.toLowerCase().includes(termoLower) ||
      p.descricao.toLowerCase().includes(termoLower)
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
