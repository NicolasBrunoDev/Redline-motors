package com.redline.redline_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface userRepository extends JpaRepository<user, Long> {
    // Esto nos servirá para el Login después
    Optional<user> findByEmail(String email);
}