import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:8080/api/notes';

  constructor(private http: HttpClient) { }

  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getNoteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateNote(note: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${note.id}`, note);
  }
  
}