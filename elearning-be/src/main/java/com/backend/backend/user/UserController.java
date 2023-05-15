package com.backend.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "user")
public class UserController {
    private final UserService userService;

    @Autowired

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "/all")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @PostMapping("/register")
    public User createNewUser(@RequestBody UserRequest userRequest){
        return userService.createNewUser(userRequest);
    }

    @GetMapping("/userIdByEmail")
    public Long getUserIdByEmail(@RequestParam(value = "email") String email) {
        return userService.getUserIdByEmail(email);
    }

    @PutMapping("/edit/{id}")
    public User editUser(@PathVariable Long id, @RequestBody UserRequest userRequest) {
        return userService.editUser(id, userRequest);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
}
