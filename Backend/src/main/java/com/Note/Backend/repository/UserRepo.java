package com.Note.Backend.repository;

import com.Note.Backend.entity.User;
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
