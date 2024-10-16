import { Condutor } from './../model/condutor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CondutorService {

  constructor(private http: HttpClient) { }

  private readonly API = 'https://consumoback.onrender.com/condutores/'

  public cadastrarCondutor(condutor: Condutor): Observable<Condutor>{
    return this.http.post<Condutor>(this.API, condutor);
  }

  public listarCondutor(): Observable<Condutor[]>{
    return this.http.get<Condutor[]>(this.API);
  }

  public editarCondutor(condutor: Condutor): Observable<Condutor>{
    return this.http.put<Condutor>(this.API + condutor.id, condutor);
  }

}
