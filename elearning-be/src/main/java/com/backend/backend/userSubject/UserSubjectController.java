package com.backend.backend.userSubject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserSubjectController {
    @Autowired
    UserSubjectService userSubjectService;
}
