const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
})
con.connect();


const app = express()

var jsonParser = bodyParser.json()

const bodyencoded = app.use(bodyParser.urlencoded({ extended: false }))
/**
 * using for verify token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1]
        next()
    } else {
        res.json({
            status: 'failed',
            message: 'Header missing'
        })
    }
}
/**
 * using for form validation
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
const formValidation = (name, email, password) => {
    if (name === '' || email === '' || password === '') {
        if (name === '') {
            return {
                status: false,
                message: 'Please fill up name'
            }
        }
        if (email === '') {
            return {
                status: false,
                message: 'Please fill up email'
            }
        }
        if (password === '') {
            return {
                status: false,
                message: 'Please fill up password'
            }
        }
    } else {
        return {
            status: true,
            message: 'success'
        }
    }
}
/**
 * get all the user list
 */
app.get('/api/userList', verifyToken, (req, res) => {
    jwt.verify(req.token, 'asdf123', (err, authData) => {
        if (err) {
            res.json({
                status: 'failed',
                message: 'Token is not correct'
            })
        } else {
            con.query('select * from users', (err, result) => {
                if (err) {
                    res.json({
                        status: 'failed',
                        result: []
                    })
                } else {
                    res.json({
                        status: 'success',
                        result
                    })
                }
            })
        }
    })
})

/**
 * user sign up
 */
app.post('/api/signup', jsonParser, (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        const name = req.body.name || ''
        const email = req.body.email || ''
        const address = req.body.address || ''
        let password = req.body.password || ''
        const validation = formValidation(name, email, password);
        if (validation.status === true) {
            password = bcrypt.hashSync(password, 10)
            const username = name.split(' ')[0]+randomstring.generate(3);
            con.query(`insert into users (name,email,address,password,username) values ('${name}','${email}','${address}','${password}','${username}')`, (err, result) => {
                if (err) {
                    res.json({
                        status: 'failed',
                        result: []
                    })
                } else {
                    res.json({
                        status: 'success',
                        result
                    })
                }
            })
        } else {
            res.json({
                status: 'failed',
                message: validation.message
            })
        }
    } else {
        res.json({
            status: 'failed',
            message: 'Please fill up name,email,password,address'
        })
    }
})

/**
 * user login
 */
app.post('/api/login', jsonParser, (req, res) => {
    const username = req.body.username
    const password = req.body.password

    con.query(`select * from users where username = '${username}'`, (err, result) => {
        if (err) {
            res.json({
                status: 'failed',
                message: 'Username is not correct'
            })
        } else {
            const verifyPass = bcrypt.compareSync(password, result[0].password)
            if (verifyPass === false) {
                res.json({
                    status: 'failed',
                    message: 'password is not correct'
                })

            } else {
                jwt.sign({ user: result[0] }, 'asdf123', (err, token) => {
                    if (err) {
                        res.json({
                            status: 'failed',
                            message: 'Username or password is not correct'
                        })
                    } else {
                        res.json({
                            status: 'success',
                            token
                        })
                    }
                })
            }
        }
    })
})

/**
 * create new user
 */
app.post('/api/createUser', jsonParser, verifyToken, (req, res) => {
    jwt.verify(req.token, 'asdf123', (err, authData) => {
        if (err) {
            res.json({
                status: 'failed',
                message: 'Token is not correct'
            })
        } else {
            if (Object.keys(req.body).length !== 0) {
                const name = req.body.name || ''
                const email = req.body.email || ''
                const address = req.body.address || ''
                let password = req.body.password || ''
                const validation = formValidation(name, email, password);
                if (validation.status === true) {
                    password = bcrypt.hashSync(password, 10)
                    const username = name.split(' ')[0]+randomstring.generate(3);
                    con.query(`insert into users (name,email,address,password,username) values ('${name}','${email}','${address}','${password}','${username}')`, (err, result) => {
                        if (err) {
                            res.json({
                                status: 'failed',
                                result: []
                            })
                        } else {
                            res.json({
                                status: 'success',
                                result
                            })
                        }
                    })
                } else {
                    res.json({
                        status: 'failed',
                        message: validation.message
                    })
                }
            } else {
                res.json({
                    status: 'failed',
                    message: 'Please fill up name,email,password,address'
                })
            }
        }

    })
})

/**
 * update user 
 */
app.put('/api/updateUser/:id', jsonParser, verifyToken, (req, res) => {
    jwt.verify(req.token, 'asdf123', (err, authData) => {
        if (err) {
            res.json({
                status: 'failed',
                message: 'Token is not correct'
            })
        } else {
            if (Object.keys(req.body).length !== 0) {
                const id = req.params.id
                const name = req.body.name || ''
                const email = req.body.email || ''
                const address = req.body.address || ''
                let password = req.body.password || ''
                const validation = formValidation(name, email, password);
                if (validation.status === true) {
                    password = bcrypt.hashSync(password, 10)
                    con.query(`update users set name = '${name}',email = '${email}', password ='${password}' where id = ${id}`, (err, result) => {
                        if (err) {
                            res.json({
                                status: 'failed',
                                result: []
                            })
                        } else {
                            res.json({
                                status: 'success',
                                result
                            })
                        }
                    })
                } else {
                    res.json({
                        status: 'failed',
                        message: validation.message
                    })
                }
            } else {
                res.json({
                    status: 'failed',
                    message: 'Please fill up name,email,password,address'
                })
            }
        }

    })
})

/**
 * delete user
 */
app.delete('/api/deleteUser/:id',jsonParser,verifyToken,(req,res)=>{
    jwt.verify(req.token, 'asdf123', (err, authData) => {
        if (err) {
            res.json({
                status: 'failed',
                message: 'Token is not correct'
            })
        } else {
            const id = req.params.id;
            if(id){
                con.query(`delete from users where id = ${id}`,(err,result)=>{
                    if (err) {
                        res.json({
                            status: 'failed',
                            message: err.sqlMessage
                        })
                    } else {
                        res.json({
                            status: 'success',
                            message: 'Delete Successfully'
                        })
                    }
                })
            }else{
                res.json({
                    status: 'failed',
                    message: 'Please provide an ID'
                })
            }
        }
    })
})

app.listen(5000, () => {
    console.log('server started 5000')
})