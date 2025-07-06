import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout';
import MeetingForm from './components/MeetingForm/MeetingForm.jsx';
import MeetingList from './components/MeetingList/MeetingList.jsx';

const Dashboard = ({ meetings, setMeetings }) => (
  <div style={{ width: '100%' }}>
    <MeetingForm meetings={meetings} setMeetings={setMeetings} />
    <MeetingList meetings={meetings} setMeetings={setMeetings} />
  </div>
);

const Meetings = ({ meetings }) => (
  <div style={{ width: '100%' }}>
    <MeetingList meetings={meetings} setMeetings={() => {}} readOnly />
  </div>
);

const Calendar = () => <div style={{ padding: 24 }}><h2>Calendar</h2><p>Full-page calendar coming soon.</p></div>;

function App() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/meetings')
      .then(res => setMeetings(res.data))
      .catch(err => console.error('Failed to fetch meetings:', err));
  }, []);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard meetings={meetings} setMeetings={setMeetings} />} />
        <Route path="/meetings" element={<Meetings meetings={meetings} />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
