package com.gohiking.auth.dbaccess.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.gohiking.auth.dbaccess.model.Friend;

@Repository
public interface FriendRepository extends MongoRepository<Friend, String> {

	List<Friend> findByUserId(String userId);

	Friend findByUserIdAndFriendUsername(String userId, String friendUsername);

}
