// Refer to https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial 
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });



const dbFile = path.join(__dirname, 'data.json');

function saveEntry(entry) {
  let data = {};
  if (fs.existsSync(dbFile)) {
    data = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
  }
  if (!data[entry.date]) {
    data[entry.date] = [];
  }
  data[entry.date].push(entry);
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

app.post('/api/upload', upload.single('audioFile'), (req, res) => {
  const { textEntry, date } = req.body;
  const audioFile = req.file;
  const entry = {
    textEntry,
    date,
    audioFile: audioFile ? audioFile.filename : null
  };

  saveEntry(entry);

  res.json({ message: "Successfully uploaded data and file!!!", ...entry });
});

app.get('/api/entries/:date', (req, res) => {
    const { date } = req.params;
    if (fs.existsSync(dbFile)) {
      const data = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
      const entries = data[date] || [];
      res.json(entries);
    } else {
      res.json([]);
    }
  });

  
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
