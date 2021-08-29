package com.gohiking.geodecoder.service;

import com.gohiking.geodecoder.dbaccess.model.GeoData;

public interface MapService {

    public GeoData getLocation(Double lat, Double lon);

}
