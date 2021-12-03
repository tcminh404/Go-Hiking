package com.gohiking.geo.service.map;

import java.lang.module.ResolutionException;

import com.gohiking.geo.dbaccess.model.GeoData;
import com.gohiking.geo.dbaccess.model.HereMapGeoData;
import com.gohiking.geo.dbaccess.model.HereResult;
import com.gohiking.geo.dbaccess.repository.HereMapRepository;
import com.gohiking.geo.service.MapService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Component("heremap")
public class HereMapImpl implements MapService {

    @Value("${map.hereapi.key}")
    private String key;

    @Autowired
    private HereMapRepository hereMapRepository;

    @Override
    public GeoData getLocation(Double lat, Double lng) {
        GeoData location = new GeoData();
        HereMapGeoData hereLocal = hereLocation(lat, lng);
        if (hereLocal == null) {
            log.info("Error get geo data HERE map");
            throw new RuntimeException("Error when decode location");
        }
        try {
            location.setGeoId(hereLocal.getId());
            location.setLatitude(hereLocal.getPosition().getLat());
            location.setLongitude(hereLocal.getPosition().getLng());
            location.setAddress(hereLocal.getAddress().getLabel());
        } catch (Exception e) {
            log.info("Error read location: " + location + ", error: " + e);
        }
        return location;
    }

    public HereMapGeoData hereLocation(Double lat, Double lng) {
        final String uri = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=" + lat + "," + lng + "&lang=en-US"
                + "&apikey=" + key;
        RestTemplate restTemplate = new RestTemplate();
        HereResult result = restTemplate.getForObject(uri, HereResult.class);
        for (HereMapGeoData geoData : result.getItems()) {
            hereMapRepository.save(geoData);
        }
        if (result.getItems().size() > 0)
            return result.getItems().get(0);
        else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "HERE map not return location");
    }

    @Override
    public Object[] getAllLocation() {
        return hereMapRepository.findAll().toArray();
    }

}
