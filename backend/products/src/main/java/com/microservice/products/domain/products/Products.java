package com.microservice.products.domain.products;

import java.io.IOException;
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
    private String imageName;
    
    private byte[] image;
    private String category;
    private String ownerId;
    private Long price;
    private Integer quantity;
 
    public Products(ProductDTO productDto) throws IOException{
        this.title = productDto.title();
        this.description = productDto.description();
        this.imageName = productDto.image().getOriginalFilename();
        this.image = productDto.image().getBytes();
        this.ownerId = productDto.ownerId();
        this.price = Long.valueOf(productDto.price());
        this.quantity = productDto.quantity();
    }
 

    
}
