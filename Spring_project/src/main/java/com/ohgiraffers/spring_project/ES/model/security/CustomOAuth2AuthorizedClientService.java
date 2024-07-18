package com.ohgiraffers.spring_project.ES.model.security;

import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.core.Authentication;

import java.util.HashMap;
import java.util.Map;

public class CustomOAuth2AuthorizedClientService implements OAuth2AuthorizedClientService {

    private final ClientRegistrationRepository clientRegistrationRepository;
    private final Map<String, OAuth2AuthorizedClient> authorizedClients = new HashMap<>();

    public CustomOAuth2AuthorizedClientService(ClientRegistrationRepository clientRegistrationRepository) {
        this.clientRegistrationRepository = clientRegistrationRepository;
    }

    @Override
    public <T extends OAuth2AuthorizedClient> T loadAuthorizedClient(String clientRegistrationId, String principalName) {
        return (T) authorizedClients.get(clientRegistrationId);
    }

    @Override
    public void saveAuthorizedClient(OAuth2AuthorizedClient authorizedClient, Authentication principal) {
        authorizedClients.put(authorizedClient.getClientRegistration().getRegistrationId(), authorizedClient);
    }

    @Override
    public void removeAuthorizedClient(String clientRegistrationId, String principalName) {
        authorizedClients.remove(clientRegistrationId);
    }
}