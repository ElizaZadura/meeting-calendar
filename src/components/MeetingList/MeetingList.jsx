import React, { useState } from 'react';
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

  const handleDelete = (id) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
  };

  const handleEdit = (meeting) => {
    setEditingId(meeting.id);
    setEditFields({ ...meeting });
  };

  const handleFieldChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    setMeetings(meetings.map(m =>
      m.id === id ? { ...editFields, id } : m
    ));
    setEditingId(null);
    setEditFields({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFields({});
  };

  return (
    <div className="meeting-list-container">
      <h3>List of Created Meetings</h3>
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