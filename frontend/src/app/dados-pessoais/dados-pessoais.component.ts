import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  // Usamos getters para acessar os valores no template quando não estiver em editMode
  get nomeCompleto(): string { return this._nomeCompleto; }
  get email(): string { return this._email; }
  get endereco(): string { return this._endereco; }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.personalDataForm = this.fb.group({
      nomeCompleto: [this._nomeCompleto, Validators.required],
      email: [this._email, [Validators.required, Validators.email]],
      endereco: [this._endereco, Validators.required],
      // A senha não será preenchida, apenas usada se o usuário digitar uma nova
      password: ['', [Validators.minLength(6)]] // Senha é opcional para edição, mas com minLength
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

    const updatedData = this.personalDataForm.value;
    console.log('Dados a serem salvos:', updatedData);

    this._nomeCompleto = updatedData.nomeCompleto;
    this._email = updatedData.email;
    this._endereco = updatedData.endereco;
    this.editMode = false; // Sai do modo de edição
    this.personalDataForm.get('password')?.setValue('');

  }
}
