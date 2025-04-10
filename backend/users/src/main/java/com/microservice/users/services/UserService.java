package com.microservice.users.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.microservice.users.domain.users.User;
import com.microservice.users.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<User> findAll() {
        return repository.findAll();
    }

    public User findByEmail(String email) throws Exception {
        Optional<User> obj = Optional.of(repository.findByEmail(email));
        return obj.orElseThrow(() -> new Exception("User not found with email: " + email));
    }
    public User findById(String id) throws Exception {
        Optional<User> obj = repository.findById(id);
        return obj.orElseThrow(() -> new Exception("User not found with ID: " + id));
    }

    public User insert(User obj) {
        return repository.save(obj);
    }

    public void delete(String id) throws Exception {
        try {
            repository.deleteById(id);
        } catch (Exception e) {
            throw new Exception("User not found with ID: " + id);
        } 
    }

    public User update(String id, User obj)  throws Exception{
        try {
            User entity = repository.getReferenceById(id);
            updateUser(entity, obj);
            return repository.save(entity);
        } catch (EntityNotFoundException e) {
            throw new Exception("User not found with ID: " + id);
        }
    }

    private void updateUser(User entity, User obj) {
        entity.setEmail(obj.getEmail());
        entity.setName(obj.getName());
        entity.setPassword(obj.getPassword());
        entity.setRole(obj.getRole());
    }
}
