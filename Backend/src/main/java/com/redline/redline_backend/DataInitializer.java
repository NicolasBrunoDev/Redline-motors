package com.redline.redline_backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Configuration
public class DataInitializer {

    @Bean
    @Transactional
    CommandLineRunner initDatabase(userRepository userRepository,
                                   carRepository carRepository,
                                   CategoryRepository categoryRepository,
                                   CarService carService) {
        return args -> {

            // --- INICIALIZAR CATEGORÍAS ---
            if (categoryRepository.count() == 0) {
                categoryRepository.save(new Category("Urbano"));
                categoryRepository.save(new Category("Deportivo"));
                categoryRepository.save(new Category("Economico"));
                categoryRepository.save(new Category("Lujo"));
            }
            System.out.println("Categorías Creadas exitosamente.");

            // --- INICIALIZAR USUARIOS ---
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
            }

            System.out.println("Usuarios de prueba generados.");

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
                addRandomReviews(carService, nissan.getId());

                // 2. Crear Porsche 911
                car porsche = new car("Porsche 911 GT3", "Porsche", "450$", "Lujo",
                        List.of("https://images.unsplash.com/photo-1611821064430-0d40291d0f0b",
                                "https://images.unsplash.com/photo-1716738703767-e277c57b2a90"), true);

                porsche.setFeatures(List.of(
                        new CarFeature("Color", "Negro Onix"),
                        new CarFeature("Potencia", "510 HP")
                ));
                carRepository.save(porsche);
                addRandomReviews(carService, porsche.getId());

                // 3. Crear Lamborghini
                car lambo = new car("Lamborghini Huracan", "Lamborghini", "800$", "Deportivo",
                        List.of("https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd",
                                "https://images.unsplash.com/photo-1621285932053-9da9b27778cf"), true);

                lambo.setFeatures(List.of(
                        new CarFeature("Color", "Blanco Rayo"),
                        new CarFeature("Tracción", "AWD")
                ));
                carRepository.save(lambo);
                addRandomReviews(carService, lambo.getId());

                // --- CATEGORÍA: DEPORTIVO ---

                // 4. Ferrari 488 Pista
                car ferrari = new car("Ferrari 488 Pista", "Ferrari", "950$", "Deportivo",
                        List.of("https://images.unsplash.com/photo-1654442595448-bbb4d689f9f6?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1654442594945-480e134b2985?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmVycmFyaSUyMDQ4OCUyMHBpc3RhfGVufDB8fDB8fHww"), true);
                ferrari.setFeatures(List.of(
                        new CarFeature("Motor", "V8 Twin-Turbo"),
                        new CarFeature("0-100 km/h", "2.8s")
                ));
                carRepository.save(ferrari);
                addRandomReviews(carService, ferrari.getId());


                // 5. McLaren 720S
                car mclaren = new car("McLaren 720S", "McLaren", "900$", "Deportivo",
                        List.of("https://images.unsplash.com/photo-1638730558978-18941cc086ad?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1728522298299-bf2476f378f1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                mclaren.setFeatures(List.of(
                        new CarFeature("Chasis", "Monocasco Carbono"),
                        new CarFeature("Vel. Máxima", "341 km/h")
                ));
                carRepository.save(mclaren);
                addRandomReviews(carService, mclaren.getId());

                // --- CATEGORÍA: LUJO ---

                // 6. Rolls-Royce Phantom
                car rolls = new car("Rolls-Royce Phantom", "Rolls-Royce", "1200$", "Lujo",
                        List.of("https://images.unsplash.com/photo-1689010088367-af31b12b52d9?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1720828981697-e78c6d4a55c7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                rolls.setFeatures(List.of(
                        new CarFeature("Interior", "Cuero/Madera"),
                        new CarFeature("Confort", "Suspensión Aire")
                ));
                carRepository.save(rolls);
                addRandomReviews(carService, rolls.getId());

                // 7. Bentley Continental GT
                car bentley = new car("Bentley Continental GT", "Bentley", "850$", "Lujo",
                        List.of("https://images.unsplash.com/photo-1678026552738-d7b43112b9fd?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1678026548060-1448fb601299?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fEJlbnRsZXklMjBDb250aW5lbnRhbCUyMEdUfGVufDB8fDB8fHww"), true);
                bentley.setFeatures(List.of(
                        new CarFeature("Motor", "W12"),
                        new CarFeature("Sonido", "Naim Audio")
                ));
                carRepository.save(bentley);
                addRandomReviews(carService, bentley.getId());

                // 8. Mercedes-Maybach S-Class
                car maybach = new car("Maybach S-Class", "Mercedes", "700$", "Lujo",
                        List.of("https://images.unsplash.com/photo-1629055666341-5e505c77d49b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1654522648529-0eb015a8c2d2?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                maybach.setFeatures(List.of(
                        new CarFeature("Asientos", "Masaje/Reclinables"),
                        new CarFeature("Tecnología", "MBUX Hyperscreen")
                ));
                carRepository.save(maybach);
                addRandomReviews(carService, maybach.getId());

                // --- CATEGORÍA: URBANO ---

                // 9. Audi RS3
                car audi = new car("Audi RS3 Sedan", "Audi", "300$", "Urbano",
                        List.of("https://images.unsplash.com/photo-1672400853593-a57147b50688?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1672400853562-680ac5dccc03?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                audi.setFeatures(List.of(
                        new CarFeature("Motor", "2.5L TFSI"),
                        new CarFeature("Tracción", "Quattro")
                ));
                carRepository.save(audi);
                addRandomReviews(carService, audi.getId());

                // 10. BMW M3 Competition
                car bmw = new car("BMW M3 Competition", "BMW", "350$", "Urbano",
                        List.of("https://images.unsplash.com/photo-1727733716406-071b7e500740?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1727733716241-658e9b52a532?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                bmw.setFeatures(List.of(
                        new CarFeature("Color", "Yellow"),
                        new CarFeature("Potencia", "510 CV")
                ));
                carRepository.save(bmw);
                addRandomReviews(carService, bmw.getId());


                // 11. Tesla Model S Plaid
                car tesla = new car("Tesla Model S Plaid", "Tesla", "450$", "Urbano",
                        List.of("https://images.unsplash.com/photo-1698514333866-e0d21c6c7d6d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1698514318453-41de917d2daa?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                tesla.setFeatures(List.of(
                        new CarFeature("Tipo", "Eléctrico"),
                        new CarFeature("Autonomía", "637 km")
                ));
                carRepository.save(tesla);
                addRandomReviews(carService, tesla.getId());

                // 12. Range Rover Sport
                car range = new car("Range Rover Sport", "Land Rover", "400$", "Urbano",
                        List.of("https://images.unsplash.com/photo-1679506640605-acaa4c7d46ed?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1679506640602-0144b3bb5053?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                range.setFeatures(List.of(
                        new CarFeature("Capacidad", "5 Personas"),
                        new CarFeature("Terreno", "Terrain Response 2")
                ));
                carRepository.save(range);
                addRandomReviews(carService, range.getId());

                // --- CATEGORÍA: ECONÓMICO ---

                // 13. Toyota Corolla
                car toyota = new car("Toyota Corolla", "Toyota", "120$", "Economico",
                        List.of("https://images.unsplash.com/photo-1638618164682-12b986ec2a75?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1621979787123-daf3ba3187e2?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                toyota.setFeatures(List.of(
                        new CarFeature("Eficiencia", "Híbrido"),
                        new CarFeature("Seguridad", "Safety Sense")
                ));
                carRepository.save(toyota);
                addRandomReviews(carService, toyota.getId());

                // 14. Honda Civic Type R
                car honda = new car("Honda Civic Type R", "Honda", "180$", "Economico",
                        List.of("https://images.unsplash.com/photo-1606004649694-fbb8757fd6c0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1682020245788-d52bc25c378c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                honda.setFeatures(List.of(
                        new CarFeature("Cambio", "Manual 6 vel."),
                        new CarFeature("Estilo", "Racing Hatchback")
                ));
                carRepository.save(honda);
                addRandomReviews(carService, honda.getId());

                // 15. Volkswagen Golf R
                car golf = new car("Volkswagen Golf R", "Volkswagen", "200$", "Economico",
                        List.of("https://images.unsplash.com/photo-1683444164447-9d9fe1a62283?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1683444126212-50c0aa2a421b?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                golf.setFeatures(List.of(
                        new CarFeature("Tracción", "4Motion"),
                        new CarFeature("Modo", "Drift Mode")
                ));
                carRepository.save(golf);
                addRandomReviews(carService, golf.getId());

                // 16. Ford Mustang GT
                car mustang = new car("Ford Mustang GT", "Ford", "250$", "Deportivo",
                        List.of("https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1560801877-7bda6dd63e51?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                mustang.setFeatures(List.of(
                        new CarFeature("Motor", "V8 5.0L"),
                        new CarFeature("Sonido", "Escape Activo")
                ));
                carRepository.save(mustang);
                addRandomReviews(carService, mustang.getId());

                // 17. Chevrolet Corvette C8
                car corvette = new car("Corvette C8", "Chevrolet", "400$", "Deportivo",
                        List.of("https://images.unsplash.com/photo-1672151576371-4660c86d8b9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fENoZXZyb2xldCUyMENvcnZldHRlJTIwQzh8ZW58MHx8MHx8fDA%3D", "https://images.unsplash.com/photo-1672151575524-5b1f39c331fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENoZXZyb2xldCUyMENvcnZldHRlJTIwQzh8ZW58MHx8MHx8fDA%3D"), true);
                corvette.setFeatures(List.of(
                        new CarFeature("Configuración", "Motor Central"),
                        new CarFeature("Color", "Torch Red")
                ));
                carRepository.save(corvette);
                addRandomReviews(carService,corvette.getId());

                // 18. Aston Martin DBS
                car aston = new car("Aston Martin DBS", "Aston Martin", "880$", "Lujo",
                        List.of("https://images.unsplash.com/photo-1618486613525-c694bf152b2c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1618486613447-553cd00864a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEFzdG9uJTIwTWFydGluJTIwREJTfGVufDB8fDB8fHww"), true);
                aston.setFeatures(List.of(
                        new CarFeature("Motor", "V12 Bi-Turbo"),
                        new CarFeature("Diseño", "Superleggera")
                ));
                carRepository.save(aston);
                addRandomReviews(carService, aston.getId());

                // 19. Mini Cooper S
                car mini = new car("Mini Cooper S", "Mini", "150$", "Urbano",
                        List.of("https://images.unsplash.com/photo-1665995080757-fc959b6a03f8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1665995337932-78687b542afe?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                mini.setFeatures(List.of(
                        new CarFeature("Manejo", "Go-Kart Feeling"),
                        new CarFeature("Techo", "Panorámico")
                ));
                carRepository.save(mini);
                addRandomReviews(carService, mini.getId());

                // 5. Nissan GT-R Nismo
                car raptor = new car("Ford Raptor", "Ford", "650$", "Urbano",
                        List.of("https://images.unsplash.com/photo-1711512302305-7cac3277cf76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9yZCUyMHJhcHRvcnxlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1711512302274-8aafe96481bb?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), true);
                nissan.setFeatures(List.of(
                        new CarFeature("Apodo", "Godzilla"),
                        new CarFeature("Tracción", "ATTESA E-TS AWD")
                ));
                carRepository.save(raptor);
                addRandomReviews(carService, raptor.getId());

                System.out.println("Flota de autos con características inicializada.");
            }

        };
    }

    private void addRandomReviews(CarService carService, Long carId) {
        Random random = new Random();
        int numReviews = random.nextInt(4) + 3; // Entre 3 y 6 reseñas

        String[] comments = {
                "Excelente vehículo, muy potente",
                "Increíble experiencia al volante",
                "El mejor auto que he rentado",
                "Muy limpio y en perfecto estado",
                "Simplemente espectacular"
        };

        for (int i = 0; i < numReviews; i++) {
            int stars = random.nextInt(3) + 3; // Estrellas entre 3 y 5
            Review dummyReview = new Review(
                    "Usuario Prueba " + (i + 1),
                    stars,
                    comments[random.nextInt(comments.length)],
                    "2026-01-04"
            );
            carService.addReviewToCar(carId, dummyReview);

        }

        System.out.println("Reviews creadas.");
    }

}