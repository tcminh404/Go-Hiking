package com.gohiking.post.dbaccess.repository;

import com.gohiking.post.dbaccess.model.CloudinaryData;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface CloudinaryRepository extends MongoRepository<CloudinaryData, String> {
    @Query("{'secure_url':?0}")
    CloudinaryData findBySecureUrl(String secureUrl);
}
