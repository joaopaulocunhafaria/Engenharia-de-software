import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.scss'],
})
export class LoginClientComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  loading = false;
  error = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get f() {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.error = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.userService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log('Login bem-sucedido:', response);
        localStorage.setItem('token', response.token);
        const fakeUser = { nome: response.name, role: response.role };
        localStorage.setItem('currentUser', JSON.stringify(fakeUser)); 
        localStorage.setItem('name', response.name); 
        localStorage.setItem('id', response.userId);
        

        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('Erro no login:', err);
        this.error =
          err.error && err.error.message
            ? err.error.message
            : 'Login ou senha inválidos.';
        this.loading = false;
      },
    });
  }
}
