import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';


interface Seller{
  id: number;
  name: string;
  email: string;
  endereco: string;
  role?: string;
}

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {

  usuario:any;
  isSeller: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {

      this.userService.getById(localStorage.getItem('id') || '').subscribe({
        next: (response) => {
          this.usuario = response;
          console.log('Dados do usuário recebidos:', this.usuario);
          if(this.usuario.role === 'SELLER'){
            this.isSeller = true;
          }
          if(this.usuario.role === 'ADMIN'){
            this.isAdmin = true;
          }
        }
        , error: (error) => {
          console.error('Erro ao carregar dados do usuário:', error);
          this.usuario = null;  
        }
      });

  }

  logout() {
    // Implemente a lógica de logout aqui
    console.log('Usuário deslogado');
    this.router.navigate(['/login']);
  }

  
  navigateToListagemProduto() {
    this.router.navigate(['/listagem-produto']);
  }

  navigateToDadosPessoais(){
    this.router.navigate(['/dados-pessoais']);
  }

  navigateToSeusPedidos(){
    this.router.navigate(['/seus-pedidos']);
  }

  
}
