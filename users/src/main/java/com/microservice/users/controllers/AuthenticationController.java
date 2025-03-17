package com.microservice.users.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.microservice.users.domain.Dto.AuthenticationDto;
import com.microservice.users.domain.Dto.LoginResponseDTO;
import com.microservice.users.domain.Dto.RegisterDto;
import com.microservice.users.domain.users.User;
import com.microservice.users.infra.security.TokenService;
import com.microservice.users.repositories.UserRepository;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Validated AuthenticationDto authenticationDto) {

        var usernamePassword = new UsernamePasswordAuthenticationToken(authenticationDto.email(),
                authenticationDto.password());

        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterDto registerDto) {
        if (this.userRepository.findByEmail(registerDto.email()) != null)
            return ResponseEntity.badRequest().body("Usuario já cadastrado!");

        String encriptedString = new BCryptPasswordEncoder().encode(registerDto.password());
        User newUser = new User(registerDto.name(), registerDto.email(), encriptedString, registerDto.role());

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();

    }

    @GetMapping("/validate/{token}")
    public ResponseEntity<?> validateToken(@PathVariable String  token) {
        try {
            
            String email = tokenService.validateToken(token);
            System.out.println("Token validate: " + token);
            User usr = userRepository.findByEmail(email);
            if (usr == null) {
                logger.warn("Tentativa de validação com token de usuário inexistente: {}", email);
                return ResponseEntity.status(401).body("Usuário não encontrado");
            }
            
            return ResponseEntity.ok(usr);
        } catch (JWTVerificationException e) {
            logger.warn("Tentativa de validação com token inválido: {}", token);
            return ResponseEntity.status(401).body("Token inválido ou expirado");
        } catch (Exception e) {
            logger.error("Erro interno ao validar token", e);
            return ResponseEntity.status(500).body("Erro interno do servidor");
        }
    }

}