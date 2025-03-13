package com.microservice.products.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.products.domain.products.ProductDTO;
import com.microservice.products.domain.products.Products;
import com.microservice.products.services.ProductsService;

@RestController()
@RequestMapping("products")
public class ProductsController {

    @Autowired
    private ProductsService productsService;

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
    public Products save(ProductDTO product) {
        // Colocar validação de token mandando para o microserviço de users
        Products obj = new Products(product);
        return productsService.save(obj);
    }

    @DeleteMapping("/{id}")
    public void deleteById(String id) {
        // Colocar validação de token mandando para o microserviço de users
        productsService.deleteById(id);
    }
}
