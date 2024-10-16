import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Abastecimento } from '../model/abastecimento.model';
import { Observable } from 'rxjs';
import { RelatorioVeiculo } from '../model/relatorioVeiculo.model';
import { Veiculo } from '../model/veiculo.model';
import { Condutor } from '../model/condutor.model';
import { RelatorioCondutor } from '../model/relatorioCondutor.model';

@Injectable({
  providedIn: 'root'
})
export class AbastecimentoService {

  constructor(private http: HttpClient) { }

  private readonly API = 'https://consumoback.onrender.com/'

  public registrarAbastecimento(abastecimento: Abastecimento): Observable<Abastecimento> {
    return this.http.post<Abastecimento>(this.API, abastecimento);
  }

  public listarAbastecimentos(): Observable<Abastecimento[]>{
    return this.http.get<Abastecimento[]>(this.API);
  }

  public deletarAbastecimento(abastecimento: Abastecimento): Observable<Abastecimento>{
    return this.http.delete<Abastecimento>(this.API + "/" + abastecimento.id);
  }

  public relatorioVeiculo(veiculo: Veiculo): Observable<RelatorioVeiculo>{
    return this.http.get<RelatorioVeiculo>(this.API + "veiculo/" + veiculo.placa);
  }

  public relatorioCondutor(condutor: Condutor): Observable<RelatorioCondutor>{
    return this.http.get<RelatorioCondutor>(this.API + "condutor/" + condutor.id);
  }
}
