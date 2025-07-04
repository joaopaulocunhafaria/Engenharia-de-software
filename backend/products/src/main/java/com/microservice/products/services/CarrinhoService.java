package com.microservice.products.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.microservice.products.domain.Dto.AuthenticationDTO;
import com.microservice.products.domain.Dto.Carrinho;
import com.microservice.products.repositories.CarrinhoRepository;

import feign.FeignException;

import java.util.List;
import java.util.Optional;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    public Carrinho save(Carrinho carrinho) {
        return carrinhoRepository.save(carrinho);
    }

    public List<Carrinho> findAll() {
        return carrinhoRepository.findAll();
    }

    public Optional<Carrinho> findById(String userId) {
        return carrinhoRepository.findById(userId);
    }

    public Carrinho update(String userId, Carrinho carrinho) {
        if (carrinhoRepository.existsById(userId)) {
            return carrinhoRepository.save(carrinho);
        } else {
            throw new RuntimeException("Carrinho not found with id: " + userId);
        }
    }

    public Carrinho increase(String carrinhId) {
        Optional<Carrinho> optionalCarrinho = carrinhoRepository.findById(carrinhId);
        
        if (optionalCarrinho.isPresent()) {
            Carrinho carrinho = optionalCarrinho.get();
            Integer currentQuantity = carrinho.getQuantity();
            carrinho.setQuantity(currentQuantity == null ? 1 : currentQuantity + 1);
            return carrinhoRepository.save(carrinho);
        } else {
            throw new RuntimeException("Carrinho not found with id: " + carrinhId);
        }
    }

    public void deleteById(String userId) {
        if (carrinhoRepository.existsById(userId)) {
            carrinhoRepository.deleteById(userId);
        } else {
            throw new RuntimeException("Carrinho not found with id: " + userId);
        }
    }

    public List<Carrinho> findByUserId(String userId) {
        return carrinhoRepository.findByUserId(userId);
    }

}
