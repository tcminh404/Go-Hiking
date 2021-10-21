package com.gohiking.auth.dbaccess.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.gohiking.common.constant.GohikingConstant.AccessLevel;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("user")
public class User {
    @Id
    String id;

    @NotEmpty(message = "username must not be empty")
    @NotNull(message = "username must not be null")
    String username;

    @NotEmpty(message = "password must not be empty")
    @NotNull(message = "password must not be null")
    String password;

    @NotEmpty(message = "roles must not be empty")
    @NotNull(message = "roles must not be null")
    String roles;

    String firstName;
    String lastName;
    String email;
    String phoneNumber;
    AccessLevel access;
}
