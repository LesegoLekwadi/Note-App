import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';
import { Note } from 'src/app/note';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent{

  notes: Note[] = [];
  filteredNotes: Note[] = [];
  searchQuery: string = '';
  searchInputVisible: boolean = false;

  userId: number; // Assuming you have user authentication in place to get the user's ID

  constructor(private notesService: NotesService, private router: Router) {
    this.userId = 1; // Replace with actual logic to fetch the current user's ID
  }
  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.notesService.getNotesByUserId(this.userId).subscribe(
      (data: Note[]) => {
        this.notes = data;
        this.filteredNotes = this.notes;
      },
      error => {
        console.error('Error fetching notes:', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error fetching the notes.',
          icon: 'error',
        });
      }
    );
  }


  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  toggleSearchInput(): void {
    this.searchInputVisible = !this.searchInputVisible;
    // Optionally clear the search query when toggling off
    if (!this.searchInputVisible) {
      this.searchQuery = '';
      this.filteredNotes = this.notes;
    }
  }

  searchNotes(): void {
    if (this.searchQuery.trim()) {
      this.filteredNotes = this.notes.filter(note =>
        note.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredNotes = this.notes;
    }
  }
  
  goToNoteDetail(noteId: number): void {
    this.router.navigate(['/edit', noteId]);
  }
 
}
