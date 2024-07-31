// In the AppModule (e.g., app.module.ts)

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home/home.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { NoteListComponent } from './Component/note-list/note-list.component';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './Component/landing-page/landing-page.component';
import { LoginComponent } from './Component/login/login.component';
import { IntroComponent } from './Component/intro/intro.component';
import { RegisterComponent } from './Component/register/register.component';
import { EditNoteComponent } from './Component/edit-note/edit-note.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    NoteListComponent,
    LandingPageComponent,
    LoginComponent,
    IntroComponent,
    RegisterComponent,
    EditNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Add RouterModule to the imports array
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }