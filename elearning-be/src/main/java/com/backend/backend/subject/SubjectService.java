package com.backend.backend.subject;

import com.backend.backend.department.Department;
import com.backend.backend.department.DepartmentRepo;
import com.backend.backend.semester.Semester;
import com.backend.backend.semester.SemesterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepo subjectRepo;

    @Autowired
    SemesterRepo semesterRepo;

    @Autowired
    DepartmentRepo departmentRepo;

    @Autowired
    public SubjectService(SubjectRepo subjectRepo) {
        this.subjectRepo = subjectRepo;
    }

    public List<Subject> getSubjects(Semester semester) {
        Semester existingSem = semesterRepo.findSemesterByName(semester.getName());
        Long semesterId = existingSem.getId();
        return subjectRepo.findSubjectBySemester(semesterId);
    }

    public List<Subject> getAllSubjects() {
        return subjectRepo.findAll();
    }

    public Subject getSubjectById(Long id) {
        return subjectRepo.getById(id);
    }

    public Subject createSubject(SubjectRequest subjectRequest) {

        Department d= departmentRepo.findDepartmentById(subjectRequest.department_id);
        Semester s = semesterRepo.findSemesterById(subjectRequest.semester_id);

        Subject sub = new Subject(subjectRequest.name,d, s);
        return subjectRepo.save(sub);
    }
}
