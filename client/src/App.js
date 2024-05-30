import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState([]); // State to hold fetched entries
  const [textEntry, setTextEntry] = useState('');
  const [audioFile, setAudioFile] = useState(null);

  const fetchEntries = async (selectedDate) => {
    const dateString = selectedDate.toISOString().split('T')[0];
    console.log('Fetching entries for date:', dateString);
    try {
      const response = await fetch(`http://localhost:3000/api/entries/${dateString}`);
      const data = await response.json();
      console.log('Entries fetched successfully:', data);
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };
  
  const handleDateChange = async (newDate) => {
    console.log('Selected Date:', newDate); // Log the date object
    setDate(newDate);
    const dateString = newDate.toISOString().split('T')[0];
    console.log('Formatted Date String for API:', dateString); // Log the formatted date
    fetchEntries(newDate);
  };
  

  const handleTextChange = (event) => {
    setTextEntry(event.target.value);
  };

  const handleAudioChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    console.log('Submit:', date, textEntry, audioFile);
    const formData = new FormData();
    formData.append('textEntry', textEntry);
    formData.append('date', date.toISOString()); // Sending date as ISO string
    if (audioFile) {
      formData.append('audioFile', audioFile);
    }

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Server response:', data);
      alert('Entry submitted successfully!');
      fetchEntries(date); // Re-fetch entries to update the display
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit entry.');
    }
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
      {entries.map((entry, index) => (
        <div key={index} className="entry">
          <p>{entry.textEntry}</p>
          {entry.audioFile && <audio controls src={`http://localhost:3000/uploads/${entry.audioFile}`} />}
        </div>
      ))}
    </div>
  );
}

export default App;
