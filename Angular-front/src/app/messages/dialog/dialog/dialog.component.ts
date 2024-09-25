import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
    <h1 mat-dialog-title>Confirmar Exclusão</h1>
    <div mat-dialog-content>
      <p>Você tem certeza de que deseja deletar este perfume "{{ data.nome }}"?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button [mat-dialog-close]="true">Deletar</button>
    </div>
  `,
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nome: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}