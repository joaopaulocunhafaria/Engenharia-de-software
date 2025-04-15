import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.scss']
})
export class LoginClientComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  loading = false;
  error = '';
  showPassword = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    
    // Simulando chamada de API
    setTimeout(() => {
      // Aqui você faria a chamada real para seu serviço de autenticação
      console.log('Login attempt with:', this.loginForm.value);
      
      // Simulando erro (remova isso na implementação real)
      // this.error = 'Email ou senha incorretos';
      // this.loading = false;
      
      // Simulando sucesso (implemente a navegação adequada)
      alert('Login bem-sucedido!');
      this.loading = false;
    }, 1500);
  }
}
