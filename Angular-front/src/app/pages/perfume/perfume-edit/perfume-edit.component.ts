import { Component } from '@angular/core';
import { Perfume } from '../../../models/model.perfume';
import { PerfumesService } from '../../../services/perfumes/perfumes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../messages/dialog/dialog/dialog.component';



@Component({
  selector: 'app-perfume-edit',
  templateUrl: './perfume-edit.component.html',
  styleUrl: './perfume-edit.component.css'
})
export class PerfumeEditComponent {
  Perfume:Perfume;

  constructor(private activatedRoute:ActivatedRoute,
              private PerfumesService:PerfumesService,
              private router:Router,
              private dialog: MatDialog){
                this.Perfume = new Perfume();
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.PerfumesService.getById(Number(id)).subscribe({
      next: (jsonPerfume:Perfume) => {
        this.Perfume = jsonPerfume;
      }
    })
  }
  
  alterar(): void {
    if (this.validarDadosExibirMenssagem()) {
      this.PerfumesService.put(this.Perfume).subscribe({
        next: () => {
          alert('Perfume alterado com sucesso!');
          this.router.navigate(['/perfumes']);
        },
        error: (jsonErro: any) => {
          this.exibirMenssagemErro(jsonErro.status);
        }
      });
    }
  }

  excluir(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { nome: this.Perfume.Nome } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.PerfumesService.delete(this.Perfume.Id).subscribe({
          next: () => {
            alert('Perfume deletado com sucesso!');
            this.router.navigate(['/perfumes']); 
          },
          error: (jsonErro: any) => {
            this.exibirMenssagemErro(jsonErro.status);
          }
        });
      }
    });
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