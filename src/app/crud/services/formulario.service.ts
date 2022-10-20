import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../interfaces/crud.interface';
import { Pais } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private baseUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }
  getUsu():Observable<usuario[]>{
    return this.http.get<usuario[]>(`${this.baseUrl}/usuario`)
  }
  getUsuporId(usuario:usuario):Observable<usuario>{
    return this.http.get<usuario>(`${this.baseUrl}/usuario/${usuario.id}`)
  }
  agregarUsuario(usuario: usuario):Observable<usuario>{
    return this.http.post<usuario>(`${this.baseUrl}/usuario`,usuario)
  }
  actualizarUsuario(usuario:usuario):Observable<usuario>{
    return this.http.put<usuario>(`${this.baseUrl}/usuario/${usuario.id}`,usuario)
  }
  eliminar(usuario:usuario):Observable<usuario>{
    return this.http.delete<usuario>(`${this.baseUrl}/usuario/${usuario.id}`)
  }
  getpaises():Observable<Pais[]>{
    return this.http.get<Pais[]>('https://restcountries.com/v2/all?fields=name')
  }
}
