package com.gohiking.post.feignclients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.gohiking.common.domain.dto.UserDTO;

import static com.gohiking.common.constant.GohikingConstant.AUTHORIZATION;

@FeignClient(name = "auth-service", url = "auth:9010/rest/auth/v1")
public interface AuthServiceClient {

    @GetMapping(value = "/user/info")
    UserDTO getUserInfo(@RequestHeader(AUTHORIZATION) String token);

    @GetMapping(value = "/user/friends")
    List<UserDTO> getFriendList(@RequestHeader(AUTHORIZATION) String token);

    @GetMapping(value = "/user/info/username")
    UserDTO getUserByUsername(@RequestParam String username);

    @PostMapping(value = "/users/info/usernames")
    List<UserDTO> getUsersByUsernames(@RequestBody List<String> usernames);
}
