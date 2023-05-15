package com.backend.backend.semester;

import com.backend.backend.subject.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SemesterRepo extends JpaRepository<Semester, Long> {
    Semester findSemesterByName(String name);

    Semester findSemesterById(Long id);
}
