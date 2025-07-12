import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CarrinhoItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem?: string;
}

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private itensSubject = new BehaviorSubject<CarrinhoItem[]>([]);
  itens$ = this.itensSubject.asObservable();

  addItem(item: CarrinhoItem) {
    const itens = [...this.itensSubject.value];
    const index = itens.findIndex(i => i.id === item.id);
    if (index >= 0) {
      itens[index].quantidade += item.quantidade;
    } else {
      itens.push(item);
    }
    this.itensSubject.next(itens);
  }

  updateQuantidade(id: number, delta: number) {
    const itens = this.itensSubject.value.map(i => {
      if (i.id === id) {
        const nova = i.quantidade + delta;
        return { ...i, quantidade: nova > 0 ? nova : 1 };
      }
      return i;
    });
    this.itensSubject.next(itens);
  }

  removeItem(id: number) {
    const itens = this.itensSubject.value.filter(i => i.id !== id);
    this.itensSubject.next(itens);
  }

  clear() {
    this.itensSubject.next([]);
  }

  getTotal(): number {
    return this.itensSubject.value.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  }

  getItens(): CarrinhoItem[] {
    return this.itensSubject.value;
  }
}
