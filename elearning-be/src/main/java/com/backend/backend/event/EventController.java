package com.backend.backend.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class EventController {
    @Autowired
    EventService eventService;

    @GetMapping("/event/{id}")
    public Optional<Event> getEvent(@PathVariable Long id) {
        return eventService.getEvent(id);
    }

    @GetMapping("/events/{subjectId}")
    public List<Event> getSubjectEvents(@PathVariable Long subjectId) {
        return eventService.getSubjectEvents(subjectId);
    }

    @GetMapping("/events")
    public List<Event> getEvents() {
        return eventService.getEvents();
    }

    @PostMapping("/event")
    public Event saveEvent(@RequestBody Event event) {
        return eventService.saveEvent(event);
    }

    @DeleteMapping("/event/{id}")
    public String deleteEvent(@PathVariable Long id) {
        return eventService.deleteEvent(id);
    }
}
