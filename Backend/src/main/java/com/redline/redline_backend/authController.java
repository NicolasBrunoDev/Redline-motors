package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class authController {

    @Autowired
    private userRepository userRepository;

    @PostMapping("/register")
    public String register(@RequestBody user user) {
        userRepository.save(user);
        return "Usuario " + user.getName() + " creado con éxito";
    }

    // --- NUEVO MÉTODO PARA LOGIN ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody user loginData) {
        // 1. Buscar al usuario por el email que viene del frontend
        Optional<user> userFound = userRepository.findByEmail(loginData.getEmail());

        // 2. Verificar si existe y si la contraseña coincide
        if (userFound.isPresent() && userFound.get().getPassword().equals(loginData.getPassword())) {
            // Si es correcto, devolvemos el objeto usuario completo
            return ResponseEntity.ok(userFound.get());
        } else {
            // Si falla, devolvemos un error 401 = (No autorizado)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email o contraseña incorrectos");
        }
    }
}