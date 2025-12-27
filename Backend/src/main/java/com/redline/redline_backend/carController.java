package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
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
}