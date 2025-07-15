import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {

  personalDataForm: FormGroup = new FormGroup({}); // Inicialize o FormGroup
  editMode: boolean = false; // Estado para controlar se está no modo de edição

  // Dados do usuário (simulados) - em um app real, viriam de um serviço
  private _nomeCompleto: string = 'Nome Completo do Usuário';
  private _email: string = 'usuario@example.com';
  private _endereco: string = 'Rua Exemplo, 123 - Cidade, Estado';

  user:any;

  // Usamos getters para acessar os valores no template quando não estiver em editMode
  get nomeCompleto(): string { return this._nomeCompleto; }
  get email(): string { return this._email; }
  get endereco(): string { return this._endereco; }

  constructor(private fb: FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
    this.personalDataForm = this.fb.group({
      nomeCompleto: [this._nomeCompleto, Validators.required],
      email: [this._email, [Validators.required, Validators.email]],
      endereco: [this._endereco, Validators.required],
      // A senha não será preenchida, apenas usada se o usuário digitar uma nova
      password: ['', [Validators.minLength(6)]] // Senha é opcional para edição, mas com minLength
    });

    const id = localStorage.getItem('id') || '';
    this.userService.getById(id).subscribe({
      next: (data) => {
        this.user = data;
        this._nomeCompleto = data.name;
        this._email = data.email;
        this._endereco = data.endereco;

        this.personalDataForm.patchValue({
          nomeCompleto: this._nomeCompleto,
          email: this._email,
          endereco: this._endereco
        });
      }
    });
  }
  get f() { return this.personalDataForm.controls; }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      // Quando entra no modo de edição, reseta o campo de senha
      this.personalDataForm.get('password')?.setValue('');
    } else {
      // Quando sai do modo de edição sem salvar, reseta o formulário para os valores iniciais
      this.personalDataForm.patchValue({
        nomeCompleto: this._nomeCompleto,
        email: this._email,
        endereco: this._endereco,
        password: '' // Sempre limpa a senha ao sair do modo de edição
      });
    }
  }

  onSave(): void {
    // Marca todos os campos como "touched" para exibir mensagens de validação
    this.personalDataForm.markAllAsTouched();



    if (this.personalDataForm.invalid) {
      console.log('Formulário inválido. Verifique os campos.');
      return;
    }

    
    const userPayload = {
      name: this.personalDataForm.get("nomeCompleto")?.value ?? this.user.name,
      email: this.personalDataForm.get("email")?.value ?? this.user.email,
      password: this.personalDataForm.get("password")?.value ||"", // Mantém a senha atual se não for alterada
      role: this.user.role, 
      endereco: this.personalDataForm.get("endereco")?.value ?? this.user.endereco
    };  
     
    this.userService.updateUser(userPayload).subscribe({
      next: () => {
        console.log('Dados pessoais atualizados com sucesso!');
        // Atualiza os valores locais após salvar
        this._nomeCompleto = userPayload.name;
        this._email = userPayload.email;
        this._endereco = userPayload.endereco;
       


        

        // Sai do modo de edição
        this.toggleEditMode();
      },
      error: (error) => {
        console.error('Erro ao atualizar dados pessoais:', error);
      }
    });
  }
}
