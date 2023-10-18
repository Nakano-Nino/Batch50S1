const express = require('express')
const path = require('path')
const hbs = require('hbs')

const config = require('../../config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

function formproject(req, res){
    res.render('add-blog')
}

async function addproject(req, res){
    try {
        const { pjkName, dateStart, dateEnd, desc, checkbox} = req.body

        const query = `INSERT INTO tb_projects(name, start_date, end_date, description, technologies, image) values('${pjkName}', '${dateStart}', '${dateEnd}', '${desc}', '{${checkbox}}', 'nino')`

        const obj = await sequelize.query(query, {type: QueryTypes.INSERT})
        res.redirect('/')

    } catch (error) {
        console.log(error);
    }
}

module.exports = {formproject, addproject}