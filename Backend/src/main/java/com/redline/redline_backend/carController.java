package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import com.redline.redline_backend.Review;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.OPTIONS
})
public class carController {

    @Autowired
    private carRepository carRepository;

    // --- CORRECCIÓN: Inyectamos el repositorio de usuarios para que el toggle funcione ---
    @Autowired
    private userRepository userRepository;

    // 1. Obtener todos los autos
    @GetMapping("/all")
    public List<car> getCars() {
        return carRepository.findAll();
    }

    // 2. Crear auto
    @PostMapping("/create")
    public car addCar(@RequestBody car newCar) {
        return carRepository.save(newCar);
    }

    // 3. Eliminar un auto
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        try {
            if (carRepository.existsById(id)) {
                carRepository.deleteById(id);
                return ResponseEntity.ok().body("Vehículo eliminado correctamente");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El vehículo no existe");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en el servidor: " + e.getMessage());
        }
    }

    // 4. Actualizar auto
    @PutMapping("/update/{id}")
    public ResponseEntity<car> updateCar(@PathVariable Long id, @RequestBody car carDetails) {
        return carRepository.findById(id).map(car -> {
            car.setName(carDetails.getName());
            car.setBrand(carDetails.getBrand());
            car.setPriceDay(carDetails.getPriceDay());
            car.setCategory(carDetails.getCategory());
            car.setImages(carDetails.getImages());
            carRepository.save(car);
            return ResponseEntity.ok(car);
        }).orElse(ResponseEntity.notFound().build());
    }

    // 5. Estado de disponibilidad
    @PatchMapping("/update-availability/{id}")
    public ResponseEntity<?> updateAvailability(@PathVariable Long id, @RequestBody Map<String, Boolean> payload) {
        return carRepository.findById(id).map(c -> {
            c.setAvailable(payload.get("available"));
            carRepository.save(c);
            return ResponseEntity.ok().body("Estado actualizado");
        }).orElse(ResponseEntity.notFound().build());
    }

    // 6. Lógica de Favoritos (Toggle)
    @PostMapping("/{carId}/favorite")
    public ResponseEntity<?> toggleFavorite(@PathVariable Long carId, @RequestParam Long userId) {
        // Buscamos el vehículo de forma tradicional
        car vehicle = carRepository.findById(carId).orElse(null);
        if (vehicle == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehículo no encontrado");
        }

        // Buscamos el usuario de forma tradicional
        user user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }

        // Lógica de Toggle
        boolean isNowFavorite;
        if (user.getFavoriteCars().contains(vehicle)) {
            user.getFavoriteCars().remove(vehicle);
            isNowFavorite = false;
        } else {
            user.getFavoriteCars().add(vehicle);
            isNowFavorite = true;
        }

        // Guardamos los cambios
        userRepository.save(user);

        return ResponseEntity.ok().body(Map.of(
                "isFavorite", isNowFavorite,
                "message", "Favorito actualizado con éxito"
        ));
    }

    // Inyectamos el servicio que creamos con la lógica del promedio
    @Autowired
    private CarService carService;

    // 7. Publicar una puntuación
    @PostMapping("/{id}/reviews")
    public ResponseEntity<?> addReview(@PathVariable Long id, @RequestBody Review review) {
        try {
            // El servicio se encarga de:
            // 1. Buscar el auto
            // 2. Guardar la reseña
            // 3. Recalcular promedio y total
            carService.addReviewToCar(id, review);

            return ResponseEntity.ok().body(Map.of(
                    "message", "¡Gracias por tu valoración!",
                    "status", "success"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al procesar la reseña: " + e.getMessage());
        }
    }

    // 8. Obtener un auto específico por su ID
    @GetMapping("/{id}")
    public ResponseEntity<car> getCarById(@PathVariable Long id) {
        return carRepository.findById(id)
                .map(car -> ResponseEntity.ok().body(car))
                .orElse(ResponseEntity.notFound().build());
    }

}