package com.gohiking.geodecoder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j2;

import com.gohiking.geodecoder.dbaccess.model.GeoData;
import com.gohiking.geodecoder.dbaccess.repository.GeoDataRepository;
import com.gohiking.geodecoder.service.map.BaseMapFactory;
import com.gohiking.geodecoder.service.map.MapFactory;

@Service
@Log4j2
public class GeoService {

    @Autowired
    private GeoDataRepository geoDataRepository;

    @Value("${spring.mapservice.offset}")
    private Double offset;

    @Value("${spring.mapservice.server}")
    public String server;

    private BaseMapFactory mapFactory = new MapFactory();

    public GeoData getData(double lat, double lon, double offset) {
        List<GeoData> data = geoDataRepository.findLocation(lat - offset, lat + offset, lon - offset, lon + offset);
        GeoData location = null;
        System.out.println(server);
        if (!data.isEmpty())
            location = data.get(0);
        else {
            MapService mapService = mapFactory.getMapService();
            location = mapService.getLocation(lat, lon);
            log.info("Call map service");
            geoDataRepository.save(location);
        }
        return location;
    }

}
