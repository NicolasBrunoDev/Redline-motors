package com.redline.redline_backend;

import jakarta.persistence.*;

@Entity
@Table(name = "cars")
public class car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;
    private String priceDay;
    private String image;
    private boolean available = true;

    // 1. CONSTRUCTOR VACÍO
    public car() {
    }

    // 2. CONSTRUCTOR CON PARÁMETROS
    public car(String name, String brand, String priceDay, String image, boolean available) {
        this.name = name;
        this.brand = brand;
        this.priceDay = priceDay;
        this.image = image;
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
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public void save(car car) {

    }
}