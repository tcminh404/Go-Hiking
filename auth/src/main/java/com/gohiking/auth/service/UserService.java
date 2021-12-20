package com.gohiking.auth.service;

import com.gohiking.auth.dbaccess.model.*;
import com.gohiking.auth.dbaccess.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.log4j.Log4j2;

import static com.gohiking.common.constant.GohikingConstant.*;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    FriendRepository friendRepository;
    @Autowired
    FriendRequestRepository friendRequestRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User newUser) {
        if (!(isValidString(newUser.getUsername()) && isValidString(newUser.getPassword())))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid username, password");
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

    public User updateProfile(User currentUser, User updateUser) {
        boolean isUsernameExist = userRepository.existsByUsername(updateUser.getUsername());
        if (!isUsernameExist) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User don't exist");
        } else {
            if (!currentUser.getId().equals(updateUser.getId())) {
                if (currentUser.getRoles().equals(NORMAL_USER))
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User don't have permission");
            }
            else {
                User dbUser = userRepository.findById(updateUser.getId()).get();
                log.info(dbUser);
                updateUser.setRoles(dbUser.getRoles());
                updateUser.setPassword(dbUser.getPassword());
            }

            return userRepository.save(updateUser);
        }
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public List<User> getPublicUsers() {
        return userRepository.findByAccess(AccessLevel.PUBLIC);
    }

    public List<User> getFriends(User user) {
        List<User> friends = new ArrayList<>();
        friendRepository.findByUserId(user.getId()).forEach(data -> {
            friends.add(userRepository.findByUsername(data.getFriendUsername()));
        });
        return friends;
    }

    public FriendRequest upsertFriendRequest(FriendRequest friendRequest) {
        if (friendRequestRepository.findByUserIdAndRequestUsername(friendRequest.getUserId(),
                friendRequest.getRequestUsername()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Already request friend");
        }
        if (friendRepository.findByUserIdAndFriendUsername(friendRequest.getUserId(),
                friendRequest.getRequestUsername()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Already friend");
        }
        return friendRequestRepository.save(friendRequest);
    }

    public List<FriendRequest> getFriendRequests(User user) {
        List<FriendRequest> requests = new ArrayList<>();
        requests.addAll(friendRequestRepository.findByUserId(user.getId()));
        requests.addAll(friendRequestRepository.findByRequestUsername(user.getUsername()));
        return requests;
    }

    public String answerRequest(User user, String requestId, boolean answer) {
        FriendRequest request = friendRequestRepository.findById(requestId).stream().findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Can't find request"));
        if (!request.getUserId().equals(user.getId()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User and request not match");
        if (answer) {
            User friend = userRepository.findByUsername(request.getRequestUsername());
            if (friend == null)
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "User " + request.getRequestUsername() + " not found");
            Friend friend1 = new Friend();
            friend1.setUserId(user.getId());
            friend1.setFriendUsername(friend.getUsername());
            friendRepository.save(friend1);
            Friend friend2 = new Friend();
            friend2.setUserId(friend.getId());
            friend2.setFriendUsername(user.getUsername());
            friendRepository.save(friend2);
        }
        friendRequestRepository.delete(request);
        return "Success";
    }

    public String deleteFriend(User user, User friend) {
        friendRepository.delete(friendRepository.findByUserIdAndFriendUsername(user.getId(), friend.getUsername()));
        friendRepository.delete(friendRepository.findByUserIdAndFriendUsername(friend.getId(), user.getUsername()));
        return "Success";
    }

    public boolean isValidString(String s) {
        if (s == null)
            return false;
        if (s.equals(""))
            return false;
        return true;
    }

}
