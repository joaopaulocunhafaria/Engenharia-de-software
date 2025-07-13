package com.microservice.products.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.products.domain.Dto.AuthenticationDTO;
import com.microservice.products.domain.Dto.Carrinho;
import com.microservice.products.domain.products.ProductRes;
import com.microservice.products.domain.products.Products;
import com.microservice.products.proxy.UsersProxy;
import com.microservice.products.services.CarrinhoService;
import com.microservice.products.services.ProductsService;

import feign.FeignException;

@RestController
@RequestMapping("carrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @Autowired
    private UsersProxy usersProxy;

    @Autowired
    private ProductsService productsService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        try {

            List<Carrinho> carrinhos = carrinhoService.findAll();

            return ResponseEntity.ok(carrinhos);
        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao buscar os carrinhos: " + e.getMessage());
        }
    }

    @GetMapping("/id/{carrinhoId}")
    public ResponseEntity<?> findById(  @PathVariable String carrinhoId) {
        try {
            

            Optional<Carrinho> carrinho = carrinhoService.findById(carrinhoId);

            if (carrinho.isPresent()) {
                return ResponseEntity.ok(carrinho.get());
            } else {
                return ResponseEntity.badRequest().body("Carrinho não encontrado com ID: " + carrinhoId);
            }
        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao buscar o carrinho: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Carrinho carrinho) {
        try {
            

            Carrinho savedCarrinho = carrinhoService.save(carrinho);

            return ResponseEntity.ok(savedCarrinho);
        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao salvar o carrinho: " + e.getMessage());
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> update(@PathVariable String userId, @RequestBody Carrinho carrinho) {
        try {
            

            Carrinho updatedCarrinho = carrinhoService.update(userId, carrinho);

            return ResponseEntity.ok(updatedCarrinho);
        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar o carrinho: " + e.getMessage());
        }
    }

    @PutMapping("/increase/{carrinhoId}")
    public ResponseEntity<?> increase( @PathVariable String carrinhoId) {
        try {
         
            Carrinho updatedCarrinho = carrinhoService.increase( carrinhoId);

            return ResponseEntity.ok(updatedCarrinho);
        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar o carrinho: " + e.getMessage());
        }
    }


    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteById(@PathVariable String userId, @RequestBody AuthenticationDTO req) {
        try {
            

            carrinhoService.deleteById(userId);

            return ResponseEntity.ok().body("Carrinho deletado com sucesso.");
        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao deletar o carrinho: " + e.getMessage());
        }
    }



    @GetMapping("/user/{userId}")
    public ResponseEntity<?> findByUserId(@PathVariable String userId) {
        try {
            List<Carrinho> carrinhos = carrinhoService.findByUserId(userId);
            List<ProductRes> products = new ArrayList<ProductRes>(); 
            for (Carrinho carrinho : carrinhos) {
                ProductRes res = new ProductRes(productsService.findById(carrinho.getProductId()));
                res.setQuantityInCart(carrinho.getQuantity());
                products.add(res); 
            }
            return ResponseEntity.ok(products);
        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao buscar carrinhos do usuário: " + e.getMessage());
        }
    }
}
