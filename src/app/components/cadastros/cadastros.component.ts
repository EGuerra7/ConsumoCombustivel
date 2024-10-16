import {MatDividerModule} from '@angular/material/divider';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';



@Component({
  selector: 'app-cadastros',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './cadastros.component.html',
  styleUrl: './cadastros.component.css'
})
export class CadastrosComponent {

  readonly dialog = inject(MatDialog);


  constructor () {}

  openDialog(tipo: string, item?: any, isEdit: boolean = false): void {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: { tipo, item, isEdit: !!item  }, // Enviando o tipo para o diálogo
    });
  }

  openRegisterDialog(tipo: string): void {
    this.openDialog(tipo);
  }

}
