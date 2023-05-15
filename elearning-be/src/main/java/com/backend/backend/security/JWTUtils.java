package com.backend.backend.security;


import com.backend.backend.role.Role;
import com.backend.backend.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JWTUtils {

    @Value("${jjwt.security.key}")
    private String securityKey;

    @Value("${jjwt.token.validity}")
    private int jwtTokenValidity;

    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(securityKey.getBytes());
    }

    public String generateToken(User user) {
        String roleName = "" + user.getRole().getName();
        List<String> roles = new ArrayList<>();
        roles.add(roleName);
        final List authorities = roles;
        Long expirationTimeLong = Long.parseLong(String.valueOf(jwtTokenValidity)); //in seconds
        final Date createdDate = new Date();
        final Date expirationDate = new Date(createdDate.getTime() + expirationTimeLong * 1000);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", authorities)
                .signWith(key)
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }

    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    public Date getExpirationDateFromToken(String token) {
        return getAllClaimsFromToken(token).getExpiration();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }


    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

}
