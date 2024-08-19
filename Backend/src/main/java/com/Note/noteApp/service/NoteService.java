package com.Note.noteApp.service;

import com.Note.noteApp.entity.Note;

import java.util.List;
import java.util.Optional;

public interface NoteService {

    public List<Note> getAllNotes();
    public Note save(Note note);
    public Optional<Note> getNoteById(Long id);
    public Note updateNote(Long id, Note noteDetails);
    public Note addNote(Note note);
    List<Note> getNotesByUserId(Long userId);
}
