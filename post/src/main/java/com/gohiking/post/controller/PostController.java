package com.gohiking.post.controller;

import java.util.List;

import com.gohiking.common.domain.dto.FriendDTO;
import com.gohiking.common.domain.dto.UserDTO;
import com.gohiking.post.dbaccess.model.*;
import com.gohiking.post.feignclients.AuthServiceClient;
import com.gohiking.post.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    Post upsertPost(@RequestBody Post post) {
        return postService.upsertPost(post);
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
    Comment upsertComments(@RequestBody Comment comment) {
        return postService.upsertComment(comment);
    }

    @GetMapping("/comments")
    List<Comment> getComments(@RequestParam(required = false) String parentId) {
        if (parentId != null) {
            return postService.getComments(parentId);
        } else {
            return postService.getComments();
        }
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
    Location upsertLocations(@RequestBody Location location) {
        return postService.upsertLocation(location);
    }

    @GetMapping("/locations")
    List<Location> getLocations(@RequestParam(required = false) String parentId) {
        if (parentId != null) {
            return postService.getLocations(parentId);
        } else {
            return postService.getLocations();
        }
    }

    @DeleteMapping("/location/{id}")
    String deleteLocation(@PathVariable("id") String postId) {
        return postService.deleteLocation(postId);
    }

    @GetMapping(value = "/test")
    public void getMethodName(@RequestBody List<FriendDTO> param) {
        postService.getFriendPosts(param);
    }

}
