package com.redline.redline_backend;

import jakarta.persistence.*;

@Entity
@Table(name = "car_features")
public class CarFeature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String feature_name;  // Ej: "Color"
    private String feature_value; // Ej: "Rojo"


    public CarFeature() {
    }

    // 2. CONSTRUCTOR CON PARÁMETROS (Para tu DataInitializer)
    public CarFeature(String name, String value) {
        this.feature_name = name;
        this.feature_value = value;
    }

    // --- GETTERS Y SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return feature_name; }
    public void setName(String name) { this.feature_name = name; }
    public String getValue() { return feature_value; }
    public void setValue(String value) { this.feature_value = value; }
}