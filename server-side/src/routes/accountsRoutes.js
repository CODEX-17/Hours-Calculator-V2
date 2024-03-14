const express = require('express')
const router = express.Router()
const db = require('../db')


router.get('/getAccounts', (req, res) => {
    const query = 'SELECT * FROM accounts'

    db.query(query, (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).send(data)
        }
    })
})

router.post('/addAccounts', (req, res) => {
    const acct_id = req.body.acct_id
    const username = req.body.username

    const query = 'INSERT INTO accounts(acct_id, username) VALUES(?,?)'

    db.query(query,[acct_id, username], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).send({ message: "Successfully added account." })
        }
    })
})

router.put('/updateAccounts', (req, res) => {
    const acct_id = req.body.acct_id
    const newUsername = req.body.username

    const query = 'UPDATE accounts SET username=? WHERE acct_id=?'

    db.query(query,[newUsername, acct_id], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json({ message: "Successfully update accounts info." })
        }
    })
})


module.exports = router