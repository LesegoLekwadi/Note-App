import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent {

  note: any = { title: '', content: '' };
  
  constructor(
    private route: ActivatedRoute,
    private noteService: NotesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
if (id) {
  this.noteService.getNotes().subscribe(data => {
    this.note = data.find((note: { id: number; }) => note.id === +id);
  });
  }
}

  save() {
    this.noteService.createOrUpdate(this.note).subscribe(() => {
      this.router.navigate(['/notes']);
    });
  }

}
