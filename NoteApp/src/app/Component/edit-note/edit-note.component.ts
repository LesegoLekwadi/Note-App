import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';
import { Note } from 'src/app/note';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent {
  note: Note = {
    title: '',
    content: '',
    category: '',
    tags: ''
  };

  constructor(
    private noteService: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noteService.getNoteById(id).subscribe((note: Note) => {
        this.note = note;
      });
    }
  }

  saveNote(): void {
    this.noteService.updateNote(this.note).subscribe(() => {
      this.router.navigate(['/notes']);
    });
  }

  cancel(): void {
    this.router.navigate(['/notes']);
  }
}
