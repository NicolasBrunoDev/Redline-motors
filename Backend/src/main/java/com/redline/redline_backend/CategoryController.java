package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private carRepository carRepository;

    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping("/create")
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(category -> {

                    List<car> carsWithThisCategory = carRepository.findByCategory(category.getName());

                    for (car c : carsWithThisCategory) {
                        c.setCategory("Sin Categoría");
                        carRepository.save(c);
                    }

                    categoryRepository.delete(category);
                    return ResponseEntity.ok().body("Categoría eliminada y autos actualizados");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}