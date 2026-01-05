package com.redline.redline_backend;

import jakarta.persistence.*;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName; // Nombre del usuario que comenta
    private Integer stars;   // 1 a 5
    private String comment;  // Descripción detallada
    private String date;     // Fecha de publicación

    public Review() {}

    public Review(String userName, Integer stars, String comment, String date) {
        this.userName = userName;
        this.stars = stars;
        this.comment = comment;
        this.date = date;
    }


    // --- GETTERS AND SETTERS ---
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}