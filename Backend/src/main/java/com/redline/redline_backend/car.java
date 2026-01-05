package com.redline.redline_backend;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "cars")
public class car {

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "car_id") // Esto crea la relación en la tabla de features
    private List<CarFeature> features = new ArrayList<>(); // Inicializar evita NullPointerException

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "car_id")
    private List<Review> reviews = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;
    private String priceDay;
    private String category;
    private boolean available = true;
    private Double averageRating = 0.0;
    private Integer totalReviews = 0;

    @ElementCollection
    private List<String> images; // 1. Cambié 'image' a 'images' para que sea más claro que es una lista

    // CONSTRUCTOR VACÍO
    public car() {
    }

    // 2. CONSTRUCTOR CON PARÁMETROS CORREGIDO
    // Debes incluir 'List<String> images' en los parámetros para poder usarlos en el DataInitializer
    public car(String name, String brand, String priceDay, String category, List<String> images, boolean available) {
        this.name = name;
        this.brand = brand;
        this.priceDay = priceDay;
        this.category = category;
        this.images = images;
        this.available = available;
    }

    // --- Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getPriceDay() { return priceDay; }
    public void setPriceDay(String priceDay) { this.priceDay = priceDay; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }
    public List<CarFeature> getFeatures() { return features; }
    public void setFeatures(List<CarFeature> features) { this.features = features; }
    public void setTotalReviews(Integer totalReviews) { this.totalReviews = totalReviews; }
    public Integer getTotalReviews() { return totalReviews; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }
    public Double getAverageRating() { return averageRating; }
    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }


}