import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitDTO } from '../models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'http://localhost:8080/product';

  constructor(private http: HttpClient) { }

  create(produit: ProduitDTO): Observable<ProduitDTO> {
    return this.http.post<ProduitDTO>(`${this.apiUrl}/create`, produit);
  }

  update(id: number, produit: ProduitDTO): Observable<ProduitDTO> {
    return this.http.put<ProduitDTO>(`${this.apiUrl}/update/${id}`, produit);
  }
  
  getAll(): Observable<ProduitDTO[]> {
    return this.http.get<ProduitDTO[]>(`${this.apiUrl}/consult`);
  }

  getById(id: number): Observable<ProduitDTO> {
    return this.http.get<ProduitDTO>(`${this.apiUrl}/consult/${id}`);
  }
  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
