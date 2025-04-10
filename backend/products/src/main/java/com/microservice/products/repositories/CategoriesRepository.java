package com.microservice.products.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.microservice.products.domain.categories.Categories;

@Repository
public interface CategoriesRepository extends MongoRepository<Categories, String> {
    
}
