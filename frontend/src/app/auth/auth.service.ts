import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginClientComponent } from '../login-client/login-client.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  
  private readonly apiUrl = '/auth/login';

  constructor(private http: HttpClient){}

    login(credentials: {email: string; password: string}) : Observable<{ token: string}>{
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

    private handleError(error: HttpErrorResponse){
      return throwError(() => error);
    }

}