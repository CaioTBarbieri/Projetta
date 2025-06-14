import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente } from '../model/cliente';
@Component({
  selector: 'app-esqueci',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './esqueci.component.html',
  styleUrl: './esqueci.component.css'
})
export class EsqueciComponent {
  mensagem: String = "";
  obj:Cliente = new Cliente();

  reenviarSenha(){
    this.mensagem = "Um link de recuperação foi enviado ao seu email!";
  }
}
