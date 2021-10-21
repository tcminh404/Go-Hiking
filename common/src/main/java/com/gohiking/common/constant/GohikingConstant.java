package com.gohiking.common.constant;

public class GohikingConstant {
    public static final String AUTHORIZATION = "Authorization";

    // user roles
    public static final String ADMIN = "0";
    public static final String NORMAL_USER = "1";

    public class MapServiceProvider {
        public static final String HEREMAP = "heremap";
        public static final String GOOGLEMAP = "googlemap";
    }

    public enum AccessLevel {
        PUBLIC, FRIEND, PRIVATE
    }
}
