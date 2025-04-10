package com.microservice.products.domain.Dto;
 
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode

 
public class User   {
 
    private String id;
    private String name;
    private String email;
    private String password;
    private UserRole role;
 
    public User(String name,String email, String password, UserRole role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
         
    
}
