import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class VitrineComponent implements AfterViewInit {
  @ViewChild('vitrineVideo') vitrineVideo!: ElementRef<HTMLVideoElement>;
  
  public mensagem: string = "";
  public lista : Produto[] = [
    {codigo:1, nome:"Mitsubishi Lancer 2.0",nomeImg:"lancer", ano: 2011, valor:57000, descritivo:"2.0 CVT 16V GASOLINA 4P AUTOMÁTICO",quilometragem: 150000, cambio:"Automático",combustivel:"Gasolina", cor: "Preto",corbolinha: "rgb(0, 0, 0)", quantidade:1, promo:50000,
      destaque:1, keywords:""
    },
    {codigo:2, nome:"Fiat Argo 1.0",nomeImg:"argo", ano: 2017, valor:61000, descritivo:"1.0 FIREFLY FLEX DRIVE MANUAL", quilometragem: 86000, cambio: "Manual", combustivel: "Gasolina e álcool", cor: "Cinza",corbolinha: "rgb(73, 73, 75)", quantidade:1, promo:57000,
      destaque:1, keywords:""
    },
    {codigo:3, nome:"Mercedez Benz c180",nomeImg:"c180", ano: 2012, valor:69000, descritivo:"1.8 CGI CLASSIC 16V TURBO GASOLINA 4P AUTOMÁTICO",quilometragem: 188000, cambio: "Automático", combustivel:"Gasolina", cor: "Branco",corbolinha: "rgb(255, 255, 255)",quantidade:0, promo:65000,
      destaque:1, keywords:""
    },
    {codigo:4, nome:"Jaguar F-Type",nomeImg:"ftype", ano: 2013, valor:375900, descritivo:"3.0 S CABRIO SUPERCHARGED V6 24V GASOLINA 2P AUTOMÁTICO", quilometragem: 39000, cambio: "Automático", combustivel:"Gasolina", cor: "Branco",corbolinha: "rgb(255, 255, 255)", quantidade:1, promo:350000, 
      destaque:1, keywords:"" 
    },
    {codigo:5, nome:"Honda ZR-V",nomeImg:"zrv", ano: 2024, valor:268990, descritivo:"2.0 i-VTEC GASOLINA CVT", quilometragem: 3902, cambio: "Automático", combustivel:"Gasolina", cor: "Preto",corbolinha: "rgb(0, 0, 0)", quantidade:1, promo:250000, 
      destaque:1, keywords:"" 
    },
    {codigo:6, nome:"Jeep Compass",nomeImg:"compass", ano: 2023, valor:134800, descritivo:"1.3 T270 TURBO FLEX LONGITUDE AT6", quilometragem: 43000, cambio: "Automático", combustivel:"Gasolina e álcool", cor: "Prata",corbolinha: "rgb(192, 192, 192)", quantidade:1, promo:120000, 
      destaque:1, keywords:"" 
    },
    {codigo:7, nome:"BMW X2",nomeImg:"x2", ano: 2018, valor:205900, descritivo:"2.0 16V TURBO ACTIVEFLEX SDRIVE20I GP STEPTRONIC", quilometragem: 52689, cambio: "Automático", combustivel:"Gasolina e álcool", cor: "Cinza", corbolinha: "rgb(128, 128, 128)", quantidade:1, promo:120000, 
      destaque:1, keywords:"" 
    },
    {codigo:8, nome:"Hyundai Tucson",nomeImg:"tucson", ano: 2020, valor:117790, descritivo:"1.6 16V T-GDI GASOLINA GLS ECOSHIFT", quilometragem: 46000, cambio: "Automático", combustivel:"Gasolina", cor: "Prata", corbolinha: "rgb(128, 128, 128)", quantidade:1, promo:100000, 
      destaque:1, keywords:"" 
    },
    {codigo:9, nome:"Hyundai Santa Fé",nomeImg:"santafe", ano: 2019, valor:139900, descritivo:"3.3 MPFI 4X4 7 LUGARES V6 270CV GASOLINA 4P AUTOMÁTICO", quilometragem: 95000, cambio: "Automático", combustivel:"Gasolina", cor: "Branco", corbolinha: "rgb(255, 255, 255)", quantidade:1, promo:100000, 
      destaque:1, keywords:"" 
    },
  ]; 
  public listaFiltrada : Produto[] = [];
  public listaOriginal : Produto[] = [];

  constructor() {
    this.listaOriginal = [...this.lista];
    this.filtrar();
  }

  ngAfterViewInit() {

    if (this.vitrineVideo && this.vitrineVideo.nativeElement) {
      const video = this.vitrineVideo.nativeElement;
      video.muted = true;
      video.volume = 0;
    }
  }

  verDetalhe(obj:Produto){
      localStorage.setItem("produto", JSON.stringify(obj));
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
    
    if(filtro != null && filtro.trim() !== ""){

      this.lista = this.listaOriginal.filter(produto =>
        produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.descritivo.toLowerCase().includes(filtro.toLowerCase())
      );
      
      // Exibe mensagem se nenhum resultado for encontrado

      if(this.lista.length === 0) {
        this.mensagem = `Nenhum veículo encontrado para "${filtro}"`;
      } else {
        this.mensagem = `${this.lista.length} veículo(s) encontrado(s) para "${filtro}"`;
      }
    } else {

      this.lista = [...this.listaOriginal];
      this.mensagem = "";
    }
  }

  limparFiltro() {
    localStorage.removeItem("filtrar");
    this.lista = [...this.listaOriginal];
    this.mensagem = "";
  }
}

