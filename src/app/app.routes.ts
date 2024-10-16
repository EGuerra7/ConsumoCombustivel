import { Routes } from '@angular/router';
import { AbastecimentoComponent } from './components/abastecimento/abastecimento.component';
import { CadastrosComponent } from './components/cadastros/cadastros.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { RelatorioPorVeiculoComponent } from './components/shared/relatorio-por-veiculo/relatorio-por-veiculo.component';
import { RelatorioPorCondutorComponent } from './components/shared/relatorio-por-condutor/relatorio-por-condutor.component';

export const routes: Routes = [
  {
    path:"",
    component: AbastecimentoComponent
  },
  {
    path:"cadastros",
    component: CadastrosComponent
  },
  {
    path:"relatorios",
    component: RelatoriosComponent
  },
  {
    path:"relatorioVeiculo",
    component: RelatorioPorVeiculoComponent
  },
  {
    path:"relatorioCondutor",
    component: RelatorioPorCondutorComponent
  }
];
