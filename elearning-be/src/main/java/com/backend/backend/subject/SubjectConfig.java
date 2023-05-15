//package com.backend.backend.subject;
//
//import com.backend.backend.department.Department;
//import com.backend.backend.department.DepartmentRepo;
//import com.backend.backend.semester.Semester;
//import com.backend.backend.semester.SemesterRepo;
//import com.backend.backend.user.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.List;
//
//@Configuration
//public class SubjectConfig {
//    @Autowired
//    SubjectRepo subjectRepo;
//
//    @Autowired
//    DepartmentRepo departmentRepo;
//
//    @Autowired
//    SemesterRepo semesterRepo;
//
//    @Bean
//    CommandLineRunner subjectCommandLineRunner(SubjectRepo subjectRepo) {
//        return args -> {
//            Department d1 = new Department(
//                    "RI"
//            );
//            departmentRepo.save(d1);
//
//            Semester semester1 = new Semester(
//                    "prvi",
//                    4
//            );
//            Semester semester2 = new Semester(
//                    "sesti",
//                    3
//            );
//            semesterRepo.saveAll(List.of(semester1, semester2));
//
//
//            Department departmentRi = departmentRepo.findDepartmentByName("RI");
//            Semester s1 = semesterRepo.findSemesterByName("prvi");
//            Semester s6 = semesterRepo.findSemesterByName("sesti");
//
//            Subject subject1 = new Subject(
//                    "Praktikum - napredne web tehnologije",
//                    departmentRi,
//                    s1
//            );
//            Subject subject2 = new Subject(
//                    "Racunarske mreze",
//                    departmentRi,
//                    s1
//            );
//            Subject subject3 = new Subject(
//                    "Cad-cam inzenjering",
//                    departmentRi,
//                    s6
//            );
//            subjectRepo.saveAll(List.of(subject1, subject2, subject3));
//        };
//    }
//}
