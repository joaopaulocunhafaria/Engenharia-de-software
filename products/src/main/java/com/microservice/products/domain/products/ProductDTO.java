package com.microservice.products.domain.products;

public record ProductDTO(
        String title,
        String description,
        String image,
        String ownerId,
        String categoryId,
        Long price) {
}