import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponent } from './note/note.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NoteListComponent } from './note-list/note-list.component';

const routes: Routes = [

  {path:'note', component:NoteComponent},
  {path:'details', component:NoteDetailsComponent},
  {path:'list', component:NoteListComponent},
  { path: '', redirectTo: 'note', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
