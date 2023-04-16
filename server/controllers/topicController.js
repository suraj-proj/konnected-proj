const db = require('../utils/db').pool
const jwt = require('jsonwebtoken')

const strUrl = (str) => {
    const resStr = str.replaceAll(' ', '-').toLowerCase()
    console.log(resStr);
    return resStr;
}

const getTopics = (req, res) => {
    console.log(req.session.token);
    console.log('Id is here')
    const q = `SELECT b.name as bname, t.name as tname, b.id as bid, t.id as tid, * 
        FROM topics t JOIN books b ON t.book=b.id WHERE b.id='${req.params.bid}' AND b.is_verified='1';`;
    console.log(q);
    db.query(q, (err, data) => {
        if (err) return res.send(err);
        console.log(data.rows);
        return res.status(200).json(data.rows);
    })
}

module.exports = {
    getTopics
}