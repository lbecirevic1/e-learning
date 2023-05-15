package com.backend.backend.subject;

import com.backend.backend.semester.Semester;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("subject")
public class SubjectController {

    private final SubjectService subjectService;

    @Autowired
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }


    @GetMapping("/all")
    public List<Subject> getSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/bysemester")
    public List<Subject> getSubjectsBySemester(@RequestParam(value = "name") String name, @RequestParam(value = "year") Integer year) {
        Semester sem = new Semester(name, year);
        return subjectService.getSubjects(sem);
    }


    @GetMapping("/byid/{id}")
    public Subject getSubjectsById(@PathVariable Long id) {
        return subjectService.getSubjectById(id);
    }

    @PostMapping("/create")
    public Subject createSubject(@RequestBody SubjectRequest subjectRequest) {
        return subjectService.createSubject(subjectRequest);
    }
    /*public Subject createSubject(@RequestParam(value = "name") String name, @RequestParam(value = "department_id") Long department_id, @RequestParam(value = "semester_id") Long semester_id) {
        return subjectService.createSubject(name,department_id,semester_id);
    }*/
}
