package com.cs.dms;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class,  ErrorMvcAutoConfiguration.class, FlywayAutoConfiguration.class})
public class Application {


    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String args[]) throws Exception {
        logger.info("Application about to start ");

        ApplicationContext context = null;
        try {
            context = SpringApplication.run(Application.class, args);
        } catch (Exception e) {
            e.printStackTrace();
        }

        logger.info("Inspecting Spring boot beans");

        String[] beanNames = context.getBeanDefinitionNames();
        Arrays.sort(beanNames);
        for (String beanName : beanNames) {
            logger.info(beanName);
        }
    }



    @Bean
    WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods(HttpMethod.OPTIONS.name(),
                                HttpMethod.PATCH.name(),
                                HttpMethod.PUT.name(),
                                HttpMethod.DELETE.name(),
                                HttpMethod.GET.name(),
                                HttpMethod.POST.name())
                        .allowedOrigins("*")
                        .maxAge(360);
            }
        };

    }




}
