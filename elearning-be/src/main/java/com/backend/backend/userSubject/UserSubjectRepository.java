package com.backend.backend.userSubject;


import com.backend.backend.subject.Subject;
import com.backend.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSubjectRepository extends JpaRepository<UserSubject, Long> {
    Optional<UserSubject> findById(Long id);
    List<UserSubject> getUserSubjectsBySubject(Subject subject);
}
