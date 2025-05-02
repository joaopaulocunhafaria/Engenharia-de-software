import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginClientComponent } from '../login-client/login-client.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  
  private readonly apiUrl = 'http://localhost:8081/auth/login';

  constructor(private http: HttpClient){}

    login(credentials: {email: string; password: string}) : Observable<{ token: string}>{
      console.log('Credenciais:', credentials);
      return this.http.post<{ token: string} > (this.apiUrl, credentials).pipe(
        
        map(response => {
          if(response.token){
            localStorage.setItem('token', response.token);
          }
          return response;
        }),
        catchError(this.handleError)
      );
    }
  
    logout():void {
      localStorage.removeItem('token');
    }

    isLoggedIn(): boolean{
      return !!localStorage.getItem('token');
    }

    getToken(): string | null {
      return localStorage.getItem('token');
    }

    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
    
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
     
      return throwError(  Error(errorMessage));
    }
    
}