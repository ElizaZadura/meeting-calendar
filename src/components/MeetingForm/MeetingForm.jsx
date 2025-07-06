import React, { useState } from 'react';
import axios from 'axios';
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
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Required fields
    if (!title || !date || !time || !level) {
      setError('Please fill in all required fields.');
      return;
    }

    // Date/time must be in the future
    const now = new Date();
    const selectedDateTime = new Date(`${date}T${time}`);
    if (selectedDateTime < now) {
      setError('Meeting date and time must be in the future.');
      return;
    }

    // Validate participants (if provided)
    if (participants) {
      const emails = participants.split(',').map(email => email.trim());
      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      for (let email of emails) {
        if (email && !emailRegex.test(email)) {
          setError(`Invalid email: ${email}`);
          return;
        }
      }
    }

    // All good, add meeting via API
    axios.post('http://localhost:8080/api/meetings', {
      title, date, time, level, participants, description
    })
      .then(res => {
        setMeetings(prev => [...prev, res.data]);
        setTitle('');
        setDate('');
        setTime('');
        setLevel('');
        setParticipants('');
        setDescription('');
      })
      .catch(() => setError('Failed to add meeting.'));
  };


  return (
    <div className="meeting-form-container">
      <h2>Schedule a New Meeting</h2>
      {error && <div className="error-message">{error}</div>}
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