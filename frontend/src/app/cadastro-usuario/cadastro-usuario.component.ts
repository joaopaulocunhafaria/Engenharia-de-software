import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder,private userService: UserService, private router:Router) {}

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
    this.errorMessage = null;

    if (this.cadastroForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.isLoading = true;

    const userPayload = {
      name: this.f.nome.value,
      email: this.f.email.value,
      password: this.f.senha.value,
      role: 'USER'
    };

    this.userService.createUser(userPayload).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);  
      },
      error: (error: any) => {
        this.errorMessage = error.message || 'Erro ao cadastrar usuário.';
        this.isLoading = false;
      }
    });
  }
}
