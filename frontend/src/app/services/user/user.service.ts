import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginClientComponent } from '../../login-client/login-client.component';
import { userApi } from 'src/app/Domain/HttpUrls/UserUrl';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  deleteUser(userId: string): Observable<any> { 

    return this.http.delete<any>(`${userApi}/users/${userId}`).pipe(
      map(() => {
        console.log('Usuário deletado com sucesso:', userId);
        return userId;
      }),
      catchError(this.handleErrorlogin)
    );
  }
  
  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    console.log('Credenciais:', credentials);
    return this.http
      .post<{ token: string }>(userApi + '/auth/login', credentials)
      .pipe(
        map((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          return response;
        }),
        catchError(this.handleErrorlogin)
      );
  }

  getAll(): Observable<any[]> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<any[]>(userApi + '/users', { headers }).pipe(
      map((response) => {
        console.log('Usuários recebidos do servidor:', response);
        return response;
      }),
      catchError(this.handleErrorlogin)
    );
  }
  createUser(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> { 

    return this.http.post<any>(userApi + '/users', user ).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleErrorlogin)
    );
  }

  updateUser(user: any): Observable<any> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const id = localStorage.getItem('id') || '';

    return this.http.put<any>(`${userApi}/users/${id}`, user, { headers }).pipe(
      map((response) => {
        console.log('Usuário atualizado com sucesso:', response);
        return response;
      }),
      catchError(this.handleErrorlogin)
    );
  }

  updateRole(userId:any, role: string): Observable<any> { 


    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const id = localStorage.getItem('id') || '';
 
    return this.http.put<any>(`${userApi}/users/role/${userId}`, role).pipe(
      map(() => {
        console.log('Usuário atualizado com sucesso:', "");
        return "";
      }),
      catchError(this.handleErrorlogin)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleErrorlogin(error: HttpErrorResponse) {
    let errorMessage =
      'Ocorreu um erro inesperado. Tente novamente mais tarde.';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente (ex: conexão)
      errorMessage = `Erro na requisição: ${error.message}`;
    } else {
      // Erro do lado do servidor
      switch (error.status) {
        case 0:
          errorMessage = 'Não foi possível conectar ao servidor.';
          break;
        case 400:
          errorMessage = 'Requisição inválida. Verifique os dados enviados.';
          break;
        case 401:
        case 403:
          errorMessage = 'Credenciais inválidas. Verifique e tente novamente.';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor. Tente mais tarde.';
          break;
        default:
          errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }

    return throwError(Error(errorMessage));
  }

  getById(id: string): Observable<any> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<any>(`${userApi}/users/${id}`, { headers }).pipe(
      map((response) => {
        console.log('Usuário recebido do servidor:', response);
        return response;
      }),
      catchError(this.handleErrorlogin)
    );
  }
}
