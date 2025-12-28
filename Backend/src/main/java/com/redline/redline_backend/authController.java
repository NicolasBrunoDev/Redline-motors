package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/api/auth")
public class authController {

    @Autowired
    private userRepository userRepository;

    @PostMapping("/register")
    public String register(@RequestBody user user) {
        userRepository.save(user);
        return "Usuario " + user.getName() + " creado con éxito";
    }

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
    @GetMapping("/test")
    public String test(){
        return "El servidor funcionan normalmente";
    }
}