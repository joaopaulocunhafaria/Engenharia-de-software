import { Component } from '@angular/core';
import { Router } from '@angular/router'; // <-- Importante para redirecionar

@Component({
  selector: 'app-estoque-produto',
  templateUrl: './estoque-produto.component.html',
  styleUrls: ['./estoque-produto.component.scss']
})
export class EstoqueProdutoComponent {

  // Lista mockada de produtos
  produtos = [
    { id: 1, nome: 'Calculadora Científica', preco: 100, estoque: 10, categoria: 'Eletrônicos' },
    { id: 2, nome: 'Caderno Universitário', preco: 20, estoque: 50, categoria: 'Material Escolar' },
    { id: 3, nome: 'Fita Isolante', preco: 5, estoque: 200, categoria: 'Material Escolar' },
    { id: 4, nome: 'Mouse Sem Fio', preco: 80, estoque: 15, categoria: 'Eletrônicos' },
    { id: 5, nome: 'Multímetro Digital', preco: 120, estoque: 7, categoria: 'Eletrônicos' },
    { id: 6, nome: 'Estojo com Zíper', preco: 15, estoque: 30, categoria: 'Material Escolar' },
    { id: 7, nome: 'Fonte de Alimentação', preco: 300, estoque: 5, categoria: 'Eletrônicos' },
    { id: 8, nome: 'Régua 30cm', preco: 4, estoque: 100, categoria: 'Material Escolar' },
    { id: 9, nome: 'Resistor 220 Ohm', preco: 1, estoque: 1000, categoria: 'Eletrônicos' },
    { id: 10, nome: 'Compasso Escolar', preco: 10, estoque: 20, categoria: 'Material Escolar' }
  ];

  // Mapeamento para exibir nomes bonitos no select
  categoriaLabels: { [key: string]: string } = {
    'livro': 'Livro',
    'eletronicos': 'Eletrônicos',
    'material escolar': 'Material Escolar',
    'item de laboratório': 'Item de laboratório'
  };

  editandoProdutoId: number | null = null;      // ID do produto que está sendo editado
  copiaProdutoEditando: any = null;             // Cópia para restaurar no cancelamento

  // Construtor com o Router injetado para navegação
  constructor(private router: Router) {}

  // Botão "Editar"
  editar(id: number) {
    this.editandoProdutoId = id;
    const produtoOriginal = this.produtos.find(p => p.id === id);
    this.copiaProdutoEditando = { ...produtoOriginal }; // Cópia para cancelar depois
  }

  // Botão "Salvar"
  salvar(produto: any) {
    if (produto.estoque < 0) {
      produto.estoque = 0;
    }

    if (produto.preco <= 0) {
      produto.preco = 0.01;
    }

    console.log('Produto salvo:', produto);
    this.editandoProdutoId = null;
    this.copiaProdutoEditando = null;
  }

  // Botão "Cancelar"
  cancelar() {
    if (this.editandoProdutoId !== null) {
      const index = this.produtos.findIndex(p => p.id === this.editandoProdutoId);
      this.produtos[index] = { ...this.copiaProdutoEditando }; // Restaura o original
    }
    this.editandoProdutoId = null;
    this.copiaProdutoEditando = null;
  }

  // Redireciona para a tela de cadastro
  irParaCadastro() {
    this.router.navigate(['/cadastrar-produto']);
  }
}
