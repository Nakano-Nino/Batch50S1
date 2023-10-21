const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')

const config = require('../../config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const { log } = require('console')
const sequelize = new Sequelize(config.development)

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(flash())

app.use(session({
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 2
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: 'dumbways'
}))

function formRegis(req, res){
    if(!req.session.isLogin){
        res.render('register', {
            isLogin: req.session.isLogin,
            user: req.session.user
        })
    }else{
        res.redirect('/')
    }
}

async function register(req, res){
    try {  
        const { name, email, password } = req.body
    
        await bcrypt.hash(password, 10, (err, password) => {
            const query = `INSERT INTO tb_users(name, email, password) values('${name}', '${email}', '${password}')`
            sequelize.query(query, {type: QueryTypes.INSERT})
        })
        res.redirect('/login')
    } catch (error) {
        console.log((error));
    }

}

module.exports = {formRegis, register}