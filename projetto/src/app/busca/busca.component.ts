import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent {
  busca: string = "";
  isFocused: boolean = false;
  showSuggestions: boolean = false;
  sugestoes: string[] = [];
  
  // Lista de carros/marcas disponíveis
  private carrosDisponiveis: string[] = [
    'Mitsubishi Lancer',
    'Fiat Argo',
    'Mercedes Benz C180',
    'Jaguar F-Type',
    'Honda ZR-V',
    'Jeep Compass',
    'BMW X2',
    'Hyundai Tucson',
    'Hyundai Santa Fé'
  ];

  private timeoutId: any;

  public filtrar() {
    localStorage.setItem("filtrar", this.busca);
    location.href = "vitrine";
  }

  public onInputChange(event: any) {
    const valor = event.target.value;
    this.busca = valor;
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    this.timeoutId = setTimeout(() => {
      this.buscarSugestoes(valor);
    }, 300);
  }

  private buscarSugestoes(termo: string) {
    if (termo.length < 2) {
      this.sugestoes = [];
      this.showSuggestions = false;
      return;
    }

    // Filtra os carros que contêm o termo digitado (case insensitive)
    this.sugestoes = this.carrosDisponiveis.filter(carro => 
      carro.toLowerCase().includes(termo.toLowerCase())
    ).slice(0, 5); //Limite de 5 sugestões

    this.showSuggestions = this.sugestoes.length > 0;
  }

  public selecionarSugestao(sugestao: string) {
    this.busca = sugestao;
    this.showSuggestions = false;
    this.filtrar();
  }

  public highlightSuggestion(sugestao: string) {
  }

  public onBlur() {

    setTimeout(() => {
      this.isFocused = false;
      this.showSuggestions = false;
    }, 200);
  }
}

