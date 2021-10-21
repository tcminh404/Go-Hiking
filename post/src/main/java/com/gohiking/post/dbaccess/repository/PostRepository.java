package com.gohiking.post.dbaccess.repository;

import java.util.List;

import com.gohiking.common.constant.GohikingConstant.AccessLevel;
import com.gohiking.post.dbaccess.model.Post;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByAccess(AccessLevel access);

    List<Post> findByUsername(String username);

    List<Post> findByAccessAndUsername(AccessLevel access, String username);
}
