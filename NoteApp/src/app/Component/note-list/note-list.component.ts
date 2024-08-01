import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent{

  notes: any[] = [];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes().subscribe(data => {
      this.notes = data;
    });
  }
  
  


}
