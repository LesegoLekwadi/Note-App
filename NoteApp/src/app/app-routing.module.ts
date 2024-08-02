import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './Component/categories/categories.component';
import { NoteListComponent } from './Component/note-list/note-list.component';

import { LandingPageComponent } from './Component/landing-page/landing-page.component';
import { IntroComponent } from './Component/intro/intro.component';
import { LoginComponent } from './Component/login/login.component';
import { EditNoteComponent } from './Component/edit-note/edit-note.component';
import { RegisterComponent } from './Component/register/register.component';

export const routes: Routes = [
  {path: 'landing', component: LandingPageComponent},
  {path: 'intro', component: IntroComponent},
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'notes', component: NoteListComponent },
  { path: 'edit', component: EditNoteComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
