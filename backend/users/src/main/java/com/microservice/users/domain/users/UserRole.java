package com.microservice.users.domain.users;

public enum UserRole {
    ADMIN("admin"),
    SELLER("seller"),
    USER("user");

    private String role;
    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
