import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Agregar módulo de enrutador
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule], //Importando módulo de enrutador
  exports: [HeaderComponent],
})
export class HeaderModule {}

