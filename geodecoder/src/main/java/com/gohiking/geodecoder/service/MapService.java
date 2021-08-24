package com.gohiking.geodecoder.service;

import com.gohiking.geodecoder.dbaccess.model.GeoData;

import org.springframework.beans.factory.annotation.Value;

public interface MapService {

    // @Value("${map.hereapi.key}")
    // public String hereKey;

    public GeoData getLocation(Double lat, Double lon);

}
