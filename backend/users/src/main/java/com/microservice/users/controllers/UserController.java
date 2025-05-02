package com.microservice.users.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.microservice.users.domain.Dto.RegisterDto;
import com.microservice.users.domain.users.User;
import com.microservice.users.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.findAll();
        if (users.isEmpty()) {
            return ResponseEntity.ok("No users found.");
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) throws Exception {
        try {
            User user = userService.findById(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("User with ID " + id + " not found.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody RegisterDto userDto) {
        try {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String encodedPassword = encoder.encode(userDto.password());
            User user = new User(userDto.name(), userDto.email(), encodedPassword, userDto.role());
            User savedUser = userService.insert(user);
            return ResponseEntity.ok().body(Map.of("message", "User created successfully with ID: " + savedUser.getName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating user: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody RegisterDto userDto) throws Exception {
        try {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String encodedPassword = encoder.encode(userDto.password());
            User updatedUser = new User(userDto.name(), userDto.email(), encodedPassword, userDto.role());
            User savedUser = userService.update(id, updatedUser);
            return ResponseEntity.ok("User updated successfully: " + savedUser.getName());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating user: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) throws Exception {
        try {
            userService.delete(id);
            return ResponseEntity.ok("User with ID " + id + " deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting user: " + e.getMessage());
        }
    }
}
