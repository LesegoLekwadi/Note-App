import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Note } from '../note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:8080/api/v1/notes'; 

  constructor(private http: HttpClient) { }

  // Method to add a new note
  addNote(userId: number, title: string, content: string, categoryId: number): Observable<number> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('title', title)
      .set('content', content)
      .set('category.id', categoryId.toString());
  
    return this.http.post<number>(`${this.apiUrl}/add`, null, { params });
  }
  

  // Method to fetch notes for a specific user
  getNotesByUserId(userId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}`)
      .pipe(
        catchError((error) => {
          console.error('Error getting notes:', error);
          return throwError(error);
        })
      );
  }

  // Method to delete a note by its ID
  deleteNoteById(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${noteId}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting note:', error);
          return throwError(error);
        })
      );
  }

  // Method to update a note's content
  updateNoteContent(noteId: number, title: string, content: string): Observable<any> {
    const params = new HttpParams()
      .set('noteId', noteId.toString())
      .set('title', title)
      .set('content', content);

    return this.http.put<any>(`${this.apiUrl}/update`, null, { params })
      .pipe(
        catchError((error) => {
          console.error('Error updating note:', error);
          return throwError(error);
        })
      );
  }

  addNotes(title: string, content: string, categoryId: number, userId: number): Observable<number> {
    const noteData = {
      title: title,
      content: content,
      category: {
        id: categoryId
      },
      user: {
        id: userId
      }
    };

    return this.http.post<number>(`${this.apiUrl}/add`, noteData);
  }

  // Method to delete all notes for a specific user
  deleteAllNotes(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user/${userId}/all`)
     .pipe(
        catchError((error) => {
          console.error('Error deleting all notes:', error);
          return throwError(error);
        })
      );
  }

  // Subject for sending and receiving updates
  private subject = new Subject<any>();


  getNoteUpdate(): Observable<any> {
    return this.subject.asObservable();
  }
  
}