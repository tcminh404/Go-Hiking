package com.gohiking.geodecoder.dbaccess.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.gohiking.geodecoder.dbaccess.model.GeoData;

public interface GeoDataRepository extends MongoRepository<GeoData, String> {

    @Query("{$and:[{'Latitude':{$gte:?0,$lte:?1}},{'Longitude':{$gte:?2,$lte:?3}}]}")
    public List<GeoData> findLocation(double lat1, double lat2, double lon1, double lon2);
}
