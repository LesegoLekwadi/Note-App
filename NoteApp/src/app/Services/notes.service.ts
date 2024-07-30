import { Injectable } from '@angular/core';
import { Note } from '../notes/notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Note[] = [];
  private nextId = 1;

  constructor() { }

  getNotes(): Note[] {
    return this.notes;
  }

  getNoteById(id: number): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  addNote(note: Note): void {
    note.id = this.nextId++;
    note.createdDate = new Date();
    this.notes.push(note);
  }

  updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex(note => note.id === updatedNote.id);
    if (index > -1) {
      this.notes[index] = updatedNote;
    }
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}
