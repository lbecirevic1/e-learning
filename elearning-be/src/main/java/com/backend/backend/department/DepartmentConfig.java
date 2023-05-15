//package com.backend.backend.department;
//
//import com.backend.backend.semester.Semester;
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
//public class DepartmentConfig {
//
//    @Autowired
//    DepartmentRepo departmentRepo;
//
//    @Bean
//    CommandLineRunner departmentCommandLineRunner(DepartmentRepo departmentRepo) {
//        return args -> {
//            Department d1 = new Department(
//                    "RI"
//            );
//            departmentRepo.save(d1);
//        };
//    }
//}
