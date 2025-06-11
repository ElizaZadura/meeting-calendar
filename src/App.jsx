import React, { useState } from 'react';
import AppLayout from './components/AppLayout/AppLayout.jsx';
import MeetingForm from './components/MeetingForm/MeetingForm.jsx';
import MeetingList from './components/MeetingList/MeetingList.jsx';
import './App.css';

function App() {
  // Move meetings to state
  const [meetings, setMeetings] = useState([
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
  ]);

  return (
    <AppLayout>
      <div className="main-content">
        <MeetingForm meetings={meetings} setMeetings={setMeetings} />
        <MeetingList meetings={meetings} setMeetings={setMeetings} />
      </div>
    </AppLayout>
  );
}

export default App;
