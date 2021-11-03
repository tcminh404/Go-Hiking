package com.gohiking.geo.controller;

import java.util.List;

import com.gohiking.geo.dbaccess.model.GeoData;
import com.gohiking.geo.service.GeoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(GeoController.GEO_SERVICE)
public class GeoController {
    public static final String GEO_SERVICE = "/rest/geo/v1";

    @Autowired
    GeoService geoService;

    @GetMapping("geo")
    public GeoData getAddress(double lat, double lng,
            @RequestParam(required = false, defaultValue = "0.0") double offset) {
        return geoService.getData(lat, lng, offset);
    }

    @GetMapping("locations")
    public List<GeoData> getAllLocation() {
        return geoService.getAllLocation();
    }
}
