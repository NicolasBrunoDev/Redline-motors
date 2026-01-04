package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*") // Permite que React se conecte
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping("/create")
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }
}