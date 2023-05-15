package com.backend.backend.Login;

public class LoginResponse {
    String accessToken;
//    String refreshToken;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public LoginResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public LoginResponse() {
    }
}
