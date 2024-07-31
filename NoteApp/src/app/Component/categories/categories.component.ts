import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories = [
    { name: 'Design', notesCount: 15 },
    { name: 'Success', notesCount: 45 },
    { name: 'Scientific', notesCount: 29 },
    { name: 'Freelancer', notesCount: 19 }
  ];

}
