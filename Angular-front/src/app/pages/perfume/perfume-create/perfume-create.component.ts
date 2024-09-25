import { Component } from '@angular/core';
import { Perfume } from '../../../models/model.perfume';
import { PerfumesService } from '../../../services/perfumes/perfumes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfume-create',
  templateUrl: './perfume-create.component.html',
  styleUrl: './perfume-create.component.css'
})
export class PerfumeCreateComponent {
  Perfume: Perfume;

  constructor(private perfumesService:PerfumesService,
              private router:Router){
    this.Perfume = new Perfume();
  }

enviar():void{
  this.perfumesService.post(this.Perfume).subscribe({
    next: () => {
      alert('Perfume adicionado com sucesso!');
      this.router.navigate(['/perfumes'])
    },
    error: (jsonErro:any) => {
      this.exibirMenssagemErro(jsonErro.status)
    }
  })
}
validarDadosExibirMenssagem():boolean{
  let msg:string = '';

  if(this.Perfume.Marca === '')
    msg += 'Marca; \n'

  if(this.Perfume.Nome === '')
    msg += 'Nome; \n'

  if(this.Perfume.DataFabricacao.toString() === '')
    msg += 'Data de Fabricação; \n'

  if(this.Perfume.Valor.toString() === '')
    msg += 'Valor; \n'

  if(this.Perfume.DataVencimento !== null 
    && this.Perfume.DataVencimento.toString() !== ''
    && this.Perfume.DataVencimento < this.Perfume.DataFabricacao)
    msg += 'Data de fabricação não pode ser maior que a data de vencimento!';
  
  if(msg !== ''){
    msg += 'Preencha corretamente os dados a seguir \n' + msg;
    alert(msg);
    return false
  }
  return true
}
exibirMenssagemErro(status:Number):void{
  if(status === 0)
    alert('Falha na requisição, entrar em contato com o suporte!');
  else if(status === 400)
    alert('Verifique os dados que estão sendo enviados!')
  else if(status === 404)
    alert('Perfume não foi encontrado!');
  else if(status === 500)
    alert('Erro interno no servidor \n entrar em contato com o suporte! ');
}
}
