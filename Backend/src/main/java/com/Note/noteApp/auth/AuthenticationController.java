package com.Note.noteApp.auth;

import com.Note.noteApp.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmailExists(
            @RequestParam String email
    ) {
        boolean exists = service.emailExists(email);
        return ResponseEntity.ok(exists);
    }


    @PutMapping("/update/{userId}")
    public ResponseEntity<Void> updateUser(
            @PathVariable Integer userId,
            @RequestBody UpdateUserRequest request
    ) {
        service.updateUser(userId, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<User> getUserById(
            @PathVariable Integer userId
    ) {
        com.Note.noteApp.entity.User user = service.getUserById(userId);
        return ResponseEntity.ok(user);
    }
    @PutMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(
            @RequestBody ResetPasswordRequest request
    ) {
        service.resetPassword(request.getEmail(), request.getNewPassword());
        return ResponseEntity.ok().build();
    }
}
