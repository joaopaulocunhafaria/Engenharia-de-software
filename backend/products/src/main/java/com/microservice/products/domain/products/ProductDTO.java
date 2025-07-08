package com.microservice.products.domain.products;

import org.springframework.web.multipart.MultipartFile;

public record ProductDTO(
        String token,
        String title,
        String description,
        MultipartFile image,
        String ownerId,
        String categoryId,
        String price) {
}