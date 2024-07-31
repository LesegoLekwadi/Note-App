import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

    private baseUrl = 'http://localhost:8080/api/notes';
    
    constructor(private http: HttpClient) { }
  
    getNotes(): Observable<any> {
      return this.http.get(`${this.baseUrl}`);
    }
  
    createOrUpdate(note: any): Observable<any> {
      return this.http.post(`${this.baseUrl}`, note);
    }
  
    delete(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }
  
}