package com.gohiking.post.controller;

import java.io.File;
import java.util.List;

import com.gohiking.post.dbaccess.model.*;
import com.gohiking.post.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping(path = PostController.POST_SERVICE)
public class PostController {
    public static final String POST_SERVICE = "/rest/post/v1";

    @Autowired
    PostService postService;

    @PutMapping("/post/upsert")
    Post upsertPost(@RequestBody Post post) {
        return postService.upsertPost(post);
    }

    @GetMapping("/posts")
    List<Post> getPosts() {
        return postService.getPosts();
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
}
