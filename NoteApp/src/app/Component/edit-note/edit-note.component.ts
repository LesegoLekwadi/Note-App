import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';
import { Note } from 'src/app/note';
import { Category } from 'src/app/category'; // This should match your actual category structure
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent {
  note: Note = {
    title: '',
    content: '',
    category: { id: 0, name: '', notesCount: 0 }, // Ensure this matches your category structure
    tags: '',
    id: 0,
    date: new Date(), // Initialize with current date or set a default value
    isNew: false
  };

  userId: number; // Assuming you have user authentication in place to get the user's ID

  constructor(
    private noteService: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userId = 1; // Replace with actual logic to fetch the current user's ID
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noteService.getNotesByUserId(this.userId).subscribe((notes: Note[]) => {
        this.note = notes.find(note => note.id === Number(id)) || this.note;
      });
    }
  }

  saveNote(): void {
    if (this.note.id) {
      this.noteService.updateNoteContent(this.note.id, this.note.title, this.note.content).subscribe(() => {
        Swal.fire({
          title: 'Note Updated',
          text: 'Your note has been updated successfully!',
          icon: 'success',
        });
        this.router.navigate(['/notes']);
      }, error => {
        console.error('Error updating note:', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error updating your note.',
          icon: 'error',
        });
      });
    } else {
      console.error('Note ID is required to update');
      Swal.fire({
        title: 'Error',
        text: 'Note ID is required to update.',
        icon: 'error',
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/notes']);
  }

}