import { RelatorioCondutor } from './../../model/relatorioCondutor.model';
import { Component, OnInit } from '@angular/core';
import { Condutor } from '../../model/condutor.model';
import { ActivatedRoute } from '@angular/router';
import { AbastecimentoService } from '../../service/abastecimento.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relatorio-por-condutor',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './relatorio-por-condutor.component.html',
  styleUrl: './relatorio-por-condutor.component.css'
})
export class RelatorioPorCondutorComponent implements OnInit{

  condutorData?: Condutor;
  relatorio!: RelatorioCondutor;

  constructor(private route: ActivatedRoute, private abastecimento: AbastecimentoService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.condutorData = params;
    })

    this.carregarRelatorio();
  }


  carregarRelatorio(){
      this.abastecimento.relatorioCondutor(this.condutorData!).subscribe(
          (data: RelatorioCondutor) => {
              this.relatorio = data;
          },
          (error) => {
              console.error('Erro ao carregar o relatório:', error);
          }
      );
  }


}
