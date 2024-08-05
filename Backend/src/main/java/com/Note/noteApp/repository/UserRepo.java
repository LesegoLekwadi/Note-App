package com.Note.noteApp.repository;

import com.Note.noteApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    User save(User user);

    boolean existsByEmail(String email);

    void save(Optional<User> user);
}
