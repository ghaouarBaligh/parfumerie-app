import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FournisseurDTO } from '../models/fournisseur.model';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private baseUrl = 'http://localhost:8080/fournisseur';
  
    constructor(private http: HttpClient) { }
  
    creer(employe: FournisseurDTO): Observable<FournisseurDTO> {
      return this.http.post<FournisseurDTO>(`${this.baseUrl}/create`, employe);
    }
  
    modifier(id: number, employe: FournisseurDTO): Observable<FournisseurDTO> {
      return this.http.put<FournisseurDTO>(`${this.baseUrl}/update/${id}`, employe);
    }
  
    consulterById(id: number): Observable<FournisseurDTO> {
      return this.http.get<FournisseurDTO>(`${this.baseUrl}/consult/${id}`);
    }
  
    consulter(): Observable<FournisseurDTO[]> {
      return this.http.get<FournisseurDTO[]>(`${this.baseUrl}/consult`);
    }
  
    supprimer(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }
}
