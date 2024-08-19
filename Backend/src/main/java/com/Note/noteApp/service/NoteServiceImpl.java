package com.Note.noteApp.service;

import com.Note.noteApp.entity.Note;
import com.Note.noteApp.repository.NoteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteServiceImpl implements NoteService{

    @Autowired
    private NoteRepo noteRepository;

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Note save(Note note) {
        return noteRepository.save(note);
    }

    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }

    public Note updateNote(Long id, Note noteDetails) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));
        note.setTitle(noteDetails.getTitle());
        note.setContent(noteDetails.getContent());
        note.setCategory(noteDetails.getCategory());
//        note.setTags(noteDetails.getTags());
        note.setNew(noteDetails.isNew());
        return noteRepository.save(note);
    }

    public Note addNote(Note note) {
        // Add validation or business logic if needed
        return noteRepository.save(note);
    }

    public List<Note> getNotesByUserId(Long userId) {
        return noteRepository.findByUserId(userId);
    }
}

