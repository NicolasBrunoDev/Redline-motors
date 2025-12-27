package com.redline.redline_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface reservationRepository extends JpaRepository<reservation, Long> {
    // Aquí podrías añadir métodos como:
    // List<reservation> findByUserId(Long userId);
}