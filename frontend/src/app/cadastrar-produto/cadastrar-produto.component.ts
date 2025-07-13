import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../services/produtos/produto.service';
import { Produto } from '../Domain/Models/Product.Model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.scss']
})
export class CadastrarProdutoComponent implements OnInit {
  form!: FormGroup;
  imagemSelecionada: File | null = null;

  mensagem: string = '';
  sucesso: boolean = false;
  erro: boolean = false;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [null, [Validators.required, Validators.min(0.01)]],
      estoque: [null, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagemSelecionada = file;
    }
  }

  cadastrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const produto = this.form.value;

    const imagem = this.imagemSelecionada ?? new File([], '');

    const produtoPayload: Produto = {
      id: 0,
      token: 'mock-token',
      title: produto.nome,
      description: produto.descricao,
      image: imagem,
      ownerId: 'mock-owner-id',
      category: produto.categoria,
      price: produto.preco
    };

    this.produtoService.createProduto(produtoPayload).subscribe({
      next: (res) => {
        this.mensagem = res.message || 'Produto cadastrado!';
        this.sucesso = true;
        this.erro = false;

        // Redirecionar após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/listagem-produto']);
        }, 2000);
      },
      error: (err) => {
        this.mensagem = 'Erro ao cadastrar produto. Tente novamente.';
        this.sucesso = false;
        this.erro = true;
      }
    });
  }
}
