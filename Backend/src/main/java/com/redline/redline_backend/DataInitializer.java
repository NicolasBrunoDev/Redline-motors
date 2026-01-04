package com.redline.redline_backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(userRepository userRepository,
                                   carRepository carRepository,
                                   CategoryRepository categoryRepository) {
        return args -> {

            // --- INICIALIZAR CATEGORÍAS ---
            if (categoryRepository.count() == 0) {
                categoryRepository.save(new Category("Urbano"));
                categoryRepository.save(new Category("Deportivo"));
                categoryRepository.save(new Category("Economico"));
                categoryRepository.save(new Category("Lujo"));
            }

            System.out.println("Categorías Generadas Exitosamente.");

            // --- INICIALIZAR USUARIOS --- (Omitido por brevedad, mantenlo igual)
            if (userRepository.count() == 0) {
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

            System.out.println("Usuarios de prueba creados.");
            // --- INICIALIZAR AUTOS ---
            if (carRepository.count() == 0) {

                // 1. Crear Nissan Skyline
                car nissan = new car("Nissan Skyline R34", "Nissan", "200$", "Deportivo",
                        List.of("https://images.unsplash.com/photo-1743308283954-f391790c418e",
                                "https://images.unsplash.com/photo-1611312752514-9439fdba223d"), true);

                nissan.setFeatures(List.of(
                        new CarFeature("Color", "Azul Bayside"),
                        new CarFeature("Transmisión", "Manual"),
                        new CarFeature("Motor", "RB26DETT")
                ));
                carRepository.save(nissan);

                // 2. Crear Porsche 911
                car porsche = new car("Porsche 911 GT3", "Porsche", "450$", "Lujo",
                        List.of("https://images.unsplash.com/photo-1611821064430-0d40291d0f0b",
                                "https://images.unsplash.com/photo-1716738703767-e277c57b2a90"), true);

                porsche.setFeatures(List.of(
                        new CarFeature("Color", "Negro Onix"),
                        new CarFeature("Potencia", "510 HP")
                ));
                carRepository.save(porsche);

                // 3. Crear Lamborghini
                car lambo = new car("Lamborghini Huracan", "Lamborghini", "800$", "Deportivo",
                        List.of("https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd",
                                "https://images.unsplash.com/photo-1621285932053-9da9b27778cf"), true);

                lambo.setFeatures(List.of(
                        new CarFeature("Color", "Blanco Rayo"),
                        new CarFeature("Tracción", "AWD")
                ));
                carRepository.save(lambo);

                System.out.println("Flota de autos con características inicializada.");
            }
        };
    }
}