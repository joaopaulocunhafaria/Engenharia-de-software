import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.scss']
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
      categoria: ['', Validators.required]
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
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const produto = this.form.value;

    this.produtoService.createMock(produto, this.imagemSelecionada ?? undefined).subscribe({
      next: (res) => {
        alert(res.message); // mensagem de sucesso
        this.form.reset(); // limpa formulário
        this.imagemSelecionada = null;
      },
      error: () => {
        alert('Erro ao cadastrar produto.');
      }
    });
  }
}
