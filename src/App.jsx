import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from './components/AppLayout/AppLayout.jsx';
import MeetingForm from './components/MeetingForm/MeetingForm.jsx';
import MeetingList from './components/MeetingList/MeetingList.jsx';
import './App.css';

function App() {
  // Move meetings to state
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/meetings')
      .then(res => setMeetings(res.data))
      .catch(err => console.error('Failed to fetch meetings:', err));
  }, []);

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
