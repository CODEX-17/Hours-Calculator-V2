const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/getHoursById/:acct_id', (req, res) => {
    const acct_id = req.params.acct_id;
    const query = 'SELECT * FROM hours WHERE acct_id=?';

    db.query(query,[acct_id], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error);
        } else {
            return res.status(200).json(data);
        }
    });
});

router.post('/addHours', (req, res) => {
    const acct_id = req.body.acct_id;
    const date = req.body.date;
    const morning_start = req.body.morning_start
    const morning_end = req.body.morning_end
    const afternoon_start = req.body.afternoon_start
    const afternoon_end = req.body.afternoon_end
    const query = 'INSERT INTO hours(acct_id, date, morning_start, morning_end, afternoon_start, afternoon_end) VALUES(?,?,?,?,?,?)'

    db.query(query,[acct_id, date, morning_start, morning_end, afternoon_start, afternoon_end], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error);
        } else {
            return res.status(200).json({ message: 'Sucessfully time added.'});
        }
    })

})


module.exports = router;