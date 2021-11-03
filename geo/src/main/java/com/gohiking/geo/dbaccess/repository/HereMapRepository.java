package com.gohiking.geo.dbaccess.repository;

import com.gohiking.geo.dbaccess.model.HereMapGeoData;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface HereMapRepository extends MongoRepository<HereMapGeoData, String> {

}
