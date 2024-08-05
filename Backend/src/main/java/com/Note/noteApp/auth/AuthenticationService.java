package com.Note.noteApp.auth;

import com.Note.noteApp.entity.Role; // Import the Role enum
import com.Note.noteApp.entity.User;
import com.Note.noteApp.exception.UserAlreadyExistsException;
import com.Note.noteApp.exception.UserNotFoundException;
import com.Note.noteApp.repository.UserRepo;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor

public class AuthenticationService {

    private final UserRepo repository;
    private final PasswordEncoder passwordEncoder;
    private final com.Note.noteApp.config.JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void updateUser(Integer userId, UpdateUserRequest request) {
        User user = repository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // Update all fields based on the request
        user.setEmail(request.getEmail());

        // Encode and set password if provided
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        repository.save(user);
    }

    public boolean emailExists(String email) {
        return repository.existsByEmail(email);
    }

    public User getUserById(Integer userId) {
        return repository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public AuthenticationResponse register(RegisterRequest request) {

        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email address already in use");
        }

        var user = User.builder()
//                .username(request.)

                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.User) // Ensure this matches the enum value
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateTokenWithId(user, Math.toIntExact(user.getId()));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

//        var user = repository.findByEmail(request.getEmail())
//                .orElseThrow(() -> new RuntimeException("User not found"));


        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        var jwtToken = jwtService.generateTokenWithId(user, Math.toIntExact(user.getId()));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }



    public void resetPassword(String email, String newPassword) {
        // Find the user by their email
        Optional<User> userOptional = repository.findByEmail(email);

        // Check if user exists
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User with email " + email + " not found");
        }

        // Get the actual User object from Optional
        User user = userOptional.get();

        // Encode the new password
        String encodedPassword = passwordEncoder.encode(newPassword);

        // Update the user's password
        user.setPassword(encodedPassword);

        // Save the updated user object
        repository.save(user);
    }
}

