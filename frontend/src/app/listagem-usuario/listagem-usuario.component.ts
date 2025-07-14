import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrls: ['./listagem-usuario.component.scss'],
})
export class ListagemUsuarioComponent implements OnInit {
  users: User[] = [];

  roles: string[] = ['ADMIN', 'SELLER', 'USER'];
  id: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('id') || '';
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data.filter((user: User) => user.id !== this.id);
        console.log('Usuários recebidos:', this.users);
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
      },
    });
  }

  saveRole(user: User): void {
    const userId = user.id;
    const role = user.role;
    this.userService.updateRole(userId, role).subscribe({
      next: (response) => {
        console.log('Cargo atualizado com sucesso:', response);
        alert('Cargo atualizado com sucesso!');
      },
      error: (err) => {},
    });
  }

  deleteUser(userId: any): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== userId);
          alert('Usuário deletado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao deletar usuário:', err);
          window.location.reload();
        },
      });
    }
  }
}
