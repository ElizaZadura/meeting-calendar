import React from 'react';
import './MeetingList.css';

const MeetingList = ({ meetings }) => (
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
          <tr key={meeting.id}>
            <td>{idx + 1}</td>
            <td>{meeting.title}</td>
            <td>{meeting.date}</td>
            <td>{meeting.time}</td>
            <td>{meeting.level}</td>
            <td>
              <button className="edit-btn">✏️</button>
              <button className="delete-btn">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MeetingList; 