package com.gohiking.geo.service;

import com.gohiking.geo.dbaccess.model.GeoData;

public interface MapService {

    public GeoData getLocation(Double lat, Double lon);

    public Object[] getAllLocation();
}
