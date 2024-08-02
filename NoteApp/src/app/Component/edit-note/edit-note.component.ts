import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';
import { Note } from 'src/app/note';
import { Category } from 'src/app/category'; // This should match your actual category structure

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent {
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noteService.getNoteById(Number(id)).subscribe((note: Note) => {
        this.note = note;
        console.log(this.note.category);
      });
    }
  }

  saveNote(): void {
    if (this.note.id) {  // Check if `id` is present
      this.noteService.updateNote(this.note.id, this.note).subscribe(() => {
        this.router.navigate(['/notes']);
      });
    } else {
      console.error('Note ID is required to update');
    }
  }


  cancel(): void {
    this.router.navigate(['/notes']);
  }

}