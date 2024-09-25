import { Component } from '@angular/core';
import { Perfume } from '../../../models/model.perfume';
import { PerfumesService } from '../../../services/perfumes/perfumes.service';

@Component({
  selector: 'app-perfume-index',
  templateUrl: './perfume-index.component.html',
  styleUrl: './perfume-index.component.css'
})
export class PerfumeIndexComponent {
  Perfumes:Perfume[];
  Id: number | null;
  Nome: string;
  isIdDisabled: boolean = false;
  isNameDisabled: boolean = false;

  constructor(private perfumesService:PerfumesService){
    this.Perfumes = [];
    this.Id = null;
    this.Nome = "";
  }
  
  onIdInput(): void {
    if (this.Id !== null && this.Id !== undefined) {
      this.isNameDisabled = true;
      this.isIdDisabled = false;
    } else {
      this.isNameDisabled = false;
    }
    this.Nome = '';
  }

  onNameInput(): void {
    if (this.Nome) {
      this.isIdDisabled = true;
      this.isNameDisabled = false;
    } else {
      this.isIdDisabled = false;
    }
    this.Id = null;
  }

 
  definirPesquisa():void{
    if(this.Id !== null){
      this.pesquisarPorId(Number(this.Id));
      return;
      
    }
    if(this.Nome !== ""){
      this.pesquisarPorNome(this.Nome);
      return;
    }
    this.pesquisar();
  }

  pesquisar():void{console.log(this.Id)
    this.perfumesService.get().subscribe({
      next: (jsonPerfumes:Perfume[]) => 
        (this.Perfumes = jsonPerfumes),
      error: (jsonErro:any) => {
        this.exibirMenssagemErro(jsonErro.status);
      }
    });
  }
  pesquisarPorNome(nome:string):void{
    this.perfumesService.getByName(nome).subscribe({
      next: (jsonPerfumes:Perfume[]) => {
        this.Perfumes = jsonPerfumes;
    },
    error: (jsonErro:any) => {
      this.exibirMenssagemErro(jsonErro.status);
    }
  });
  }
  pesquisarPorId(id:number):void{
    this.perfumesService.getById(Number(id)).subscribe({
      next: (jsonPerfume:Perfume) => {
        this.Perfumes = [jsonPerfume];
      },
      error: (jsonErro:any) => {
        this.exibirMenssagemErro(jsonErro.status)
      }
    })
  }
  exibirMenssagemErro(status:Number):void{
    if(status === 0)
      alert('Falha na requisição, entrar em contato com o suporte!');
    else if(status === 404)
      alert('Perfume não foi encontrado!');
    else if(status === 500)
      alert('Erro interno no servidor \n entrar em contato com o suporte! ');
  }
}
