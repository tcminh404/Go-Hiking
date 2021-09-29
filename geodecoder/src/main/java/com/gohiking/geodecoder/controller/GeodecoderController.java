package com.gohiking.geodecoder.controller;

import java.util.List;

import com.gohiking.geodecoder.dbaccess.model.GeoData;
import com.gohiking.geodecoder.service.GeoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(GeodecoderController.GEO_SERVICE)
public class GeodecoderController {
    public static final String GEO_SERVICE = "/rest/geo/v1";

    @Autowired
    GeoService geoService;

    @GetMapping("geo")
    public GeoData getAddress(double lat, double lng, double offset) {
        return geoService.getData(lat, lng, offset);
    }

    @GetMapping("locations")
    public List<GeoData> getAllLocation() {
        return geoService.getAllLocation();
    }
}
