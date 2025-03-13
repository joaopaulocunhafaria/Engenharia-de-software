package com.microservice.products.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.products.domain.categories.Categories;
import com.microservice.products.services.CategoriesService;

@RestController
@RequestMapping("categories")
public class CategoriesController {
    
    @Autowired
    private CategoriesService categoriesService;

    @GetMapping
    public List<Categories> findAll() {
        // Colocar validação de token mandando para o microserviço de users
        return categoriesService.findAll();
    }

    @GetMapping("/{id}")
    public Categories findById(String id) {
        // Colocar validação de token mandando para o microserviço de users        
        return categoriesService.findById(id).get();
    }

    @PostMapping
    public Categories save(Categories category) {
        // Colocar validação de token mandando para o microserviço de users
        return categoriesService.save(category);
    }

    @DeleteMapping("/{id}")
    public void deleteById(String id) {
        // Colocar validação de token mandando para o microserviço de users
        categoriesService.deleteById(id);
    }
}
