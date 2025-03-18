package com.microservice.users.infra.security;
 
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.microservice.users.repositories.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

 
    @Autowired
    private TokenService tokenService;


    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        var token = recoverToken(request); 
        if(token!=null){
            var email = tokenService.validateToken(token);
            System.out.println("Email do usuario: "+email);
            UserDetails user = userRepository.findByEmail(email);
            
            var authentication = new UsernamePasswordAuthenticationToken(user, null,user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);    
        }
    
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request){
        var autHeader = request.getHeader("Authorization");
        if(autHeader == null) return null;
        return autHeader.replace("Bearer ",""); 
    }
}
