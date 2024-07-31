import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent{

  notes = [
    {
      title: 'How To Draw A Professional Wireframe?',
      description: 'For Wireframe Design, You Need To Have A Pen And Paper With You, And Using These Two, You Can Design The Idea You Want On Paper For Web Or Mobile, Just Learn....',
      tags: ['Design', 'Wireframe'],
      date: '2020/05/09',
      new: true
    },
    {
      title: 'Ways To Succeed Early',
      description: '...',
      tags: ['Succeed', 'Goals'],
      date: '2020/05/09',
      new: false
    },
    {
      title: 'Scientific Facts Of Space',
      description: '...',
      tags: ['Scientific', 'Space'],
      date: '2020/05/09',
      new: false
    }
  ];


}
