package com.microservice.products.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.products.domain.categories.Categories;
import com.microservice.products.domain.products.ProductDTO;
import com.microservice.products.domain.products.Products;
import com.microservice.products.services.CategoriesService;
import com.microservice.products.services.ProductsService;

@RestController()
@RequestMapping("products")
public class ProductsController {

    @Autowired
    private ProductsService productsService;
    @Autowired
    private CategoriesService categoriesService;

    @GetMapping
    public List<Products> findAll() {
        // Colocar validação de token mandando para o microserviço de users
        return productsService.findAll();
    }

    @GetMapping("/{id}")
    public Products findById(String id) {
        // Colocar validação de token mandando para o microserviço de users
        return productsService.findById(id);
    }

    @PostMapping
    public Products save(@RequestBody ProductDTO product) {
        // Colocar validação de token mandando para o microserviço de users

        Products obj = new Products(product);
        Optional<Categories> cat = categoriesService.findById(product.categoryId());

        obj.setCategory(cat.orElse(null));

        return productsService.save(obj);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable String id) throws Exception {
        try {
            productsService.deleteById(id);
            return ResponseEntity.ok("Product deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting product: " + e.getMessage());
        }
    }
}
