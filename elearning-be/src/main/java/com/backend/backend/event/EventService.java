package com.backend.backend.event;

import com.backend.backend.EmailSenderService.EmailSenderService;
import com.backend.backend.exceptions.NotFoundException;
import com.backend.backend.subject.Subject;
import com.backend.backend.subject.SubjectRepo;
import com.backend.backend.userSubject.UserSubject;
import com.backend.backend.userSubject.UserSubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private EmailSenderService emailSenderService;
    @Autowired
    private UserSubjectRepository userSubjectRepository;
    @Autowired
    private SubjectRepo subjectRepo;

    public Optional<Event> getEvent(Long id) {
        return eventRepository.findById(id);
    }

    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    public Event saveEvent(Event event) {
        Subject subject = subjectRepo.findById(event.getSubject().getId()).get();
        event.setSubject(subject);
        sendEmail(event.getSubject(), event);
        return eventRepository.save(event);
    }

    private void sendEmail(Subject subject, Event event) {
        List<UserSubject> subjectUsers = userSubjectRepository.getUserSubjectsBySubject(subject);
        String body =
                "Dodana je nova aktivnost za predmet " + subject.getName()
                + ". Aktivnost pod nazivom "
                + event.getName()
                + " ce se poceti " + event.getDateTime().toString()
                + " i trajat ce do " + event.getDeadline().toString() + ".";
        for (UserSubject userSubject : subjectUsers) {
            emailSenderService.sendEmail(userSubject.getUser().getEmail(), "Nova aktivnost dodana!", body);
        }

    }

    public String deleteEvent(Long id) {
        if (eventRepository.findById(id) == null) {
            throw new NotFoundException("Event does not exists.");
        }
        eventRepository.deleteById(id);
        return "Event deleted.";
    }

    public List<Event> getSubjectEvents(Long subjectId) {
        Subject subject = subjectRepo.findById(subjectId).get();
        return eventRepository.findAllBySubject(subject);
    }
}
