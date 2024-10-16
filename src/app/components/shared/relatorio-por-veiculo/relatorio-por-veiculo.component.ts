import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Veiculo } from '../../model/veiculo.model';
import { AbastecimentoService } from '../../service/abastecimento.service';
import { RelatorioVeiculo } from '../../model/relatorioVeiculo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relatorio-por-veiculo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorio-por-veiculo.component.html',
  styleUrl: './relatorio-por-veiculo.component.css'
})
export class RelatorioPorVeiculoComponent implements OnInit {



  veiculoData?: Veiculo;
  relatorio!: RelatorioVeiculo;

  constructor(private route: ActivatedRoute, private abastecimento: AbastecimentoService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.veiculoData = params;
    })

    this.carregarRelatorio();
  }

  carregarRelatorio(){
    this.abastecimento.relatorioVeiculo(this.veiculoData!).subscribe(
        (data: RelatorioVeiculo) => {
            this.relatorio = data;
        },
        (error) => {
            console.error('Erro ao carregar o relatório:', error);
        }
    );
}
}
