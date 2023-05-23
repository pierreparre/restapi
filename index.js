const port = 9001;

const express = require('express');
const app = express();

const courses = require('./courses.json');
const reservations = require('./reservations.json');

// use json middleware
app.use(express.json());

// list all courses
app.get('/courses', (req, res) => {
    res.status(200).json(courses);
});

// get details of a particular course
app.get('/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === req.params.id);
    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

