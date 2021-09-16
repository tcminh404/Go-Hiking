package com.gohiking.auth.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.gohiking.auth.dbaccess.mapper.DTO;
import com.gohiking.auth.dbaccess.model.User;
import com.gohiking.auth.service.UserService;
import com.gohiking.common.domain.dto.UserDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import static com.gohiking.common.constant.GohikingConstant.*;

@RestController
@RequestMapping(UserController.AUTH_SERVICE)
public class UserController {
    public static final String AUTH_SERVICE = "/rest/auth/v1";

    @Autowired
    UserService userService;
    @Autowired
    private TokenStore tokenStore;

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

    @GetMapping("/users")
    public List<User> getUsers(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token expires");
        }
        User currentUser = userService.getUserInfoByUsername(principal.getName());
        if (currentUser.getRoles().equals(ADMIN)) {
            return userService.getUsers();
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User don't have permission");
        }
    }

    @DeleteMapping("/user/logout")
    public void logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null) {
            try {
                String tokenValue = authHeader.replace("Bearer", "").trim();
                OAuth2AccessToken accessToken = tokenStore.readAccessToken(tokenValue);
                tokenStore.removeAccessToken(accessToken);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "FAILED");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "FAILED");
        }
    }
}
