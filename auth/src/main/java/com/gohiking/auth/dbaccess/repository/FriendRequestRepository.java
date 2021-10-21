package com.gohiking.auth.dbaccess.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.gohiking.auth.dbaccess.model.FriendRequest;

@Repository
public interface FriendRequestRepository extends MongoRepository<FriendRequest, String> {

	List<FriendRequest> findByUserId(String userId);

	List<FriendRequest> findByRequestUsername(String username);

	FriendRequest findByUserIdAndRequestUsername(String userId, String username);
}
