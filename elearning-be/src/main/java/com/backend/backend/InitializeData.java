package com.backend.backend;

import com.backend.backend.department.Department;
import com.backend.backend.department.DepartmentRepo;
import com.backend.backend.event.Event;
import com.backend.backend.event.EventRepository;
import com.backend.backend.file.File;
import com.backend.backend.file.FileRepository;
import com.backend.backend.role.Role;
import com.backend.backend.role.RoleName;
import com.backend.backend.role.RoleRepository;
import com.backend.backend.semester.Semester;
import com.backend.backend.semester.SemesterRepo;
import com.backend.backend.subject.Subject;
import com.backend.backend.subject.SubjectRepo;
import com.backend.backend.user.User;
import com.backend.backend.user.UserRepository;
import com.backend.backend.userSubject.UserSubject;
import com.backend.backend.userSubject.UserSubjectRepository;
import com.backend.backend.user_event.UserEvent;
import com.backend.backend.user_event.UserEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

import static com.backend.backend.type.Type.*;

@Configuration
public class InitializeData {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public InitializeData(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    RoleRepository roleRepository;
    @Autowired
    DepartmentRepo departmentRepo;
    @Autowired
    SemesterRepo semesterRepo;
    @Autowired
    SubjectRepo subjectRepo;
    @Autowired
    UserSubjectRepository userSubjectRepository;
    @Autowired
    FileRepository fileRepository;
    @Autowired
    EventRepository eventRepository;
    @Autowired
    UserEventRepository userEventRepository;

    @Bean
    CommandLineRunner userCommandLineRunner(UserRepository userRepository) {
        return args -> {
            Role r1 = new Role(RoleName.ADMIN);
            Role r2 = new Role(RoleName.PROFESSOR);
            Role r3 = new Role(RoleName.STUDENT);
            roleRepository.saveAll(List.of(r1, r2, r3));

            User belmin = new User("Belmin", "Selimovic", "bselimovic1@etf.unsa.ba", passwordEncoder.encode("test"), "555-555/221", r1);
            User faris = new User("Faris", "Music", "fmusic2@etf.unsa.ba", passwordEncoder.encode("sifrica"), "123-123/221", r2);
            User lejlaB = new User("Lejla", "Becirevic", "lbecirevic1@etf.unsa.ba", passwordEncoder.encode("nekipw"), "321-321/221", r3);
            User lejlaM = new User("Lejla", "Mujic", "lmujic1@etf.unsa.ba", passwordEncoder.encode("sifrabas"), "111-222/221", r3);
            User ahmed = new User("Ahmed", "Pasic", "apasic2@etf.unsa.ba", passwordEncoder.encode("neradnik"), "112-221/221", r3);

            userRepository.saveAll(List.of(belmin, faris, lejlaB, lejlaM, ahmed));

            Department d1 = new Department("RI");
            Department d2 = new Department("AIE");
            Department d3 = new Department("EE");
            Department d4 = new Department("TK");
            Department d5 = new Department("RS");
            departmentRepo.saveAll(List.of(d1, d2, d3, d4, d5));

            Semester semester1 = new Semester("prvi", 4);
            Semester semester2 = new Semester("sesti", 3);
            semesterRepo.saveAll(List.of(semester1, semester2));

            Subject subject1 = new Subject("Praktikum - napredne web tehnologije", d1, semester1);
            Subject subject2 = new Subject("Racunarske mreze", d1, semester1);
            Subject subject3 = new Subject("Cad-cam inzenjering", d1, semester2);
            subjectRepo.saveAll(List.of(subject1, subject2, subject3));

            UserSubject us1 = new UserSubject(subject1, belmin);
            UserSubject us2 = new UserSubject(subject1, faris);
            UserSubject us3 = new UserSubject(subject1, lejlaB);
            UserSubject us4 = new UserSubject(subject1, lejlaM);
            UserSubject us5 = new UserSubject(subject1, ahmed);

            UserSubject us6 = new UserSubject(subject2, belmin);
            UserSubject us7 = new UserSubject(subject2, faris);
            UserSubject us8 = new UserSubject(subject2, lejlaB);
            UserSubject us9 = new UserSubject(subject2, lejlaM);
            UserSubject us10 = new UserSubject(subject2, ahmed);

            UserSubject us11 = new UserSubject(subject3, belmin);
            UserSubject us12 = new UserSubject(subject3, faris);
            UserSubject us13 = new UserSubject(subject3, lejlaB);
            UserSubject us14 = new UserSubject(subject3, lejlaM);
            UserSubject us15 = new UserSubject(subject3, ahmed);

            userSubjectRepository.saveAll(List.of(us1, us2, us3, us4, us5, us6, us7, us8, us9, us10, us11, us12, us13, us14, us15));

            File f1 = new File("ceGmohiZEd-1-converted.pdf", LECTURE, subject1, System.getProperty("user.dir") + "/files/" + "ceGmohiZEd-1-converted.pdf");
            File f2 = new File("htHmnJwSXR-0020103.pdf", LECTURE, subject1, System.getProperty("user.dir") + "/files/" + "htHmnJwSXR-0020103.pdf");
            File f3 = new File("bjcbPAeKqA-izvjestajRM4.pdf", TUTORIAL, subject1, System.getProperty("user.dir") + "/files/" + "bjcbPAeKqA-izvjestajRM4.pdf");
            File f4 = new File("BFpRrbVZqy-Kvizovi.pdf", TUTORIAL, subject1, System.getProperty("user.dir") + "/files/" + "BFpRrbVZqy-Kvizovi.pdf");
            File f5 = new File("UVUPmtyDgS-lab9_1787_18173.pdf", EXCERCISE, subject1, System.getProperty("user.dir") + "/files/" + "UVUPmtyDgS-lab9_1787_18173.pdf");
            File f6 = new File("dxGWGblcqg-lv5_1787_18173.pdf", EXCERCISE, subject1, System.getProperty("user.dir") + "/files/" + "dxGWGblcqg-lv5_1787_18173.pdf");
            File f7 = new File("NRwlDLCMgI-MMS_Poglavlje_03.pdf", STUDENT_EXCERCISE, subject1, System.getProperty("user.dir") + "/files/" + "NRwlDLCMgI-MMS_Poglavlje_03.pdf");
            File f8 = new File("stKCmOthTo-V5 - Postavka.pdf", STUDENT_EXCERCISE, subject1, System.getProperty("user.dir") + "/files/" + "stKCmOthTo-V5 - Postavka.pdf");

            File f11 = new File("ceGmohiZEd-1-converted.pdf", LECTURE, subject2, System.getProperty("user.dir") + "/files/" + "ceGmohiZEd-1-converted.pdf");
            File f22 = new File("htHmnJwSXR-0020103.pdf", LECTURE, subject2, System.getProperty("user.dir") + "/files/" + "htHmnJwSXR-0020103.pdf");
            File f33 = new File("bjcbPAeKqA-izvjestajRM4.pdf", TUTORIAL, subject2, System.getProperty("user.dir") + "/files/" + "bjcbPAeKqA-izvjestajRM4.pdf");
            File f44 = new File("BFpRrbVZqy-Kvizovi.pdf", TUTORIAL, subject2, System.getProperty("user.dir") + "/files/" + "BFpRrbVZqy-Kvizovi.pdf");
            File f55 = new File("UVUPmtyDgS-lab9_1787_18173.pdf", EXCERCISE, subject2, System.getProperty("user.dir") + "/files/" + "UVUPmtyDgS-lab9_1787_18173.pdf");
            File f66 = new File("dxGWGblcqg-lv5_1787_18173.pdf", EXCERCISE, subject2, System.getProperty("user.dir") + "/files/" + "dxGWGblcqg-lv5_1787_18173.pdf");
            File f77 = new File("NRwlDLCMgI-MMS_Poglavlje_03.pdf", STUDENT_EXCERCISE, subject2, System.getProperty("user.dir") + "/files/" + "NRwlDLCMgI-MMS_Poglavlje_03.pdf");
            File f88 = new File("stKCmOthTo-V5 - Postavka.pdf", STUDENT_EXCERCISE, subject2, System.getProperty("user.dir") + "/files/" + "stKCmOthTo-V5 - Postavka.pdf");

            File f111 = new File("ceGmohiZEd-1-converted.pdf", LECTURE, subject3, System.getProperty("user.dir") + "/files/" + "ceGmohiZEd-1-converted.pdf");
            File f222 = new File("htHmnJwSXR-0020103.pdf", LECTURE, subject3, System.getProperty("user.dir") + "/files/" + "htHmnJwSXR-0020103.pdf");
            File f333 = new File("bjcbPAeKqA-izvjestajRM4.pdf", TUTORIAL, subject3, System.getProperty("user.dir") + "/files/" + "bjcbPAeKqA-izvjestajRM4.pdf");
            File f444 = new File("BFpRrbVZqy-Kvizovi.pdf", TUTORIAL, subject3, System.getProperty("user.dir") + "/files/" + "BFpRrbVZqy-Kvizovi.pdf");
            File f555 = new File("UVUPmtyDgS-lab9_1787_18173.pdf", EXCERCISE, subject3, System.getProperty("user.dir") + "/files/" + "UVUPmtyDgS-lab9_1787_18173.pdf");
            File f666 = new File("dxGWGblcqg-lv5_1787_18173.pdf", EXCERCISE, subject3, System.getProperty("user.dir") + "/files/" + "dxGWGblcqg-lv5_1787_18173.pdf");
            File f777 = new File("NRwlDLCMgI-MMS_Poglavlje_03.pdf", STUDENT_EXCERCISE, subject3, System.getProperty("user.dir") + "/files/" + "NRwlDLCMgI-MMS_Poglavlje_03.pdf");
            File f888 = new File("stKCmOthTo-V5 - Postavka.pdf", STUDENT_EXCERCISE, subject3, System.getProperty("user.dir") + "/files/" + "stKCmOthTo-V5 - Postavka.pdf");

            fileRepository.saveAll(List.of(f1, f2, f3, f4, f5, f6, f7, f8, f11, f22, f33, f44, f55, f66, f77, f88, f111, f222, f333, f444, f555, f666, f777, f888));

            Event e1 = new Event(subject1, "Kviz 1", LocalDateTime.now(), LocalDateTime.now().plusMinutes(30), f5);
            Event e2 = new Event(subject1, "Kviz 2", LocalDateTime.now(), LocalDateTime.now().plusMinutes(30), f6);
            Event e3 = new Event(subject2, "Kviz 3", LocalDateTime.now(), LocalDateTime.now().plusMinutes(30), f55);
            Event e4 = new Event(subject2, "Kviz 4", LocalDateTime.now(), LocalDateTime.now().plusMinutes(30), f66);
            Event e5 = new Event(subject3, "Kviz 5", LocalDateTime.now(), LocalDateTime.now().plusMinutes(30), f555);
            Event e6 = new Event(subject3, "Kviz 6", LocalDateTime.now(), LocalDateTime.now().plusMinutes(30), f666);

            eventRepository.saveAll(List.of(e1, e2, e3, e4, e5, e6));

            UserEvent ue1 = new UserEvent(belmin, e1, 0, f7);
            UserEvent ue2 = new UserEvent(faris, e2, 0, f8);

            UserEvent ue3 = new UserEvent(lejlaB, e3, 0, f77);
            UserEvent ue4 = new UserEvent(lejlaM, e4, 0, f88);

            UserEvent ue5 = new UserEvent(ahmed, e5, 0, f777);
            UserEvent ue6 = new UserEvent(faris, e6, 0, f888);

            userEventRepository.saveAll(List.of(ue1, ue2, ue3, ue4, ue5, ue6));
        };
    }
}
