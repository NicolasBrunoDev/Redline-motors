package com.redline.redline_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Obtener todas las reservas de un auto específico para bloquear el calendario
    List<Booking> findByCarId(Long carId);

    // Query para verificar si hay solapamiento de fechas antes de guardar
    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.car.id = :carId AND " +
            "(:startDate < b.endDate AND :endDate > b.startDate)")
    boolean isCarOccupied(@Param("carId") Long carId,
                          @Param("startDate") java.time.LocalDate startDate,
                          @Param("endDate") java.time.LocalDate endDate);
}