package com.gohiking.auth.dbaccess.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.gohiking.auth.dbaccess.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	User findByUsername(String username);

	User findByEmail(String email);

	Optional<User> findById(String id);

	boolean existsByUsername(String username);

	boolean existsByEmail(String email);

}
