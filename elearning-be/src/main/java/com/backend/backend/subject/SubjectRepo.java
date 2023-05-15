package com.backend.backend.subject;

import com.backend.backend.semester.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepo extends JpaRepository<Subject, Long> {

    @Query("SELECT s FROM Subject s WHERE s.semester.id = ?1")
    List<Subject> findSubjectBySemester(Long semesterId);

}
