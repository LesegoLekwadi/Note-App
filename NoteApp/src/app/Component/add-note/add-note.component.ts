import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';
import { Note } from 'src/app/note';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {
  note: Note = {
    title: '',
    content: '',
    category: { id: 0, name: '', notesCount: 0 }, // This should match your actual category structure
    tags: '',
    id: 0
  };

  constructor(
    private noteService: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
 
  }

  addNote(): void {
    this.noteService.createNote(this.note).subscribe(() => {
      this.router.navigate(['/notes']);
    }, error => {
      console.error('Error adding note:', error);
    });
  }

  cancel(): void {
    this.router.navigate(['/notes']);
  }
}
