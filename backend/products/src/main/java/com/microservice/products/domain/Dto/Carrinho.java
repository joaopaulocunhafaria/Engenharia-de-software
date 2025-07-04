package com.microservice.products.domain.Dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.microservice.products.domain.Dto.Carrinho;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "carrinho")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Carrinho {

    @Id
    private String id;

    private String userId;
    private String productId;
    private Integer quantity;

    public Carrinho(Carrinho dto) {
        this.userId = dto.getUserId();
        this.productId = dto.getProductId();
        this.quantity = dto.getQuantity();
        this.id = generateId(userId, productId);
    }

    private String generateId(String userId, String productId) {
        return userId + "_" + productId;
    }
}
