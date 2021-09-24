package com.gohiking.geodecoder.dbaccess.repository;

import com.gohiking.geodecoder.dbaccess.model.HereMapGeoData;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface HereMapRepository extends MongoRepository<HereMapGeoData, String> {

}
