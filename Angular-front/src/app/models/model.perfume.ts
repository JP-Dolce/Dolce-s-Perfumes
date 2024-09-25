export class Perfume{
    Id!:number;
    Marca:string;
    Nome:string;
    DataFabricacao:Date;
    DataVencimento!:Date | null;
    Valor:number;

    public constructor(){
        this.Marca = '';
        this.Nome = '';
        this.DataFabricacao = new Date();
        this.Valor = 0;
    }
}