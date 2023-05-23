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
        res.status(404).json({message: 'Course not found'});
    }
});

// delete a course
app.delete('/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === req.params.id);
    if (course) {
        courses.splice(courses.indexOf(course), 1);
        res.status(200).json(course);
    } else {
        res.status(404).json({message: 'Course not found'});
    }
});

// add a reservation
app.post('/reservations', (req, res) => {
    const course = courses.find(course => course.id === req.body.courseId);
    if (!course) {
        res.status(404).json({message: 'Course not found'});
    }

    const reservation = {
        id: reservations.length + 1,
        courseId: course.id,
        studentName: req.body.studentName,
        studentNumber: req.body.studentNumber
    };
    reservations.push(reservation);
    res.status(200).json(reservation);
});

// list all reservations
app.get('/reservations', (req, res) => {
    res.status(200).json(reservations);
});

// get details of a particular reservation
app.get('/reservations/:id', (req, res) => {
    const reservation = reservations.find(reservation => reservation.id === req.params.id);
    if (!reservation) {
        res.status(404).json({message: 'Reservation not found'});
    }
    res.status(200).json(reservation);
});

