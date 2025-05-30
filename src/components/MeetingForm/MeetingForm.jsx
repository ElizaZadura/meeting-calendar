import React from 'react';
import './MeetingForm.css';

const MeetingForm = () => (
  <div className="meeting-form-container">
    <h2>Schedule a New Meeting</h2>
    <form className="meeting-form">
      <div className="form-row">
        <input type="text" placeholder="Enter meeting title" name="title" />
      </div>
      <div className="form-row">
        <input type="date" name="date" />
        <input type="time" name="time" />
      </div>
      <div className="form-row">
        <select name="level">
          <option value="">Choose level</option>
          <option value="Team">Team</option>
          <option value="Department">Department</option>
          <option value="Company">Company</option>
        </select>
      </div>
      <div className="form-row">
        <input type="text" placeholder="Enter participant emails" name="participants" />
      </div>
      <div className="form-row">
        <textarea placeholder="Enter meeting description" name="description" />
      </div>
      <button type="submit" className="create-meeting-btn">+ Create Meeting</button>
    </form>
  </div>
);

export default MeetingForm; 