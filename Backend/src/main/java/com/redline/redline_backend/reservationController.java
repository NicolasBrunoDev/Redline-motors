package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*") // Permite que tu React se conecte sin bloqueos de seguridad
public class reservationController {

    @Autowired
    private reservationRepository reservationRepository;

    // 1. Crear una nueva reserva
    @PostMapping("/create")
    public ResponseEntity<?> createReservation(@RequestBody reservation res) {
        try {
            // Guardamos la reserva que viene del frontend
            reservation savedReservation = reservationRepository.save(res);
            return ResponseEntity.ok("Reserva creada con éxito. ID: " + savedReservation.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al procesar la reserva: " + e.getMessage());
        }
    }

    // 2. Listar todas las reservas (Útil para el panel de ADMIN)
    @GetMapping("/all")
    public List<reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // 3. (Opcional) Obtener reservas de un usuario específico
    // Esto servirá si luego quieres mostrar "Mis Reservas" en el perfil
}