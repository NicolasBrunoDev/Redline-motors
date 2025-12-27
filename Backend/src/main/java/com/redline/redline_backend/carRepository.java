package com.redline.redline_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface carRepository extends JpaRepository<car, Long> {
    // Aquí heredamos todos los métodos como .save(), .findAll(), .delete(), etc.
}