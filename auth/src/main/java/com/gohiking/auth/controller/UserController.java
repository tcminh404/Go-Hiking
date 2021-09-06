package com.gohiking.auth.controller;

import java.security.Principal;

import com.gohiking.auth.dbaccess.mapper.DTO;
import com.gohiking.auth.dbaccess.model.User;
import com.gohiking.auth.service.UserService;
import com.gohiking.common.domain.dto.UserDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(UserController.AUTH_SERVICE)
public class UserController {
    public static final String AUTH_SERVICE = "/rest/auth";

    @Autowired
    UserService userService;

    @PutMapping("/user/create")
    public User createUser(@RequestBody User newUser) {
        return userService.createUser(newUser);
    }

    @DTO(UserDTO.class)
    @GetMapping("/user/info")
    public User getUserInfo(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token expires");
        }
        User user = userService.getUserInfoByUsername(principal.getName());
        return user;
    }

    @PutMapping("/user/update")
    public User updateUser(Principal principal, @RequestBody User updateUser) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token expires");
        }
        User currentUser = userService.getUserInfoByUsername(principal.getName());
        return userService.updateUser(currentUser, updateUser);
    }

}
