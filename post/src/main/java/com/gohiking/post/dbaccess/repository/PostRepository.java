package com.gohiking.post.dbaccess.repository;

import com.gohiking.post.dbaccess.model.Post;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {

}
