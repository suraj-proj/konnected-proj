const db = require('../utils/db').pool
const jwt = require('jsonwebtoken')

const strUrl = (str) => {
    const resStr = str.replaceAll(' ', '-').toLowerCase()
    console.log(resStr);
    return resStr;
}

const getBooks = (req, res) => {
    const q = req.query.tag ?
    `SELECT b.name as bname, l.name as lname, b.id as bid, l.id as lid, * FROM books b JOIN levels l ON b.level=l.id WHERE tag='${req.query.tag}' AND b.is_verified='1';` :
    "SELECT b.name as bname, l.name as lname, b.id as bid, l.id as lid, * FROM books b JOIN levels l ON b.level=l.id WHERE b.is_verified='1';";
    console.log(q);
    db.query(q, (err, data) => {
        if (err) return res.send(err);
        console.log(data.rows);
        return res.status(200).json(data.rows);
    })
}

const getBooksByLevel = (req, res) => {
    console.log("Here is get book by level");
    const q = `SELECT b.name as bname, l.name as lname, b.id as bid, l.id as lid, * FROM books b JOIN levels l ON b.level=l.id WHERE l.sl_name='${req.params.level}' AND b.is_verified='1';`
    console.log(q);
    db.query(q, (err, data) => {
        if (err) return res.send(err);
        console.log(data.rows);
        return res.status(200).json(data.rows);
    })
}

const getBook = (req, res) => {
    console.log("Here is get book by name");
    const q = `SELECT b.name as bname, l.name as lname, b.id as bid, l.id as lid, * FROM books b JOIN levels l ON b.level=l.id WHERE b.s_name ILIKE '${req.params.name}' AND b.id=${req.params.id} AND b.is_verified='1';`
    console.log(q);
    db.query(q, (err, data) => {
        if (err) return res.send(err);
        console.log(data.rows);
        return res.status(200).json(data.rows);
    })
}

const addBook = (req, res) => {
    const token = req.session.token;
    console.log(token);
    if (!token) return res.status(401).json("Not Authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const s_name = strUrl(req.body.bname)

        const q = `INSERT INTO books (name,description,level,author,is_verified,s_name)
        VALUES('${req.body.bname}', '${req.body.bdescription}', '${req.body.blevel}', '${req.body.bauthor}',
            '', '${s_name}');`
        console.log(q);

        db.query(q,(err,data)=>{
            if (err) return res.status(500).json(err.message);
            return res.json("Book has been submitted! Please wait at least 24 hours for review.");
        })
    });
}

module.exports = {
    getBooks,
    getBooksByLevel,
    getBook,
    addBook
}