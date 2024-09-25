import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfume } from '../../models/model.perfume';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfumesService {
 
  constructor(private HttpClient:HttpClient) {}
  
  get():Observable<Perfume[]>{
    return this.HttpClient.get<Perfume[]>(`https://localhost:44306///api/perfumes`)
  }
  getById(id:number):Observable<Perfume>{
    return this.HttpClient.get<Perfume>(`https://localhost:44306///api/perfumes/${id}`)
  }
  getByName(nome:string):Observable<Perfume[]>{
    return this.HttpClient.get<Perfume[]>(`https://localhost:44306///api/perfumes?nome=${nome}`)
  }
  put(perfume:Perfume):Observable<Perfume>{
    return this.HttpClient.put<Perfume>(`https://localhost:44306///api/perfumes/${perfume.Id}`, perfume)
  }
  post(perfume:Perfume):Observable<Perfume>{
    return this.HttpClient.post<Perfume>(`https://localhost:44306///api/perfumes`, perfume)
  }
  delete(id:number):Observable<Perfume>{
    return this.HttpClient.delete<Perfume>(`https://localhost:44306///api/perfumes/${id}`)
  }
}