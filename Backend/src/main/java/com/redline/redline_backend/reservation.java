package com.redline.redline_backend;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
public class reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceType;
    private String vehicleModel;
    private LocalDateTime reservationDate;

    // --- MEJORA: Relación con el usuario ---
    @ManyToOne // Muchas reservas pueden pertenecer a un mismo usuario
    @JoinColumn(name = "user_id", nullable = false) // Crea una columna con el ID del usuario en la tabla :D
    private user user;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }
    public String getVehicleModel() { return vehicleModel; }
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }
    public LocalDateTime getReservationDate() { return reservationDate; }
    public void setReservationDate(LocalDateTime reservationDate) { this.reservationDate = reservationDate; }
    public user getUser() { return user; }
    public void setUser(user user) { this.user = user; }
}