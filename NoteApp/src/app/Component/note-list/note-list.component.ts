import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';
import { Note } from 'src/app/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent{

  notes: any[] = [];
  filteredNotes: Note[] = [];
  searchQuery: string = '';
  searchInputVisible: boolean = false;

  constructor(private notesService: NotesService,private router: Router) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes().subscribe(data => {
      this.notes = data;
      this.filteredNotes = this.notes; 
    });
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
