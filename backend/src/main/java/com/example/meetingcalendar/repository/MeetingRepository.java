package com.example.meetingcalendar.repository;

import com.example.meetingcalendar.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
} 