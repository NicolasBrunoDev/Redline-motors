package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private carRepository carRepository;

    @Transactional
    public void addReviewToCar(Long carId, Review newReview) {
        // 1. Buscamos el auto
        car vehicle = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Auto no encontrado"));

        // 2. Agregamos la reseña a la lista del auto
        vehicle.getReviews().add(newReview);

        // 3. Calculamos el total de reseñas
        int total = vehicle.getReviews().size();
        vehicle.setTotalReviews(total);

        // 4. Calculamos el promedio
        double sum = 0;
        for (Review r : vehicle.getReviews()) {
            sum += r.getStars();
        }

        double average = sum / total;

        // Redondeamos a 1 decimal y guardamos
        vehicle.setAverageRating(Math.round(average * 10.0) / 10.0);

        // 5. Guardamos el auto actualizado (esto guarda el auto y la review al mismo tiempo)
        carRepository.save(vehicle);
    }
}