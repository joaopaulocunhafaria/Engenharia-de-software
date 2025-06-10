import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.scss']
})
export class ListagemProdutosComponent implements OnInit {
  termoBusca: string = '';
  produtos: any[] = [];
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.termoBusca = params['termoBusca'] || '';
      this.buscarProdutos();
    });
  }

  buscarProdutos(): void {
    this.carregando = true;

    if (this.termoBusca) {
      this.produtoService.buscarPorTermo(this.termoBusca).subscribe(produtos => {
        this.produtos = produtos;
        this.carregando = false;
      });
    } else {
      this.produtoService.listarTodos().subscribe(produtos => {
        this.produtos = produtos;
        this.carregando = false;
      });
    }
  }
}
