import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginClientComponent } from './login-client.component';
import { AuthService } from 'src/app/auth/auth.service';

describe('LoginClientComponent', () => {
  let component: LoginClientComponent;
  let fixture: ComponentFixture<LoginClientComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginClientComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter o formulário inválido quando vazio', () => {
    component.loginForm.setValue({ email: '', password: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('deve validar formato do email', () => {
    component.loginForm.setValue({ email: 'email_invalido', password: 'senha123' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('deve chamar o AuthService.login() e redirecionar em login bem-sucedido', () => {
    const fakeToken = 'fake-jwt-token';
    authServiceSpy.login.and.returnValue(of({ token: fakeToken }));

    component.loginForm.setValue({ email: 'teste@email.com', password: '123456' });
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(localStorage.getItem('token')).toBe(fakeToken);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('deve exibir mensagem de erro se as credenciais forem inválidas', () => {
    const errorMsg = 'Credenciais inválidas';
    authServiceSpy.login.and.returnValue(throwError({ error: { message: errorMsg } }));

    component.loginForm.setValue({ email: 'teste@email.com', password: 'errada' });
    component.onSubmit();

    expect(component.error).toBe(errorMsg);
    expect(component.loading).toBeFalse();
  });

  it('deve exibir erro genérico se não houver mensagem da API', () => {
    authServiceSpy.login.and.returnValue(throwError({}));

    component.loginForm.setValue({ email: 'teste@email.com', password: '123456' });
    component.onSubmit();

    expect(component.error).toBe('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    expect(component.loading).toBeFalse();
  });
});