package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cars")

public class carController {

    @Autowired
    private carRepository carRepository;

    // 1. Obtener todos los autos
    @GetMapping("/all")
    public List<car> getCars() {
        return carRepository.findAll();
    }

    //2. Crear auto (IQ infinito)
    @PostMapping("/create")
    public car addCar(@RequestBody car newCar) {
        return carRepository.save(newCar);
    }

    //3. Eliminar un auto
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
}