package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private carRepository carRepository;

    // Obtener fechas ocupadas de un auto
    @GetMapping("/car/{carId}")
    public List<Booking> getBookingsByCar(@PathVariable Long carId) {
        return bookingRepository.findByCarId(carId);
    }

    // Crear una nueva reserva
    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        // Validar si el auto está disponible en esas fechas (Doble check de seguridad)
        boolean occupied = bookingRepository.isCarOccupied(
                booking.getCar().getId(),
                booking.getStartDate(),
                booking.getEndDate()
        );

        if (occupied) {
            return ResponseEntity.badRequest().body("El vehículo ya está reservado en esas fechas.");
        }

        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }
}
