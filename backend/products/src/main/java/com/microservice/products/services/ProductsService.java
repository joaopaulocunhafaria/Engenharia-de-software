package com.microservice.products.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microservice.products.domain.products.Products;
import com.microservice.products.repositories.ProductsRepository;

@Service
public class ProductsService {
    
    @Autowired
    private ProductsRepository productsRepository;

    public List<Products> findAll() {
        return productsRepository.findAll();
    }

    public Products findById(String id) {
        return productsRepository.findById(id).get();
    }

    public Products save(Products product) {
        
        return productsRepository.save(product);
    }

    public void deleteById(String id) {
        productsRepository.deleteById(id);
    }
}
