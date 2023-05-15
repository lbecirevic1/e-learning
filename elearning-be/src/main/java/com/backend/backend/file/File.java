package com.backend.backend.file;

import com.backend.backend.department.Department;
import com.backend.backend.subject.Subject;
import com.backend.backend.type.Type;

import javax.persistence.*;

@Entity
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "format")
    @Enumerated(EnumType.STRING)
    private Type format;

    @ManyToOne
    @JoinColumn(name = "subjectId", nullable = false, referencedColumnName = "id")
    private Subject subject;

    @Column(name = "value")
    private String value;


    public File() {
    }

    public File(Long id, String name, Type format, Subject subject, String value) {
        this.id = id;
        this.name = name;
        this.format = format;
        this.subject = subject;
        this.value = value;
    }

    public File(String name, Type format, Subject subject, String value) {
        this.name = name;
        this.format = format;
        this.subject = subject;
        this.value = value;
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

    public Type getFormat() {
        return format;
    }

    public void setFormat(Type format) {
        this.format = format;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
