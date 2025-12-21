package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Para que tu web se pueda conectar sin errores
public class authController {

    @Autowired
    private userRepository userRepository;

    @PostMapping("/register")
    public String register(@RequestBody user user) {
        userRepository.save(user); // ¡Esto guarda al usuario en H2!
        return "Usuario " + user.getName() + " creado con éxito";
    }
}