import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { Cesta } from '../model/cesta';

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

  constructor() {
  let json = localStorage.getItem("produto");
  if (json == null) {
    this.mensagem = "Carro não encontrado!";
  } else {
    this.obj = JSON.parse(json);

    // Pega o nome do carro e deixa tudo minúsculo e sem espaços
    const nomeCarro = this.obj.nomeImg.toLowerCase().replace(/\s+/g, '');

    // Cria os caminhos com base nisso
    this.imagens = [
       `${nomeCarro}/${nomeCarro}.jpg`,
      `${nomeCarro}/${nomeCarro}_1.jpg`,
      `${nomeCarro}/${nomeCarro}_2.jpg`,
      `${nomeCarro}/${nomeCarro}_3.jpg`,
      `${nomeCarro}/${nomeCarro}_4.jpg`,
    ];
  }
}

adicionar(obj:Produto){
    let json = localStorage.getItem("cesta");
    let cesta = new Cesta();
    if(json!=null){ 
      cesta = JSON.parse(json);
    }
    cesta.itens.push(obj);
    cesta.total = cesta.total + obj.valor;
    localStorage.setItem("cesta", JSON.stringify(cesta) );
    location.href = "cesta";
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
