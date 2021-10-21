package com.gohiking.auth.dbaccess.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.gohiking.auth.dbaccess.model.User;
import com.gohiking.common.constant.GohikingConstant.AccessLevel;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	User findByUsername(String username);

	User findByEmail(String email);

	Optional<User> findById(String id);

	boolean existsByUsername(String username);

	boolean existsByEmail(String email);

	List<User> findByAccess(AccessLevel access);
}
