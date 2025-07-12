package com.microservice.products.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.microservice.products.domain.Dto.AuthenticationDTO;
import com.microservice.products.domain.categories.Categories;
import com.microservice.products.domain.products.ProductDTO;
import com.microservice.products.domain.products.Products;
import com.microservice.products.proxy.UsersProxy;
import com.microservice.products.services.CategoriesService;
import com.microservice.products.services.ProductsService;

import feign.FeignException;

@RestController()
@RequestMapping("products")
public class ProductsController {

    @Autowired
    private UsersProxy usersProxy;

    @Autowired
    private ProductsService productsService;

    @Autowired
    private CategoriesService categoriesService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        try { 

            List<Products> products = productsService.findAll();

            return ResponseEntity.ok().body(products);

        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error returnig products: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById( @PathVariable String id) {
        try { 

            Products products = productsService.findById(id);

            return ResponseEntity.ok().body(products);

        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error finding product by id: " + e.getMessage());
        }
    }

    @PostMapping("/list/{token}")
    public ResponseEntity<?> saveList(@RequestBody List<ProductDTO> products, @PathVariable String token) {
        try {
 
            for (ProductDTO product : products) {

                Products productObj = new Products(product);
                
                productsService.save(productObj);
            }

            return ResponseEntity.ok().body(products);

        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving product: " + e.getMessage());
        }
    }

    @PostMapping(value="/{token}", consumes = "multipart/form-data")
    public ResponseEntity<?> save(
    @RequestParam("title") String title,
    @RequestParam("description") String description,
    @RequestParam("ownerId") String ownerId,
    @RequestParam("category") String categoryId,
    @RequestParam("price") double price,
    @RequestParam("image") MultipartFile image, @PathVariable String token) {
        try {
            

            Products productObj = new Products();
            productObj.setTitle(title);
            productObj.setDescription(description);
            productObj.setOwnerId(ownerId);
            productObj.setImageName(image.getOriginalFilename());
            productObj.setImage(image.getBytes());
            productObj.setPrice((long) price);
            productObj.setCategory(categoryId);

            productsService.save(productObj);

            return ResponseEntity.ok().body(productObj);

        } catch (FeignException e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.badRequest().body("Token inválido");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving product: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@RequestBody AuthenticationDTO req, @PathVariable String id) throws Exception {
        try {
            usersProxy.validateToken(req.token());

            productsService.deleteById(id);

            return ResponseEntity.ok().body("Product deleted successfully.");

        } catch (FeignException e) {
            return ResponseEntity.badRequest().body("Token inválido");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting product: " + e.getMessage());
        }
    }
}
