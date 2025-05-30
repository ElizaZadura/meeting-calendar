import React from 'react';
import AppLayout from './components/AppLayout/AppLayout.jsx';
import MeetingForm from './components/MeetingForm/MeetingForm.jsx';
import MeetingList from './components/MeetingList/MeetingList.jsx';
import './App.css';

function App() {
  return (
    <AppLayout>
      <div className="main-content">
        <MeetingForm />
        <MeetingList />
      </div>
    </AppLayout>
  );
}

export default App;
