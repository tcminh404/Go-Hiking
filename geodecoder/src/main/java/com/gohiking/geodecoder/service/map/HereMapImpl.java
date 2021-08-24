package com.gohiking.geodecoder.service.map;

import javax.annotation.PostConstruct;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gohiking.geodecoder.dbaccess.model.GeoData;
import com.gohiking.geodecoder.service.MapService;

import org.springframework.web.client.RestTemplate;

public class HereMapImpl implements MapService {

    private String key;

    @PostConstruct
    void init() {
        // this.key = super.hereKey;
    }

    @Override
    public GeoData getLocation(Double lat, Double lon) {
        GeoData location = new GeoData();
        JsonNode hereLocal = hereLocation(lat, lon);
        if (hereLocal.equals(null))
            throw new RuntimeException("Error when decode location");

        location.setGeoId(hereLocal.get("items").get(0).get("id").toString());
        location.setLatitude(lat);
        location.setLongitude(lon);
        location.setAddress(hereLocal.get("items").get(0).get("title").toString());
        return location;
    }

    public JsonNode hereLocation(Double lat, Double lon) {
        final String uri = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=" + lat + "," + lon + "&lang=en-US"
                + "&apikey=" + key;
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = null;
        try {
            rootNode = mapper.readTree(result);
        } catch (Exception e) {
            return null;
        }
        return rootNode;
    }

}
