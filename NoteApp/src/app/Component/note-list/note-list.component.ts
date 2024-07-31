import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent{
createNote() {
throw new Error('Method not implemented.');
}
editNote(_t7: any) {
throw new Error('Method not implemented.');
}

  notes: any[] = [];
  
  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getNotes().subscribe((data: any[]) => {
      this.notes = data;
    });
  }

  deleteNote(id: number) {
    this.noteService.delete(id).subscribe(() => {
      this.loadNotes();
    });
  }

}
