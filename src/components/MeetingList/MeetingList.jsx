import React from 'react';
import './MeetingList.css';

const meetings = [
  {
    id: 1,
    title: 'Project Kickoff',
    date: '2024-05-15',
    time: '10:00 AM',
    level: 'Team',
  },
  {
    id: 2,
    title: 'Quarterly Review',
    date: '2024-06-01',
    time: '02:00 PM',
    level: 'Department',
  },
];

const MeetingList = () => (
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