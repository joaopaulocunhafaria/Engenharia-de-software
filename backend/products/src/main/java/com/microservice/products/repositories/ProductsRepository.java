package com.microservice.products.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.microservice.products.domain.products.Products;

@Repository
public interface ProductsRepository extends MongoRepository<Products, String> {
    
}
