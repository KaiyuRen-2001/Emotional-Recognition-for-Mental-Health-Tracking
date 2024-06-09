import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [date, setDate] = useState(new Date());
  const [file, setFile] = useState(null); // Updated initial state to null
  const [entries, setEntries] = useState([]); // State to hold fetched entries
  const [textEntry, setTextEntry] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [emotion, setEmotion] = useState(''); // State to hold the emotion
  const [newEmotion, setNewEmotion] = useState(''); // State to hold the new emotion input
  const [emotionDate, setEmotionDate] = useState(''); // State to hold the date for the emotion
  const [savedEmotions, setSavedEmotions] = useState({}); // State to hold the saved emotions

  const handleDateChange = async (newDate) => {
    console.log('Selected Date:', newDate); // Log the date object
    setDate(newDate);
  };

  const handleAudioChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (audioFile) {
      setFile(audioFile);
      // Perform any upload logic here if needed
      console.log('File set for upload:', audioFile);
    }
  };

  const handleEmotionChange = (event) => {
    setNewEmotion(event.target.value);
  };

  const handleEmotionDateChange = (event) => {
    setEmotionDate(event.target.value);
  };

  const handleUpdate = () => {
    setEmotion(newEmotion);
    if (emotionDate) {
      setSavedEmotions(prevState => ({
        ...prevState,
        [emotionDate]: newEmotion
      }));
      console.log(`Emotion saved for ${emotionDate}: ${newEmotion}`);
    }
  };

  return (
    <div className="App">
      <div className="main-container">
        <div className="left-panel">
          <h1>Journal Your Day</h1>
          <div className="file-upload-box">
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioChange}
            />
            <button
              className="button button-primary ask-button"
              id="upload-button"
              onClick={handleUpload}
            >
              <FontAwesomeIcon icon={faUpload} />
              Upload
            </button>
          </div>
          <div className="emotion-message">
            {audioFile ? (
              <p>Emotion: {emotion || 'disgust'}</p>
            ) : (
              <p>Emotions will be displayed here</p>
            )}
          </div>
          <div className="button-group">
            <input
              type="text"
              placeholder="Enter new emotion"
              value={newEmotion}
              onChange={handleEmotionChange}
            />
            <input
              type="date"
              value={emotionDate}
              onChange={handleEmotionDateChange}
            />
            <button className="button button-primary" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
        <div className="right-panel">
          <Calendar
            onChange={handleDateChange}
            value={date}
          />
          <div className="emotion-display">
            {savedEmotions[date.toISOString().split('T')[0]] ? (
              <p>Emotion for {date.toISOString().split('T')[0]}: {savedEmotions[date.toISOString().split('T')[0]]}</p>
            ) : (
              <p>No emotion saved for this date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
