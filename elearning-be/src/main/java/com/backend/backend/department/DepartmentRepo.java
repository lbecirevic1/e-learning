package com.backend.backend.department;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepo extends JpaRepository<Department, Long> {
    Department findDepartmentByName(String name);

    Department findDepartmentById(Long id);
}
