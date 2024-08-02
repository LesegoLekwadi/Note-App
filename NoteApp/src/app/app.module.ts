// In the AppModule (e.g., app.module.ts)

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { NoteListComponent } from './Component/note-list/note-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './Component/landing-page/landing-page.component';
import { LoginComponent } from './Component/login/login.component';
import { IntroComponent } from './Component/intro/intro.component';
import { RegisterComponent } from './Component/register/register.component';
import { EditNoteComponent } from './Component/edit-note/edit-note.component';
import { HttpClientModule } from '@angular/common/http';
import { AddNoteComponent } from './Component/add-note/add-note.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    NoteListComponent,
    LandingPageComponent,
    LoginComponent,
    IntroComponent,
    RegisterComponent,
    EditNoteComponent,
    AddNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Add RouterModule to the imports array
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }