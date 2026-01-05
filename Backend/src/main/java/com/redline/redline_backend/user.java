package com.redline.redline_backend;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users") // Nombre de la tabla en H2
public class user {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID autoincremental
    private Long id;

    private String name;

    @Column(unique = true) // No permite correos duplicados
    private String email;

    private String password;

    private String role;


    // --- NUEVA SECCIÓN: FAVORITOS ---
    @JsonIgnoreProperties("favoriteCars")
    @ManyToMany
    @JoinTable(
            name = "user_favorites",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "car_id")
    )
    private Set<car> favoriteCars = new HashSet<>();
    // Usamos Set para que no se dupliquen favoritos por error

    public user(){  }

    // --- IMPORTANTE: IntelliJ puede generar esto por ti(Enserio, es util) ---
    // Clic derecho > Generate > Getter and Setter > Selecciona todos
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Set<car> getFavoriteCars() { return favoriteCars; }
    public void setFavoriteCars(Set<car> favoriteCars) { this.favoriteCars = favoriteCars; }
}