import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { Cesta } from '../model/cesta';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent {
  public mensagem: string = "";
  public lista : Produto[] = [
    {codigo:1, nome:"Parafusadeira", valor:100, descritivo:"parafusadeira eletrica", quantidade:3, promo:100,
      destaque:1, keywords:""
    },
    {codigo:2, nome:"Serra", valor:150, descritivo:"serra eletrica", quantidade:3, promo:100,
      destaque:1, keywords:""
    },
    {codigo:3, nome:"Martelete", valor:100, descritivo:"martelete", quantidade:0, promo:100,
      destaque:1, keywords:""
    },
  ]; 
  public listaFiltrada : Produto[] = [];


  verDetalhe(obj:Produto){
      localStorage.setItem("produto", JSON.stringify(obj));
      //JSON - java script object notation
      location.href="detalhe";
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


  filtrar() {
    let filtro = localStorage.getItem("filtrar");
    if(filtro != null){
      this.listaFiltrada =this.lista;

      this.lista = this.lista.filter(Produto =>
        Produto.nome.toLowerCase().includes(filtro.toLowerCase())
      );
    }
  }

}
