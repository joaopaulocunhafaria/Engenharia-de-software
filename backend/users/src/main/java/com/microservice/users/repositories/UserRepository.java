package com.microservice.users.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microservice.users.domain.users.User;

public interface UserRepository extends JpaRepository<User,String> {
    User findByEmail(String email);   
}
