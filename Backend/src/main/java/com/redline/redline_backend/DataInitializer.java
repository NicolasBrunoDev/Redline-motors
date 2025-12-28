package com.redline.redline_backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(userRepository userRepository, carRepository carRepository) {
        return args -> {
            // 1. INICIALIZAR USUARIOS
            if (userRepository.count() == 0) { // Evita duplicar si reinicias
                user admin = new user();
                admin.setName("Admin Redline");
                admin.setEmail("admin@redline.com");
                admin.setPassword("admin123");
                admin.setRole("ADMIN");

                user normalUser = new user();
                normalUser.setName("Juan Perez");
                normalUser.setEmail("juan@correo.com");
                normalUser.setPassword("user123");
                normalUser.setRole("USER");

                userRepository.save(admin);
                userRepository.save(normalUser);
                System.out.println("Usuarios de prueba creados.");
            }

            // 2. INICIALIZAR AUTOS DE ALQUILER
            if (carRepository.count() == 0) {
                // Usando el constructor con parámetros que creamos antes:
                carRepository.save(new car("Nissan Skyline R34", "Nissan", "200$", "https://images.unsplash.com/photo-1743308283954-f391790c418e?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", true));
                carRepository.save(new car("Porsche 911 GT3", "Porsche", "450$", "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", true));
                carRepository.save(new car("Lamborghini Huracan", "Lamborghini", "800$", "https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", true));

                System.out.println("Flota de autos inicializada.");
            }

            System.out.println("Base de datos Redline Motors lista :)");
        };
    }
}