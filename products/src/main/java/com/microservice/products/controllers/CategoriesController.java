package com.microservice.products.controllers;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.microservice.products.domain.Dto.AuthenticationDTO;
import com.microservice.products.domain.Dto.User;
import com.microservice.products.domain.categories.Categories;
import com.microservice.products.domain.categories.CategoriesDTO;
import com.microservice.products.proxy.UsersProxy;
import com.microservice.products.services.CategoriesService;

import feign.FeignException;

@RestController
@RequestMapping("categories")
public class CategoriesController {

    @Autowired
    private CategoriesService categoriesService;

    @Autowired
    private UsersProxy usersProxy;

    @GetMapping
    public ResponseEntity<?> findAll(@RequestBody AuthenticationDTO req) {
        try {
            usersProxy.validateToken(req.token());

            List<Categories> categories = categoriesService.findAll();
            
            return ResponseEntity.ok().body(categories);

        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("Error returnig category: " + e.getMessage());
        } 
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@RequestBody AuthenticationDTO req, @PathVariable String id) {

        try {
            usersProxy.validateToken(req.token());

            Categories cat = categoriesService.findById(id).get();

            return ResponseEntity.ok(cat);
        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("Error finding category: " + e.getMessage());
        } 
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody CategoriesDTO category) {

        try {
            usersProxy.validateToken(category.token());

            Categories categories = new Categories(category);

            categoriesService.save(categories);

            return ResponseEntity.ok().body(categories);
        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        }
 
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable String id, @RequestBody AuthenticationDTO req) {
        try {
            usersProxy.validateToken(req.token());

            categoriesService.deleteById(id);

            return ResponseEntity.ok().body("Category deleted successfully.");

        }catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category: " + e.getMessage());
        } 
    }
}
