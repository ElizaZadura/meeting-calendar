package com.example.meetingcalendar.controller;

import com.example.meetingcalendar.model.Meeting;
import com.example.meetingcalendar.repository.MeetingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/meetings")
@CrossOrigin(origins = "http://localhost:5173")
public class MeetingController {
    private final MeetingRepository meetingRepository;

    public MeetingController(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    @GetMapping
    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Meeting> getMeeting(@PathVariable Long id) {
        return meetingRepository.findById(id);
    }

    @PostMapping
    public Meeting createMeeting(@RequestBody Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    @PutMapping("/{id}")
    public Meeting updateMeeting(@PathVariable Long id, @RequestBody Meeting meeting) {
        meeting.setId(id);
        return meetingRepository.save(meeting);
    }

    @DeleteMapping("/{id}")
    public void deleteMeeting(@PathVariable Long id) {
        meetingRepository.deleteById(id);
    }
} 