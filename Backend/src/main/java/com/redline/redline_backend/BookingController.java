package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private carRepository carRepository;

    @Autowired
    private userRepository userRepository;

    @Autowired
    private EmailService emailService;

    // Obtener fechas ocupadas de un auto
    @GetMapping("/car/{carId}")
    public List<Booking> getBookingsByCar(@PathVariable Long carId) {
        return bookingRepository.findByCarId(carId);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> payload) {
        try {
            // Extraer datos del JSON
            Long carId = Long.valueOf(payload.get("carId").toString());
            Long userId = Long.valueOf(payload.get("userId").toString());
            LocalDate start = LocalDate.parse(payload.get("startDate").toString());
            LocalDate end = LocalDate.parse(payload.get("endDate").toString());

            // Buscar las entidades reales
            car carEntity = carRepository.findById(carId).orElseThrow();
            user userEntity = userRepository.findById(userId).orElseThrow();

            // Crear la reserva vinculando AMBOS objetos
            Booking booking = new Booking();
            booking.setCar(carEntity);
            booking.setUser(userEntity);
            booking.setStartDate(start);
            booking.setEndDate(end);

            bookingRepository.save(booking);

            emailService.sendBookingConfirmation(
                    userEntity.getEmail(),
                    userEntity.getName(),
                    carEntity.getName(),
                    start.toString(),
                    end.toString()
            );

            return ResponseEntity.ok("Reserva creada y correo enviado con éxito");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Obtener historial de un usuario específico
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getByUserId(@PathVariable Long userId) {
        List<Booking> userBookings = bookingRepository.findByUserIdOrderByStartDateDesc(userId);
        return ResponseEntity.ok(userBookings);
    }
}
