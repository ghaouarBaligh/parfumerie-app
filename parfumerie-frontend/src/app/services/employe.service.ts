import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeDTO } from '../models/employe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private baseUrl = 'http://localhost:8080/employe';

  constructor(private http: HttpClient) { }

  creer(employe: EmployeDTO): Observable<EmployeDTO> {
    return this.http.post<EmployeDTO>(`${this.baseUrl}/create`, employe);
  }

  modifier(id: number, employe: EmployeDTO): Observable<EmployeDTO> {
    return this.http.put<EmployeDTO>(`${this.baseUrl}/update/${id}`, employe);
  }

  consulterById(id: number): Observable<EmployeDTO> {
    return this.http.get<EmployeDTO>(`${this.baseUrl}/consult/${id}`);
  }

  consulter(): Observable<EmployeDTO[]> {
    return this.http.get<EmployeDTO[]>(`${this.baseUrl}/consult`);
  }

  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  
}
