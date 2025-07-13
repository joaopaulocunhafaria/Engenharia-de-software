import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // <-- Importante para redirecionar

interface Produto {
  nome: string;
  preco: string;
  estoque: number;
  categoria: string;
  isEditing?: boolean;
}

@Component({
  selector: 'app-listagem-produto',
  templateUrl: './listagem-produto.component.html',
  styleUrls: ['./listagem-produto.component.scss']
})
export class ListagemProdutoComponent implements OnInit {

  produtos: Produto[] = [
    { nome: 'produto 1', preco: 'R$100', estoque: 10, categoria: 'categoria do produto' },
    { nome: 'produto 2', preco: 'R$150', estoque: 25, categoria: 'categoria do produto' },
    { nome: 'produto 3', preco: 'R$200', estoque: 5, categoria: 'outra categoria' },
    { nome: 'produto 4', preco: 'R$50', estoque: 100, categoria: 'categoria básica' }
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.produtos.forEach(produto => produto.isEditing = false);
  }

   // Alterna o modo de edição para um produto específico
   toggleEditMode(produto: Produto): void {
    produto.isEditing = !produto.isEditing;
  }

  // Função para salvar as alterações de um produto
  salvarProduto(produto: Produto): void {
    console.log('Salvando produto:', produto);
    // Aqui você enviaria os dados atualizados para um serviço/API
    // Por exemplo: this.produtoService.updateProduto(produto).subscribe(() => { ... });

    // Após salvar, você pode sair do modo de edição
    produto.isEditing = false;
  }

  irParaCadastro() {
    this.router.navigate(['/cadastrar-produto']);
  }

}
