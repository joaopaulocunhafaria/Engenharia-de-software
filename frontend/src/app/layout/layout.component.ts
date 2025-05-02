import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Input() title: string = 'Minha Aplicação';
  isMenuOpen: boolean = false;
  searchQuery: string = '';

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearch(): void {
    console.log('Pesquisando por:', this.searchQuery);
    // Aqui você pode emitir um evento ou chamar um serviço de pesquisa
  }
}