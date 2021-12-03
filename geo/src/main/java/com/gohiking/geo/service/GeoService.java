package com.gohiking.geo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

import java.util.List;

import com.gohiking.geo.dbaccess.model.GeoData;
import com.gohiking.geo.dbaccess.repository.GeoDataRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class GeoService {

    @Autowired
    private GeoDataRepository geoDataRepository;

    @Value("${spring.mapservice.offset}")
    private Double offset;

    @Autowired
    MapService mapService;

    public GeoData getAddress(double lat, double lng) {
        if (Math.abs(lat) > 90 || Math.abs(lng) > 180)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid coordinate");
        return mapService.getLocation(lat, lng);
    }

    public GeoData getData(double lat, double lng, double offset) {
        if (Math.abs(lat) > 90 || Math.abs(lng) > 180)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid coordinate");
        List<GeoData> data = geoDataRepository.findLocation(lat - offset, lat + offset, lng - offset, lng + offset);
        GeoData location = null;
        if (!data.isEmpty())
            location = data.get(0);
        else {
            location = mapService.getLocation(lat, lng);
            try {
                geoDataRepository.save(location);
            } catch (Exception e) {
                log.info("Error save entity: " + location);
            }
        }
        return location;
    }

    public List<GeoData> getAllLocation() {
        return geoDataRepository.findAll();
    }

}
