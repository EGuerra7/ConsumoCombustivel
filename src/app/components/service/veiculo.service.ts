import { Veiculo } from './../model/veiculo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(private http: HttpClient) { }

  private readonly API = 'https://consumoback.onrender.com/veiculos/'

  public registrarVeiculo(veiculo: Veiculo): Observable<Veiculo>{
    return this.http.post<Veiculo>(this.API, veiculo);
  }

  public listarVeiculo(): Observable<Veiculo[]>{
    return this.http.get<Veiculo[]>(this.API);
  }

  public editarVeiculo(veiculo: Veiculo): Observable<Veiculo>{
    return this.http.put<Veiculo>(this.API + veiculo.placa, veiculo);
  }

  public deletarVeiculo(veiculo: Veiculo): Observable<Veiculo>{
    return this.http.delete<Veiculo>(this.API + veiculo.placa)
  }
}
