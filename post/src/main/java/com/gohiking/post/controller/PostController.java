package com.gohiking.post.controller;

import java.util.List;

import com.gohiking.post.dbaccess.model.Post;
import com.gohiking.post.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
