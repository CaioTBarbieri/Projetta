import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BuscaComponent } from './busca/busca.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BuscaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'loja2025';
}
