package com.gohiking.common.domain.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String roles;
    private String phoneNumber;
}
