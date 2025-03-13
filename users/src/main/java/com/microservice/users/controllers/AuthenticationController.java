package com.microservice.users.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.users.domain.Dto.AuthenticationDto;
import com.microservice.users.domain.Dto.LoginResponseDTO;
import com.microservice.users.domain.Dto.RegisterDto;
import com.microservice.users.domain.users.User;
import com.microservice.users.infra.security.TokenService;
import com.microservice.users.repositories.UserRepository;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody; 

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;  

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Validated AuthenticationDto authenticationDto) {
        

        var usernamePassword = new UsernamePasswordAuthenticationToken(authenticationDto.email(), authenticationDto.password());
        
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User)auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterDto registerDto) {  
        if (this.userRepository.findByEmail(registerDto.email())!= null) return ResponseEntity.badRequest() .body("Usuario já cadastrado!");

        String encriptedString = new BCryptPasswordEncoder().encode(registerDto.password());    
        User newUser = new User(registerDto.name(),registerDto.email(), encriptedString, registerDto.role());
        
        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();

    }
} 