package com.gohiking.auth.security.keygen;

import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2Request;
import org.springframework.security.oauth2.provider.token.DefaultAuthenticationKeyGenerator;

import java.util.LinkedHashMap;
import java.util.Map;

public class CustomAuthKeyGenerator extends DefaultAuthenticationKeyGenerator {
    public static final String PARAM_CLIENT_ID = "clientId";
    private static final String SUPER_KEY = "super_key";
    private static final String CLIENT_KEY = PARAM_CLIENT_ID;

    @Override
    public String extractKey(final OAuth2Authentication authentication) {
        final String superKey = super.extractKey(authentication);

        final OAuth2Request authorizationRequest = authentication.getOAuth2Request();
        final Map<String, String> requestParameters = authorizationRequest.getRequestParameters();

        final String clientId = requestParameters != null ? requestParameters.get(PARAM_CLIENT_ID) : null;
        if (clientId == null || clientId.length() == 0) {
            return superKey;
        }

        final Map<String, String> values = new LinkedHashMap<>(2);
        values.put(SUPER_KEY, superKey);
        values.put(CLIENT_KEY, clientId);

        return generateKey(values);
    }

}
