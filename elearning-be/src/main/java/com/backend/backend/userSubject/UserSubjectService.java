package com.backend.backend.userSubject;

import com.backend.backend.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserSubjectService {
    @Autowired
    private UserSubjectRepository userSubjectRepository;

}
