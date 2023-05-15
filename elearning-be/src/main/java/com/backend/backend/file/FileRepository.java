package com.backend.backend.file;

import com.backend.backend.file.File;
import com.backend.backend.type.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    List<File> findAllByFormat(Type type);
}
