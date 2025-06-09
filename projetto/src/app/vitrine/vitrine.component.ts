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
    {codigo:1, nome:"Mitsubishi Lancer 2.0", ano: 2011, valor:57000, descritivo:"2.0 CVT 16V GASOLINA 4P AUTOMÁTICO", quantidade:1, promo:50000,
      destaque:1, keywords:""
    },
    {codigo:2, nome:"Fiat Argo Firefly", ano: 2017, valor:61000, descritivo:"1.0 FIREFLY FLEX DRIVE MANUAL", quantidade:1, promo:57000,
      destaque:1, keywords:""
    },
    {codigo:3, nome:"Mercedez Benz c180", ano: 2012, valor:69000, descritivo:"1.8 CGI CLASSIC 16V TURBO GASOLINA 4P AUTOMÁTICO", quantidade:0, promo:65000,
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
