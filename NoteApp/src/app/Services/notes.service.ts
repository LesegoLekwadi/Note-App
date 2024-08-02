import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private baseUrl = 'http://localhost:8080/api/v1/notes'; 

  constructor(private http: HttpClient) { }

  // Fetch all notes
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }

  // Fetch a single note by its ID
  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/${id}`);
  }

  // Create a new note
  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, note, this.httpOptions());
  }

  // Update an existing note by its ID
  updateNote(id: number, note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/${id}`, note, this.httpOptions());
  }

  // Helper method to set HTTP options
  
  private httpOptions() {
    const token = 'YOUR_AUTH_TOKEN';
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
  
}