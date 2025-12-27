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

                user normalUser = new user();
                normalUser.setName("Juan Perez");
                normalUser.setEmail("juan@correo.com");
                normalUser.setPassword("user123");

                userRepository.save(admin);
                userRepository.save(normalUser);
                System.out.println("Usuarios de prueba creados.");
            }

            // 2. INICIALIZAR AUTOS DE ALQUILER
            if (carRepository.count() == 0) {
                // Usando el constructor con parámetros que creamos antes:
                carRepository.save(new car("Nissan Skyline R34", "Nissan", "200€", "https://placehold.co/400", true));
                carRepository.save(new car("Porsche 911 GT3", "Porsche", "450€", "https://placehold.co/400", true));
                carRepository.save(new car("Lamborghini Huracan", "Lamborghini", "800€", "https://placehold.co/400", true));

                System.out.println("Flota de autos inicializada.");
            }

            System.out.println("Base de datos Redline Motors lista :)");
        };
    }
}