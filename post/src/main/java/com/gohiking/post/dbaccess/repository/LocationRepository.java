package com.gohiking.post.dbaccess.repository;

import java.util.List;

import com.gohiking.post.dbaccess.model.Location;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface LocationRepository extends MongoRepository<Location, String> {
    List<Location> findByParentId(String parentId);

    void deleteByParentId(String parentId);

}
