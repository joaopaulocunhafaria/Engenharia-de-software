import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  nome: string;
  email: string;
  cargo: string;
}

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrls: ['./listagem-usuario.component.scss']
})
export class ListagemUsuarioComponent implements OnInit {

  users: User[] = [];
  roles: string[] = ['admin', 'vendedor', 'cliente'];

  constructor() { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void{
    this.users = [
      { id: 1, nome: 'nome_usuario', email: 'usuario@email.com', cargo: 'vendedor' },
      { id: 2, nome: 'nome_usuario1', email: 'usuario1@email.com', cargo: 'admin' },
      { id: 3, nome: 'Ana Silva', email: 'ana.silva@email.com', cargo: 'cliente' },

    ];
  }

  saveRole(user: User): void {

    console.log(`Salvando cargo para ${user.nome}: ${user.cargo}`);
    alert(`Cargo de ${user.nome} alterado para ${user.cargo}" (Simulado)`);
  }

  deleteUser(userId: number): void{

    if (confirm('Tem certeza que deseja deletar este usuário?')){
      this.users = this.users.filter(user => user.id !== userId);
      console.log(`Usuário com ID ${userId} deletado.`);
      alert('Usuário deletado! (Simulado)');
    }
  }

}
