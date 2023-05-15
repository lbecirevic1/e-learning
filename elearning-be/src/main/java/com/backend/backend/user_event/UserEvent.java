package com.backend.backend.user_event;

import com.backend.backend.event.Event;
import com.backend.backend.file.File;
import com.backend.backend.user.User;

import javax.persistence.*;

@Entity
@Table
public class UserEvent {

    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )

    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @Column(name = "score")
    private double score;

    @OneToOne
    @JoinColumn(name = "file_id", referencedColumnName = "id")
    private File file;

    public UserEvent() {
    }

    public UserEvent(Long id, User user, Event event, double score) {
        this.id = id;
        this.user = user;
        this.event = event;
        this.score = score;
    }

    public UserEvent(User user, Event event, double score) {
        this.user = user;
        this.event = event;
        this.score = score;
    }

    public UserEvent(User user, Event event) {
        this.user = user;
        this.event = event;
    }

    public UserEvent(User user, Event event, double score, File file) {
        this.user = user;
        this.event = event;
        this.score = score;
        this.file = file;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event eventId) {
        this.event = eventId;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    @Override
    public String toString() {
        return "UserEvent{" +
                "id=" + id +
                ", userId=" + user +
                ", eventId=" + event +
                ", score=" + score +
                '}';
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}
