package com.gohiking.geodecoder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@Configuration
@EnableFeignClients
@EnableMongoRepositories(basePackages = "com.gohiking")
@ComponentScan(basePackages = "com.gohiking")
public class GeodecoderApplication {
    public static void main(String[] args) {
        SpringApplication.run(GeodecoderApplication.class, args);
    }
}
