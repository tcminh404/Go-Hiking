package com.gohiking.post.controller;

import java.util.List;

import com.gohiking.common.domain.dto.FriendDTO;
import com.gohiking.common.domain.dto.UserDTO;
import com.gohiking.post.dbaccess.model.*;
import com.gohiking.post.feignclients.AuthServiceClient;
import com.gohiking.post.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.log4j.Log4j2;

import static com.gohiking.common.constant.GohikingConstant.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Log4j2
@CrossOrigin
@RestController
@RequestMapping(path = PostController.POST_SERVICE)
public class PostController {
    public static final String POST_SERVICE = "/rest/post/v1";

    @Autowired
    PostService postService;

    @Autowired
    AuthServiceClient authServiceClient;

    @PutMapping("/post/upsert")
    Post upsertPost(@RequestBody Post post, @RequestHeader(value = AUTHORIZATION) String token) {
        if (isValidString(token)) {
            try {
                UserDTO user = authServiceClient.getUserInfo(token);
                if (!isValidString(post.getUsername()))
                    post.setUsername(user.getUsername());
            } catch (Exception e) {
                log.info("Error get user info: " + e);
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
            }
            return postService.upsertPost(post);
        }
        throw new ResponseStatusException(HttpStatus.CHECKPOINT);
    }

    @GetMapping("/posts")
    List<Post> getPosts(@RequestHeader(value = AUTHORIZATION, required = false) String token) {
        if (token != null && token != "") {
            try {
                UserDTO user = authServiceClient.getUserInfo(token);
                List<UserDTO> friends = authServiceClient.getFriendList(token);
                return (user.getRoles().equals(ADMIN)) ? postService.getPosts()
                        : postService.getAccessiblePosts(user, friends);
            } catch (Exception e) {
                log.info("Error get user info: " + e);
            }
        }
        return postService.getPublicPosts();
    }

    @DeleteMapping("/post/{id}")
    String deletePost(@PathVariable("id") String postId) {
        return postService.deletePost(postId);
    }

    @PutMapping("/comment/upsert")
    Comment upsertComments(@RequestBody Comment comment, @RequestHeader(value = AUTHORIZATION) String token) {
        if (isValidString(token)) {
            try {
                UserDTO user = authServiceClient.getUserInfo(token);
                if (!isValidString(comment.getUsername()))
                    comment.setUsername(user.getUsername());
            } catch (Exception e) {
                log.info("Error get user info: " + e);
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
            }
            return postService.upsertComment(comment);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/comments/{parentId}")
    List<Comment> getComments(@PathVariable("parentId") String parentId) {
        return postService.getComments(parentId);
    }

    @DeleteMapping("/comment/{id}")
    String deleteComment(@PathVariable("id") String postId) {
        return postService.deleteComment(postId);
    }

    @PutMapping("/image")
    String upload(@RequestParam MultipartFile file) {
        return postService.uploadFile(file);
    }

    @DeleteMapping("/image")
    String deleteFile(@RequestParam String url) {
        return postService.deleteFile(url);
    }

    @PutMapping("/location/upsert")
    Location upsertLocations(@RequestBody Location location, @RequestHeader(value = AUTHORIZATION) String token) {
        if (isValidString(token)) {
            try {
                UserDTO user = authServiceClient.getUserInfo(token);
                if (!isValidString(location.getUsername()))
                    location.setUsername(user.getUsername());
            } catch (Exception e) {
                log.info("Error get user info: " + e);
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
            }
            return postService.upsertLocation(location);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/locations/{parentId}")
    List<Location> getLocations(@PathVariable("parentId") String parentId) {
        return postService.getLocations(parentId);
    }

    @DeleteMapping("/location/{id}")
    String deleteLocation(@PathVariable("id") String postId) {
        return postService.deleteLocation(postId);
    }

    public boolean isValidString(String s) {
        if (s == null)
            return false;
        if (s.equals(""))
            return false;
        return true;
    }

}
