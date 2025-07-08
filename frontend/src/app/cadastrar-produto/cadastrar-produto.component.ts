import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../services/produtos/produto.service';
import { Produto } from '../Domain/Models/Product.Model';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.scss'],
})
export class CadastrarProdutoComponent implements OnInit {
  form!: FormGroup; // substitui o objeto produto
  imagemSelecionada: File | null = null;
  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [null, [Validators.required, Validators.min(0.01)]],
      estoque: [null, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagemSelecionada = file;
      console.log('Imagem selecionada:', this.imagemSelecionada);
    }
  }

  cadastrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // força exibir os erros
      return;
    }

    const produto = this.form.value;
 
    const formData = new FormData();
    if (this.imagemSelecionada) {
      formData.append('image', this.imagemSelecionada); // tipo: File
    }
    formData.append('title', produto.nome);
    formData.append('description', produto.descricao);
    formData.append('ownerId', "3");
    formData.append('category', produto.categoria);
    formData.append('price', produto.preco.toString());
    this.produtoService.createProduto(formData).subscribe({
      next: (response) => {
        console.log('Produto cadastrado com sucesso:', response);
      },
      error: (error) => {
        console.error('Erro ao cadastrar produto:', error);
      },
    });
  }
}
