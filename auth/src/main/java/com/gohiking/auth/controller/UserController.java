package com.gohiking.auth.controller;

import java.security.Principal;

import com.gohiking.auth.dbaccess.model.User;
import com.gohiking.auth.dbaccess.repository.UserRepository;
import com.gohiking.auth.service.UserService;

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

    @GetMapping("/user/info")
    public User getUserInfo(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token expires");
        }
        User user = userService.getUserInfoByUsername(principal.getName());
        return user;
    }

}
