import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';
import { Note } from 'src/app/note';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
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
    private router: Router
  ) {
    this.userId = 1; // Replace with actual logic to fetch the current user's ID
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  addNote(): void {
    if (this.note.title && this.note.content) {
      this.noteService.addNote(this.userId, this.note.title, this.note.content).subscribe(
        () => {
          Swal.fire({
            title: 'Note Added',
            text: 'Your note has been added successfully!',
            icon: 'success',
          });
          this.router.navigate(['/notes']);
        },
        error => {
          console.error('Error adding note:', error);
          Swal.fire({
            title: 'Error',
            text: 'There was an error adding your note.',
            icon: 'error',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please provide a title and content for the note.',
        icon: 'warning',
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/notes']);
  }
}
