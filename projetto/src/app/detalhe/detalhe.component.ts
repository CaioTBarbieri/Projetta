import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})
export class DetalheComponent {
    mensagem: string  = "";
    obj: Produto = new Produto();

    imagemAtual = 0;
    imagens: string[] = [];

    constructor(){
      let json = localStorage.getItem("produto");
  if (json == null) {
    this.mensagem = "Produto não encontrado! Verifique!";
  } else {
    this.obj = JSON.parse(json);

    // Supondo que as imagens estejam no public/assets e sejam nomeadas como:
    // codigo.jpg, codigo_1.jpg, codigo_2.jpg...
    this.imagens = [
      `${this.obj.codigo}.jpg`,
      `${this.obj.codigo}_1.jpg`,
      `${this.obj.codigo}_2.jpg`,
      `${this.obj.codigo}_3.jpg`,
      `${this.obj.codigo}_4.jpg`
    ];
    }
    }

    proximo() {
  this.imagemAtual = (this.imagemAtual + 1) % this.imagens.length;
}

anterior() {
  this.imagemAtual = (this.imagemAtual - 1 + this.imagens.length) % this.imagens.length;
}

irParaImagem(index: number) {
  this.imagemAtual = index;
}
}
