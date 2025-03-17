package com.microservice.products.domain.categories;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "categories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Categories {

        @Id
        private String id;
        private String title;
        private String description;
         
        public Categories(CategoriesDTO categoriesDto){
            this.title = categoriesDto.title();
            this.description = categoriesDto.description();
        } 

}
