import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    category: { id: 152, name: '', notesCount: 0 }, // Category ID should be set based on selected category
    tags: '',
    id: 1,
    date: new Date(),
  };

  userId: number;

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
    if (this.note.title && this.note.content && this.note.category.name) {
      // Ideally, you'd fetch the category ID based on the category name.
      // For now, if the category name is hardcoded or mapped directly, set the ID accordingly:
      // this.note.category.id = getCategoryIdFromName(this.note.category.name);

      this.noteService.addNotes(this.note.title, this.note.content, 152, 1).subscribe(
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
        text: 'Please provide a title, content, and select a category for the note.',
        icon: 'warning',
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/notes']);
  }
}
