package com.redline.redline_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@EntityScan(basePackages = "com.redline.redline_backend")
@ComponentScan(basePackages = ".com.redline.redline_backend")
public class RedlineBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(RedlineBackendApplication.class, args);
	}

}
