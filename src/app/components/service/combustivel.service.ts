import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Combustivel } from '../model/combustivel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CombustivelService {

  constructor(private http: HttpClient) { }

  private readonly API = 'https://consumoback.onrender.com/combustivel/'

  public registrarCombustivel(combustivel: Combustivel): Observable<Combustivel>{
    return this.http.post<Combustivel>(this.API, combustivel);
  }

  public listarCombustivel(): Observable<Combustivel[]>{
    return this.http.get<Combustivel[]>(this.API);
  }

  public deletarCombustivel(combustivel: Combustivel): Observable<Combustivel>{
    return this.http.delete<Combustivel>(this.API + combustivel.id);
  }
}
