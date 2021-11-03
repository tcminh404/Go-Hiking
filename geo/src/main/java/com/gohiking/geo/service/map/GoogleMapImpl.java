package com.gohiking.geo.service.map;

import com.gohiking.geo.dbaccess.model.GeoData;
import com.gohiking.geo.service.MapService;

import org.springframework.stereotype.Component;

@Component("googlemap")
public class GoogleMapImpl implements MapService {
    @Override
    public GeoData getLocation(Double lat, Double lon) {

        return null;
    }

    @Override
    public Object[] getAllLocation() {

        return null;
    }
}
