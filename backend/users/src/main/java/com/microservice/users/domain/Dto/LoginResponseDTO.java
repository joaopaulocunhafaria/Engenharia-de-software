package com.microservice.users.domain.Dto;

public record LoginResponseDTO(String token, String role, String name, String userId) {
    
}