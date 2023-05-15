package com.backend.backend.semester;

import com.backend.backend.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SemesterService {

    private final SemesterRepo semesterRepo;

    @Autowired
    public SemesterService(SemesterRepo semesterRepo) {
        this.semesterRepo = semesterRepo;
    }


    public List<Semester> getSemetsers() {
        return semesterRepo.findAll();
    }
}
