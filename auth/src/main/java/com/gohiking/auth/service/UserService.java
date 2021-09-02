package com.gohiking.auth.service;

import com.gohiking.auth.dbaccess.model.User;
import com.gohiking.auth.dbaccess.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static com.gohiking.common.constant.GohikingConstant.*;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User newUser) {
        boolean isUsernameExist = userRepository.existsByUsername(newUser.getUsername());
        if (isUsernameExist) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username: User name already exist");
        } else {
            newUser.setRoles(NORMAL_USER);
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            return userRepository.save(newUser);
        }
    }

    public User getUserInfoByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}