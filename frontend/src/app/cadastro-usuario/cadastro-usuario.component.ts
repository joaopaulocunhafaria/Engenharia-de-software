import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  cadastroForm: FormGroup = new FormGroup({});
  submitted = false;
  isLoading = false;
  errorMessage: string | null = null;
  showPassword = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.cadastroForm.controls;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  salvar(): void {
    this.submitted = true;

    if (this.cadastroForm.invalid) {
      return;
    }

    this.isLoading = true;

    // Simula envio dos dados
    setTimeout(() => {
      this.isLoading = false;
      console.log('Formulário enviado com sucesso:', this.cadastroForm.value);
      // Aqui você pode enviar os dados para o backend
    }, 2000);
  }
}
