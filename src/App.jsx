import React, { useState } from 'react';
import AppLayout from './components/AppLayout/AppLayout.jsx';
import MeetingForm from './components/MeetingForm/MeetingForm.jsx';
import MeetingList from './components/MeetingList/MeetingList.jsx';
import './App.css';

function App() {
  // Move meetings to state
  const [meetings, setMeetings] = useState([]);

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
