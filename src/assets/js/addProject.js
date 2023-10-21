const express = require('express')
const path = require('path')
const hbs = require('hbs')
const flash = require('express-flash')

const config = require('../../config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

const app = express()

app.use(flash())
app.use(express.static('src/uploads'))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

function formproject(req, res){
    if(!req.session.isLogin){
        req.flash('danger', "Login first")
        res.redirect('/login')
    }else{
        res.render('add-blog', {
            isLogin: req.session.isLogin,
            user: req.session.user
        })
    }
}

async function addproject(req, res){
    try {
        const { pjkName, dateStart, dateEnd, desc, checkbox} = req.body
        const idUser = req.session.idUser
        const image = req.file.filename

        const query = `INSERT INTO tb_projects(name, start_date, end_date, description, technologies, image, author) values('${pjkName}', '${dateStart}', '${dateEnd}', '${desc}', '{${checkbox}}', '${image}','${idUser}')`

        await sequelize.query(query, {type: QueryTypes.INSERT})
        res.redirect('/')

    } catch (error) {
        console.log(error);
    }
}

module.exports = {formproject, addproject}