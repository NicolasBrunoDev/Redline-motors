package com.redline.redline_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface userRepository extends JpaRepository<user, Long> {
    Optional<user> findByEmail(String email); //Pense que seria mas rapido que buscarlos por ID
}