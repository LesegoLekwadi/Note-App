import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
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

  addNote(note: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, note).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Log error to console or service
    console.error('An error occurred:', error.message);
    // Transform error if needed
    return throwError(() => new Error('Something went wrong; please try again later.'));
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