import { Component, inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CombustivelService } from '../service/combustivel.service';
import { CondutorService } from '../service/condutor.service';
import { VeiculoService } from '../service/veiculo.service';
import { Combustivel } from '../model/combustivel.model';
import { Condutor } from '../model/condutor.model';
import { Veiculo } from '../model/veiculo.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [ MatIconModule, CommonModule ],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css'
})
export class RelatoriosComponent implements OnInit{

  readonly dialog = inject(MatDialog);

  listaDeCondutores: Condutor[] = [];
  listaDeVeiculos: Veiculo[] = [];
  listaDeCombustivel: Combustivel[] = [];

  constructor( private condutorService: CondutorService,
    private veiculoService: VeiculoService,
    private combustivelService: CombustivelService,
    private router: Router,
    private toastr: ToastrService
  ) {}

    ngOnInit() {
      this.listarCondutores();
      this.listarVeiculos();
      this.listarCombustiveis();
  }

    listarCondutores(){
      this.condutorService.listarCondutor().subscribe(response => {
        this.listaDeCondutores = response;
      })
    }

    listarVeiculos(){
      this.veiculoService.listarVeiculo().subscribe(response => {
        this.listaDeVeiculos = response;
      })
    }

    listarCombustiveis(){
      this.combustivelService.listarCombustivel().subscribe(response => {
        this.listaDeCombustivel = response;
      })
    }

    openDialog(tipo: string, item: any): void {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '50%',
        data: { tipo, item, isEdit: !!item },
      });

      dialogRef.afterClosed().subscribe(result => {
        this.listarCondutores();
        this.listarVeiculos();
      });
    }

    deletarVeiculo(veiculo: Veiculo){
      this.veiculoService.deletarVeiculo(veiculo).subscribe(response => {
        let msg = "Veículo " + veiculo.marca + " deletado!";
        this.showDelete(msg)
        this.listarVeiculos();
      }, erro => {
        this.showError("Erro ao deletar o veículo!");
      })
    }

    deletarCombustivel(combustivel: Combustivel){
      this.combustivelService.deletarCombustivel(combustivel).subscribe(response => {
        let msg = "Combustível " + combustivel.tipo + " deletado!";
        this.showDelete(msg)
        this.listarCombustiveis();
      }, erro => {
        this.showError("Erro ao deletar o combustível!");
      })
    }

    relatorioPorVeiculo(veiculo: Veiculo){
      const veiculoData = {
      tipo: veiculo.tipo,
      marca: veiculo.marca,
      placa: veiculo.placa,
      tipoCombustivel: veiculo.tipoCombustivel,
      capacidadeTanque: veiculo.capacidadeTanque
      };

      this.router.navigate(['/relatorioVeiculo'], { queryParams: veiculoData });
    }

    relatorioPorCondutor(condutor: Condutor){
      const condutorData = {
      id: condutor.id,
      nome: condutor.nome,
      ativo: condutor.ativo
      };

      this.router.navigate(['/relatorioCondutor'], { queryParams: condutorData });
    }

    showError(msg: string) {
      this.toastr.error(msg, "Erro");
    }

    showDelete(msg: string){
      this.toastr.warning(msg);
    }
}
