//package com.backend.backend.semester;
//
//import com.backend.backend.department.Department;
//import com.backend.backend.subject.Subject;
//import com.backend.backend.subject.SubjectRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.List;
//
//@Configuration
//public class SemesterConfig {
//    @Autowired
//    SemesterRepo semesterRepo;
//
//    @Bean
//    CommandLineRunner semesterCommandLineRunner(SemesterRepo semesterRepo) {
//        return args -> {
//            Semester semester1 = new Semester(
//                    "prvi",
//                          4
//            );
//            Semester semester2 = new Semester(
//                    "sesti",
//                    3
//            );
//            semesterRepo.saveAll(List.of(semester1, semester2));
//        };
//    }
//}
