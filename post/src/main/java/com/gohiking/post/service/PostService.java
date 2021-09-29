package com.gohiking.post.service;

import java.util.List;

import com.gohiking.post.dbaccess.model.Post;
import com.gohiking.post.dbaccess.repository.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;

    public Post upsertPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getPosts() {
        return postRepository.findAll();
    }
}
