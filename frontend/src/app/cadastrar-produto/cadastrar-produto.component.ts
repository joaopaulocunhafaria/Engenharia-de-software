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
 
    const formData = new FormData();
    if (this.imagemSelecionada) {
      formData.append('image', this.imagemSelecionada); // tipo: File
    }
    const sellerId = localStorage.getItem('id') || ''; // obtém o ID do vendedor logado
    formData.append('title', produto.nome);
    formData.append('description', produto.descricao);
    formData.append('ownerId', sellerId ); // substitua por um ID válido
    formData.append('category', produto.categoria);
    formData.append('price', produto.preco.toString());
    formData.append('quantity', produto.estoque.toString());
    console.log('Dados do produto:', formData);
    this.produtoService.createProduto(formData).subscribe({
      next: (response) => {
        console.log('Produto cadastrado com sucesso:', response);
        window.location.href = '/';
      },
      error: (error) => {
        console.error('Erro ao cadastrar produto:', error);
      },
    });
  }
}
