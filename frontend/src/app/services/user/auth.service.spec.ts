import { TestBed } from '@angular/core/testing';
import { AuthService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Test } from 'mocha';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve fazer login e armazenar o token', () => {
    const mockToken = 'fake-jwt-token';
    const credentials = {email: 'teste@email.com', password: '123456'};

    service.login(credentials).subscribe(response => {
      expect(response.token).toBe(mockToken);
      expect(localStorage.getItem('token')).toBe(mockToken);
    });

    const req= httpMock.expectOne('/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);

    req.flush({ token: mockToken});

  });

  it('deve tratar erro no login', () => {
    const credentials = {email: 'email@invalido.com', password: 'errado'};
    const errorMessage = 'Credenciais Invalidas';

    service.login(credentials).subscribe({
      next: () => fail ('deveria ter dado erro'),
      error: error => {
        expect(error.error.message).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne('/auth/login');
    req.flush({ message: errorMessage }, {status: 401, statusText:  'Unathorized'});
    });

    it('deve remover o token no logout', () => {
      localStorage.setItem('token', 'abc123');
      service.logout();
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('deve retornar true se estiver logado', () => {
      localStorage.setItem('token', 'abc123');
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('deve retornar false se nao estive logado', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });

    it('deve retornar o token armazenado', () => {
      localStorage.setItem('token', 'tokenXYZ');
      expect(service.getToken()).toBe('tokenXYZ');
    });
});