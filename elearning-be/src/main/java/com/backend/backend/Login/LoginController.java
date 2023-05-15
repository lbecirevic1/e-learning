package com.backend.backend.Login;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
//@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping("/elearning/login")
    public Map<String, String> login(@RequestBody LoginRequest loginRequest) {
      return loginService.login(loginRequest);
    }

    @GetMapping("/token/refresh")
    public Map<String, String> refreshToken(@RequestHeader HttpHeaders headers) {
        String token = headers.getFirst(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());
        return loginService.refreshToken(token);
    }

    @PostMapping(path = "/forgotPassword")
    public String sendForgotPasswordEmail(@RequestParam(value = "email") String email){
        return loginService.sendForgotPasswordEmail(email);
    }

    @PutMapping(path = "/changePassword/{token}")
    public ResponseEntity<Object> changePassword(@PathVariable String token, @RequestBody() Map<String, String> password){
        String pw = password.get("password");
        return loginService.changePassword(token, pw);
    }

}
