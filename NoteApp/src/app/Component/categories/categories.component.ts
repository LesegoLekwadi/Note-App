import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/Services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: any[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
      
      
    });
  }

  addCategory() {
    const newCategory = {
      name: 'New Category',
      notesCount: 0
    };
    this.categoriesService.addCategory(newCategory).subscribe(() => {
      this.getCategories();
    });
  }

}
