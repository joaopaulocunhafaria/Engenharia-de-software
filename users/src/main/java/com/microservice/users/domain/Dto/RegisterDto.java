package com.microservice.users.domain.Dto;

import com.microservice.users.domain.users.UserRole;

public record RegisterDto(String login, String password, UserRole role) {}
