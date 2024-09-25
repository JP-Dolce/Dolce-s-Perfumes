import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  
})
export class MenuComponent {
  addToFavorites(): void {
    alert('Pressione Ctrl+D (ou Cmd+D no Mac) para adicionar esta página aos seus favoritos.');
  }
  copyLink(): void {
    
    const url = window.location.href;

  
    navigator.clipboard.writeText(url).then(
      () => {
        
        alert('Link copiado para a área de transferência!');
      },
      (err) => {
      
        alert('Falha ao copiar o link. Tente novamente.');
        console.error('Erro ao copiar o link:', err);
      }
    );
  }
}

