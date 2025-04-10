package com.microservice.products.domain.products;

import java.util.Locale.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.microservice.products.domain.categories.Categories;
import com.microservice.products.repositories.CategoriesRepository;
import com.microservice.products.services.CategoriesService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Products {

    @Autowired
    private CategoriesService service;

    @Id
    private String id;
    private String title;
    private String description;
    private String image;
    private Categories category;
    private String ownerId;
    private Long price;
 
    public Products(ProductDTO productDto){
        this.title = productDto.title();
        this.description = productDto.description();
        this.image = productDto.image();
        this.ownerId = productDto.ownerId();
        this.price = productDto.price();
    }
 

    
}
