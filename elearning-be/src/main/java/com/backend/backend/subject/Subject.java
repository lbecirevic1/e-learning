package com.backend.backend.subject;

import com.backend.backend.department.Department;
import com.backend.backend.semester.Semester;
import com.backend.backend.userSubject.UserSubject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity(name = "Subject")
@Table(name = "subject")
public class Subject {

    @Id
    @SequenceGenerator(name = "subject_sequence", sequenceName = "subject_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "subject_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "semester_id", referencedColumnName = "id")
    private Semester semester;

    @OneToMany(mappedBy = "subject")
    private Set<UserSubject> userSubject;

    public Subject() {
    }

    public Subject(Long id, String name, Department department, Semester semester) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.semester = semester;
    }

    public Subject(String name, Department department, Semester semester) {
        this.name = name;
        this.department = department;
        this.semester = semester;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    @Override
    public String toString() {
        return "Subject{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", department=" + department +
                ", semester=" + semester +
                ", userSubject=" + userSubject +
                '}';
    }
}
