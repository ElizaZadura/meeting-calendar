import React, { useState } from 'react';
import axios from 'axios';
import './MeetingList.css';

const LEVEL_OPTIONS = [
  { value: '', label: 'Choose level' },
  { value: 'Team', label: 'Team' },
  { value: 'Department', label: 'Department' },
  { value: 'Company', label: 'Company' }
];

const MeetingList = ({ meetings, setMeetings }) => {
  const [editingId, setEditingId] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [error, setError] = useState('');

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/meetings/${id}`)
      .then(() => setMeetings(meetings.filter(meeting => meeting.id !== id)))
      .catch(() => setError('Failed to delete meeting.'));
  };

  const handleEdit = (meeting) => {
    setEditingId(meeting.id);
    setEditFields({ ...meeting });
    setError('');
  };

  const handleFieldChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    axios.put(`http://localhost:8080/api/meetings/${id}`, editFields)
      .then(res => {
        setMeetings(meetings.map(m => m.id === id ? res.data : m));
        setEditingId(null);
        setEditFields({});
      })
      .catch(() => setError('Failed to update meeting.'));
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFields({});
    setError('');
  };

  return (
    <div className="meeting-list-container">
      <h3>List of Created Meetings</h3>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <table className="meeting-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Meeting Title</th>
            <th>Date</th>
            <th>Time</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting, idx) => (
            <tr key={meeting.id} className={editingId === meeting.id ? 'editing' : ''}>
              <td>{idx + 1}</td>
              {editingId === meeting.id ? (
                <>
                  <td>
                    <input
                      name="title"
                      value={editFields.title}
                      onChange={handleFieldChange}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="date"
                      value={editFields.date}
                      onChange={handleFieldChange}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      name="time"
                      value={editFields.time}
                      onChange={handleFieldChange}
                    />
                  </td>
                  <td>
                    <select
                      name="level"
                      value={editFields.level}
                      onChange={handleFieldChange}
                      required
                    >
                      {LEVEL_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleSave(meeting.id)}>💾</button>
                    <button className="delete-btn" onClick={handleCancel}>✖️</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{meeting.title}</td>
                  <td>{meeting.date}</td>
                  <td>{meeting.time}</td>
                  <td>{meeting.level}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(meeting)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(meeting.id)}>🗑️</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingList; 