package com.gohiking.post.dbaccess.repository;

import java.util.List;

import com.gohiking.post.dbaccess.model.Comment;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByParentId(String parentId);

    void deleteByParentId(String parentId);

}
