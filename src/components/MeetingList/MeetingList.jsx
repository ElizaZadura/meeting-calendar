import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';
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
  const [viewingMeeting, setViewingMeeting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleView = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/meetings/${id}`);
      setViewingMeeting(response.data);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to fetch meeting details.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setViewingMeeting(null);
  };

  const renderLevelBadge = (level) => {
    const className = `level-badge ${level.toLowerCase()}`;
    return <span className={className}>{level}</span>;
  };

  return (
    <div className="meeting-list-container">
      <h3>List of Created Meetings</h3>
      {error && <div className="error-message">{error}</div>}
      <table className="meeting-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Date & Time</th>
            <th>Level</th>
            <th>Participants</th>
            <th>Description</th>
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
                    <input
                      type="time"
                      name="time"
                      value={editFields.time}
                      onChange={handleFieldChange}
                      style={{ marginTop: '0.25rem' }}
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
                    <input
                      name="participants"
                      value={editFields.participants || ''}
                      onChange={handleFieldChange}
                      placeholder="Email addresses"
                    />
                  </td>
                  <td>
                    <input
                      name="description"
                      value={editFields.description || ''}
                      onChange={handleFieldChange}
                      placeholder="Description"
                    />
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleSave(meeting.id)}>💾</button>
                    <button className="delete-btn" onClick={handleCancel}>✖️</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{meeting.title}</td>
                  <td>
                    <div>{meeting.date}</div>
                    <small style={{ color: 'var(--gray-500)' }}>{meeting.time}</small>
                  </td>
                  <td>{renderLevelBadge(meeting.level)}</td>
                  <td>
                    {meeting.participants ? (
                      <span className="participants-badge">
                        👥 {meeting.participants.split(',').length}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--gray-400)' }}>—</span>
                    )}
                  </td>
                  <td>
                    {meeting.description ? (
                      <span className="description-preview">{meeting.description}</span>
                    ) : (
                      <span style={{ color: 'var(--gray-400)' }}>—</span>
                    )}
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => handleView(meeting.id)}>👁️</button>
                    <button className="edit-btn" onClick={() => handleEdit(meeting)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(meeting.id)}>🗑️</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {viewingMeeting && (
          <>
            <div className="modal-header">
              <h2>{viewingMeeting.title}</h2>
              <button className="modal-close" onClick={handleCloseModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Date & Time</label>
                <p>{viewingMeeting.date} at {viewingMeeting.time}</p>
              </div>
              <div className="modal-field">
                <label>Level</label>
                <p>{renderLevelBadge(viewingMeeting.level)}</p>
              </div>
              <div className="modal-field">
                <label>Participants</label>
                {viewingMeeting.participants ? (
                  <div className="participants-list">
                    {viewingMeeting.participants.split(',').map((email, idx) => (
                      <span key={idx} className="participant-chip">
                        📧 {email.trim()}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--gray-500)' }}>No participants added</p>
                )}
              </div>
              <div className="modal-field">
                <label>Description</label>
                <p style={{ whiteSpace: 'pre-wrap' }}>
                  {viewingMeeting.description || <span style={{ color: 'var(--gray-500)' }}>No description provided</span>}
                </p>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default MeetingList; 