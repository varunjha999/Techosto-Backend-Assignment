const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Placeholder for timesheet data
let timesheetEntries = [];

// GET all timesheet entries
app.get('/timesheet', (req, res) => {
  res.json(timesheetEntries);
  console.log('Timesheet entries retrieved successfully');
});

// GET a specific timesheet entry by ID
app.get('/timesheet/:id', (req, res) => {
  const entryId = req.params.id;
  const entry = timesheetEntries.find((entry) => entry.id === entryId);

  if (!entry) {
    return res.status(404).json({ message: 'Timesheet entry not found' });
  }

  res.json(entry);
});

// POST a new timesheet entry
app.post('/timesheet', (req, res) => {
  const newEntry = req.body;
  timesheetEntries.push(newEntry);
  res.status(201).json({ message: 'Timesheet entry created successfully' });
});

// PUT (update) an existing timesheet entry
app.put('/timesheet/:id', (req, res) => {
  const entryId = req.params.id;
  const updatedEntry = req.body;
  const entryIndex = timesheetEntries.findIndex((entry) => entry.id === entryId);

  if (entryIndex === -1) {
    return res.status(404).json({ message: 'Timesheet entry not found' });
  }

  timesheetEntries[entryIndex] = updatedEntry;
  res.json({ message: 'Timesheet entry updated successfully' });
});

// DELETE a timesheet entry
app.delete('/timesheet/:id', (req, res) => {
  const entryId = req.params.id;
  const entryIndex = timesheetEntries.findIndex((entry) => entry.id === entryId);

  if (entryIndex === -1) {
    return res.status(404).json({ message: 'Timesheet entry not found' });
  }

  timesheetEntries.splice(entryIndex, 1);
  res.json({ message: 'Timesheet entry deleted successfully' });
});

// Start the server
app.listen(7000, () => {
  console.log('Server is running on port 7000');
});
