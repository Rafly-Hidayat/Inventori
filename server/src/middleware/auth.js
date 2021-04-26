const con = require ('../config/db')
const jwt = require ('jsonwebtoken')
require('dotenv').config

module.exports = {

    login: (req, res) => {
        const post = {
            password: req.body.password,
            email: req.body.email
        }

        con.query(`SELECT * FROM admin WHERE password = ? AND email = ?`,[post.password, post.email], (err, rows) => {
            if (err) res.send(err.sqlMessage, 400)

            if(rows.length == 1){
                let token = jwt.sign({rows}, process.env.SECRET, {expiresIn: 1000})

                const kd_admin = rows[0].kd_admin

                const data = {
                    kd_admin: kd_admin,
                    akses_token: token
                }
    
                con.query (`INSERT INTO akses_token SET ?`,[data], (err, rows) => {
                    if(err) return res.send(err.sqlMessage, 400)
                    res.json ({
                        status: true,
                        message: 'Berhasil menggenerate token',
                        token: token,
                        kd_admin: kd_admin
                    })
                })
            } else {
                return res.json({error: true, message: 'email atau password salah'})
            }

        })
    },

    inventori: (req, res) => {
        res.send("ini adalah halaman inventori")
    }

}