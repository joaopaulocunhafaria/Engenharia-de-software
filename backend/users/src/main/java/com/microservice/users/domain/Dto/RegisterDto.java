package com.microservice.users.domain.Dto;

import com.microservice.users.domain.users.UserRole;

public record RegisterDto(String name, String password, String email,UserRole role,String endereco) {}
