import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling

function App() {
  const [date, setDate] = useState(new Date());
  const [textEntry, setTextEntry] = useState('');
  const [audioFile, setAudioFile] = useState(null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTextChange = (event) => {
    setTextEntry(event.target.value);
  };

  const handleAudioChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    console.log('Submit:', date, textEntry, audioFile);
    // Here you would typically handle the submission to your backend or state management
  };

  return (
    <div className="App">
      <h1>Journal Your Day</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
      <textarea
        placeholder="Write your diary entry..."
        value={textEntry}
        onChange={handleTextChange}
      />
      <input
        type="file"
        accept="audio/*"
        onChange={handleAudioChange}
      />
      <button onClick={handleSubmit}>Submit Entry</button>
    </div>
  );
}

export default App;
