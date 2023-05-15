package com.backend.backend.user_event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "userEvent")
public class UserEventController {

    private final UserEventService ues;

    @Autowired
    public UserEventController(UserEventService ues) {
        this.ues = ues;
    }


    @GetMapping(path = "/all")
    public List<UserEvent> getUserEventsAll() {
        return ues.getUserEventsAll();
    }

    @RequestMapping(value = "/finishEvent", method = RequestMethod.POST)
    public String startEvent(@RequestBody Map<String,Object> body){
        ues.finishEvent(Long.parseLong(body.get("userId").toString()), Long.parseLong(body.get("eventId").toString()), Long.parseLong(body.get("fileId").toString()));
        return "Uspjesno ste zavrsili kviz!";
    }
}
