import { Component } from '@angular/core';
import { Note } from '../notes/notes';
import { NotesService } from '../Services/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {

  notes: Note[];

  constructor(private notesService: NotesService) {
    this.notes = this.notesService.getNotes();
  }

}
