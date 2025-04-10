package com.microservice.products.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "users", url = "http://localhost:8081")
public interface UsersProxy {

    @GetMapping("/auth/validate/{token}")
    public ResponseEntity<String> validateToken(@PathVariable String token);

}
