import { Component } from '@angular/core';
import { Cesta } from '../model/cesta';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent {
  cesta : Cesta = new Cesta();
  mensagem: string = "";

  constructor(){
    this.carregarCesta();
  }

  carregarCesta() {
    let json = localStorage.getItem("cesta");
    if(json == null){
      this.mensagem = "Sua cesta de compras está vazia!";
      this.cesta = new Cesta();
    } else {
      this.cesta = JSON.parse(json);
      this.recalcularTotal();
      if(this.cesta.itens.length === 0) {
        this.mensagem = "Sua cesta de compras está vazia!";
      } else {
        this.mensagem = "";
      }
    }
  }

  recalcularTotal() {
    this.cesta.total = this.cesta.itens.reduce((total, item) => {
      return total + item.valor;
    }, 0);
  }

  limpar(){
    if(confirm('Tem certeza que deseja limpar toda a cesta?')) {
      localStorage.removeItem("cesta");
      this.cesta = new Cesta();
      this.mensagem = "Sua cesta de compras está vazia!";
    }
  }

  continuar(){
    location.href="vitrine";
  }

  removerItem(index: number){
    if(confirm('Tem certeza que deseja remover este item?')) {
      this.cesta.itens.splice(index, 1);
      this.recalcularTotal();
      this.salvarCesta();
      
      if(this.cesta.itens.length === 0) {
        this.mensagem = "Sua cesta de compras está vazia!";
      }
    }
  }

  salvarCesta() {
    localStorage.setItem("cesta", JSON.stringify(this.cesta));
  }

  finalizarCompra() {
    if(this.cesta.itens.length === 0) {
      alert('Sua cesta está vazia!');
      return;
    }
    
    alert(`Compra finalizada! Total: R$ ${this.cesta.total.toFixed(2)}`);
    this.limparCestaSemConfirmacao();
  }

  private limparCestaSemConfirmacao() {
    localStorage.removeItem("cesta");
    this.cesta = new Cesta();
    this.mensagem = "Sua cesta de compras está vazia!";
  }
}

