package com.microservice.products.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.microservice.products.domain.Dto.Carrinho;

@Repository
public interface CarrinhoRepository extends MongoRepository<Carrinho, String> {    


    List<Carrinho> findByUserId(String userId);
}
