package com.microservice.products.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microservice.products.repositories.CategoriesRepository;
import java.util.List;
import java.util.Optional;

import com.microservice.products.domain.categories.Categories;


@Service
public class CategoriesService {
    
    @Autowired
    private CategoriesRepository categoriesRepository;

    public List<Categories> findAll() {
        return categoriesRepository.findAll();
    }

    public Optional<Categories> findById(String id) {
        return categoriesRepository.findById(id);
    }

    public Categories save(Categories category) {
        return categoriesRepository.save(category);
    }

    public void deleteById(String id) {
        categoriesRepository.deleteById(id);
    }
}
