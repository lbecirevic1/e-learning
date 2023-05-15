package com.backend.backend.user_event;

import com.backend.backend.event.EventRepository;
import com.backend.backend.file.FileRepository;
import com.backend.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserEventService {

    private final UserEventRepository uer;

    private final UserRepository userRepository;

    private final EventRepository eventRepository;

    private final FileRepository fileRepository;

    @Autowired
    public UserEventService(UserEventRepository uer, UserRepository userRepository, EventRepository eventRepository, FileRepository fileRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.uer = uer;
        this.fileRepository = fileRepository;
    }

    public List<UserEvent> getUserEventsAll() {
        return uer.findAll();
    }

    public void finishEvent(Long userId, Long eventId, Long fileId) {
        UserEvent userEvent = new UserEvent(userRepository.findById(userId).get(), eventRepository.findById(eventId).get());
        userEvent.setFile(fileRepository.findById(fileId).get());
        uer.save(userEvent);
    }
}
