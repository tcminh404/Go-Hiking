package com.gohiking.common.domain.dto;

import com.gohiking.common.constant.GohikingConstant.AccessLevel;

import lombok.Data;

@Data
public class UserDTO {
    String id;
    String firstName;
    String lastName;
    String username;
    String email;
    String roles;
    String phoneNumber;
    AccessLevel access;
}
