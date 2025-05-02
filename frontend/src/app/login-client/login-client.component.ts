import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ) { }

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
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('Erro ao fazer login:', err.message);
        this.error = err.message || 'Erro ao fazer login.';
        this.loading = false;
      }
    });
  }
  
}
