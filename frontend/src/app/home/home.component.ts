import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  termo: string = '';

  constructor(private router: Router) {}

  buscar(): void {
    if (this.termo.trim()) {
      this.router.navigate(['/produtos', this.termo.trim()]);
    }
  }
}
