package com.backend.backend.event;

import com.backend.backend.file.File;
import com.backend.backend.subject.Subject;
import com.backend.backend.user_event.UserEvent;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Set;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "subjectId", referencedColumnName = "id")
    private Subject subject;

    @Column(name = "name", nullable = false )
    private String name;

    @Column(name = "date_time", nullable = false)
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss[.SSS][.SS][.S]")
    private LocalDateTime dateTime;

    @Column(name = "deadline", nullable = false)
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss[.SSS][.SS][.S]")
    private LocalDateTime deadline;

    @OneToMany(mappedBy = "event")
    private Set<UserEvent> userEvents;

    @OneToOne
    @JoinColumn(name = "file_id", referencedColumnName = "id")
    private File file;

    public Event() {
    }

    public Event(Long id, String name, LocalDateTime dateTime, LocalDateTime deadline) {
        this.id = id;
        this.name = name;
        this.dateTime = dateTime;
        this.deadline = deadline;
    }

    public Event(Subject subject, String name, LocalDateTime dateTime, LocalDateTime deadline) {
        this.subject = subject;
        this.name = name;
        this.dateTime = dateTime;
        this.deadline = deadline;
    }

    public Event(Subject subject, String name, LocalDateTime dateTime, LocalDateTime deadline, File file) {
        this.subject = subject;
        this.name = name;
        this.dateTime = dateTime;
        this.deadline = deadline;
        this.file = file;
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

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", subject=" + subject +
                ", name='" + name + '\'' +
                ", dateTime=" + dateTime +
                ", deadline=" + deadline +
                ", userEvents=" + userEvents +
                '}';
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}
