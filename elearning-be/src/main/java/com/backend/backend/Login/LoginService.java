package com.backend.backend.Login;

import com.backend.backend.exceptions.NotFoundException;
import com.backend.backend.role.Role;
import com.backend.backend.security.JWTUtils;
import com.backend.backend.user.User;
import com.backend.backend.user.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Service
public class LoginService {

    @Autowired
    JWTUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${jjwt.security.key}")
    private String securityKey;

    public Map<String, String> login(LoginRequest loginRequest) {

        User user = userRepository.findUserByEmail(loginRequest.email);
        if (user == null) {
            throw new NotFoundException("User not found.");
        }

        Boolean passwordMatches = passwordEncoder.matches(loginRequest.password, user.getPassword());
        if (!passwordMatches) {
            throw new NotFoundException("Password does not match");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtils.generateToken(user);
        Map<String, String> tokens = new HashMap<>();
        tokens.put("token", token);
        return tokens;
    }


    public Map<String, String> refreshToken(String token) {
        Map<String, String> verifyToken = new HashMap<>();
        Boolean valid = jwtUtils.validateToken(token);
        if (!valid) {
            verifyToken.put("error", "Token not valid.");
        }
        String email = jwtUtils.getUsernameFromToken(token);
        String role = jwtUtils.getAllClaimsFromToken(token).get("role").toString();
        String roleReal = role.substring(1, role.length() - 1);

        final Date createdDate = new Date();
        final Date expirationDate = new Date(System.currentTimeMillis() + 60*60*1000);

        List<String> authorities = new ArrayList<>();
        authorities.add(roleReal);

        String refreshtoken = Jwts.builder()
                .setSubject(email)
                .claim("role", authorities)
                .signWith(Keys.hmacShaKeyFor(securityKey.getBytes()))
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .compact();
        verifyToken.put("token", refreshtoken);
        return verifyToken;
    }

    public String sendForgotPasswordEmail(String email) {
        try{
            User user = userRepository.findUserByEmail(email);
            if(user==null) throw new UsernameNotFoundException("Email doesn't exist");

            String token = createToken(user, 15);

            SimpleMailMessage smm = new SimpleMailMessage();
            smm.setTo(email);
            smm.setText("If you want to reset your password click on following link :  http://localhost:3000/changePassword/"+token+"\n"+"You have 15 minutes.");
            smm.setSubject("FABPass advice");
            smm.setFrom("apasicspam@gmail.com");

            mailSender.send(smm);

            return "Email successfully sent";

        }catch (Exception e){
            if(e.getMessage().equals("Email doesn't exist")) return "Email doesn't exist";
            throw new IllegalStateException(e.getMessage());
        }
    }

    public String createToken(User user, int expirationTimeMin){
        final Date createdDate = new Date();
        final Date expirationDate = new Date(System.currentTimeMillis() + 60*expirationTimeMin*1000);

        List<String> authorities = new ArrayList<>();
        authorities.add(user.getRole().getName().name());

        String token = Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", authorities)
                .signWith(Keys.hmacShaKeyFor(securityKey.getBytes()))
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .compact();

        return token;
    }

    public ResponseEntity<Object> changePassword(String token, String password) {
        Map<String, String> verifyToken = new HashMap<>();
        Boolean valid = jwtUtils.validateToken(token);
        if (!valid) {
            verifyToken.put("error", "Token not valid.");
            return new ResponseEntity<>(verifyToken, HttpStatus.BAD_REQUEST);
        }
        String email = jwtUtils.getUsernameFromToken(token);
        User foundUser = userRepository.findUserByEmail(email);
        if(foundUser==null){
            verifyToken.put("error", "User not found.");
            return new ResponseEntity<>(verifyToken, HttpStatus.BAD_REQUEST);
        }

        String newPw = passwordEncoder.encode(password);
        foundUser.setPassword(newPw);
        userRepository.save(foundUser);

        verifyToken.put("message", "Successfully changed password");
        return new ResponseEntity<>(verifyToken, HttpStatus.OK);
    }
}
