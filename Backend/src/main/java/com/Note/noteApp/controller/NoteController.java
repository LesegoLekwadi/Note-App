package com.Note.noteApp.controller;

import com.Note.noteApp.entity.Note;
import com.Note.noteApp.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @GetMapping("/{id}")
    public Optional<Note> getNoteById(@PathVariable Long id) {
        return noteService.getNoteById(id);
    }

    @PutMapping("/{id}")
    public Note updateNote(@RequestBody Note note, @PathVariable Long id) {
        return noteService.updateNote(id, note);
    }

    @PostMapping("/create")
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        try {
            Note createdNote = noteService.save(note);
            return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Note> addNote(@RequestBody Note note) {
        try {
            Note createdNote = noteService.addNote(note);
            return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}