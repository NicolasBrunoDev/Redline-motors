package com.redline.redline_backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(userRepository repository) {
        return args -> {
            // Crear Usuario Administrador
            user admin = new user();
            admin.setName("Admin Redline");
            admin.setEmail("admin@redline.com");
            admin.setPassword("admin123");
            // Si luego añades un campo "role", aquí pondrías admin.setRole("ADMIN");

            // Crear Usuario Normal
            user user = new user();
            user.setName("Juan Perez");
            user.setEmail("juan@correo.com");
            user.setPassword("user123");

            // Guardarlos en H2
            repository.save(admin);
            repository.save(user);

            System.out.println("Base de datos inicializada con usuarios de prueba :)");
        };
    }
}