//package com.backend.backend.role;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.List;
//
//@Configuration
//public class RoleConfig {
//    @Bean
//    CommandLineRunner roleCommandLineRunner(RoleRepository roleRepository){
//        return args -> {
//            Role r1 = new Role(
//                    RoleName.ADMIN
//            );
//            Role r2 = new Role(
//                    RoleName.PROFESSOR
//            );
//            Role r3 = new Role(
//                    RoleName.STUDENT
//            );
//            roleRepository.saveAll(List.of(r1,r2,r3));
//        };
//    }
//}
