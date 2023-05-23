const port = 9001;

const express = require('express');
const app = express();

const courses = require('./courses.json');
const reservations = require('./reservations.json');

// use json middleware
app.use(express.json());

/***
 * Endpoint GET /courses
 * Get all the courses
 * @returns {Array} list of courses
 */
app.get('/courses', (req, res) => {
    res.status(200).json(courses);
});

/***
 * Endpoint GET /courses/:id
 * Get all the details of a particular course
 * @returns {Object} course details
 */
app.get('/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === req.params.id);
    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404).json({message: 'Course not found'});
    }
});

/***
 * Endpoint DELETE /courses/:id
 * Delete a particular course
 * @returns {Object} deleted course
 */
app.delete('/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === req.params.id);
    if (course) {
        courses.splice(courses.indexOf(course), 1);
        res.status(200).json(course);
    } else {
        res.status(404).json({message: 'Course not found'});
    }
});

/***
 * Endpoint POST /reservations
 * Create a new reservation for a course
 * @returns {Object} reservation details
 */
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

/***
 * Endpoint GET /reservations
 * Get all the reservations
 * @returns {Array} list of reservations
 */
app.get('/reservations', (req, res) => {
    res.status(200).json(reservations);
});

/***
 * Endpoint GET /reservations/:id
 * Get all the details of a particular reservation
 * @returns {Object} reservation details
 */
app.get('/reservations/:id', (req, res) => {
    const reservation = reservations.find(reservation => reservation.id === req.params.id);
    if (!reservation) {
        res.status(404).json({message: 'Reservation not found'});
    }
    res.status(200).json(reservation);
});

/***
 * Endpoint PUT /reservations/:id
 * Update a particular reservation
 * @returns {Object} updated reservation
 */
app.put('/reservations/:id', (req, res) => {
    const reservation = reservations.find(reservation => reservation.id === req.params.id);
    if (!reservation) {
        res.status(404).json({message: 'Reservation not found'});
    }
    // check if the parameters has been passed
    if (req.body.studentName) reservation.studentName = req.body.studentName;
    if (req.body.studentNumber) reservation.studentNumber = req.body.studentNumber;

    res.status(200).json(reservation);
});

/***
 * Endpoint DELETE /reservations/:id
 * Delete a particular reservation
 * @returns {Object} deleted reservation
 */
app.delete('/reservations/:id', (req, res) => {
    const reservation = reservations.find(reservation => reservation.id === req.params.id);
    if (!reservation) {
        res.status(404).json({message: 'Reservation not found'});
    }
    reservations.splice(reservations.indexOf(reservation), 1);
    res.status(200).json(reservation);
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});