import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent {
  busca: string = "";
  isFocused: boolean = false;

  public filtrar() {
    localStorage.setItem("filtrar", this.busca);
    location.href = "vitrine";
  }
}