package com.gohiking.geodecoder.service.map;

import com.gohiking.geodecoder.dbaccess.model.GeoData;
import com.gohiking.geodecoder.service.MapService;

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
