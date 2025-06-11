import React, { useState } from 'react';
import './MeetingForm.css';

const LEVEL_OPTIONS = [
  { value: '', label: 'Choose level' },
  { value: 'Team', label: 'Team' },
  { value: 'Department', label: 'Department' },
  { value: 'Company', label: 'Company' }
];

const MeetingForm = ({ meetings, setMeetings }) => {
  // Local state for form fields
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [level, setLevel] = useState('');
  const [participants, setParticipants] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new meeting object
    const newMeeting = {
      id: Date.now(), // simple unique id
      title,
      date,
      time,
      level,
      participants,
      description,
    };
    // Add to meetings list
    setMeetings([...meetings, newMeeting]);
    // Clear form
    setTitle('');
    setDate('');
    setTime('');
    setLevel('');
    setParticipants('');
    setDescription('');
  };

  const handleDelete = (id) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
  };

  return (
    <div className="meeting-form-container">
      <h2>Schedule a New Meeting</h2>
      <form className="meeting-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" placeholder="Enter meeting title" name="title" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="form-row">
          <input type="date" name="date" value={date} onChange={e => setDate(e.target.value)} required />
          <input type="time" name="time" value={time} onChange={e => setTime(e.target.value)} required />
        </div>
        <div className="form-row">
          <select
            name="level"
            value={level}
            onChange={e => setLevel(e.target.value)}
            required
          >
            {LEVEL_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <input type="text" placeholder="Enter participant emails" name="participants" value={participants} onChange={e => setParticipants(e.target.value)} />
        </div>
        <div className="form-row">
          <textarea placeholder="Enter meeting description" name="description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <button type="submit" className="create-meeting-btn">+ Create Meeting</button>
      </form>
    </div>
  );
};

export default MeetingForm; 