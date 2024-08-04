package com.Note.Backend.exception;

public class IncorrectPasswordException extends RuntimeException{
    public IncorrectPasswordException(String message) {
        super(message);
    }
}