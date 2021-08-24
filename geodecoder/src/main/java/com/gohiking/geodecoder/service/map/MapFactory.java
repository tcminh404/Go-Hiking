package com.gohiking.geodecoder.service.map;

import javax.annotation.PostConstruct;

import com.gohiking.geodecoder.service.MapService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;

public class MapFactory extends BaseMapFactory {

    private String server;

    @Autowired
    ResourceLoader resourceLoader;

    @PostConstruct
    public void init(@Value("${spring.mapservice.server}") String server) {
        this.server = server;
    }

    @Override
    public MapService getMapService() {
        MapService mapService = null;
        System.out.println(resourceLoader.getResource("classpath:src/main/resources/application.yml"));
        switch (server.toLowerCase()) {
            case "hereapi":
                mapService = new HereMapImpl();
                break;
            default:
                throw new IllegalArgumentException("No map service " + server);
        }

        return mapService;
    }

}
