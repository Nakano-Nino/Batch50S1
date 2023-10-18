const express = require('express')
const path = require('path')
const hbs = require('hbs')

const config = require('../../config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

async function home(req, res){
    try {
        // const { id } = req.params 
        const query = "SELECT id, name, start_date, end_date, description, technologies, image FROM tb_projects"
        let obj = await sequelize.query(query, { type: QueryTypes.SELECT })


        let data = []

        for (let i = 0; i < obj.length; i++){
            let object = {
                id: obj[i].id,
                name: obj[i].name,
                duration: durationCount(obj[i].start_date,obj[i].end_date),
                desc: obj[i].description,
                tech: obj[i].technologies

            }
            data.push(object)
        }
        

        res.render('index', {dummy: data})
        

    } catch (error) {
        console.log(error);
    }
}

function durationCount(start,end){
    let dateStart = new Date(start)
    let dateEnd = new Date(end)
    let daysBetween = 1000*60*60*24

    let timeDifference = dateEnd - dateStart
    let daysTotal = timeDifference / daysBetween
        daysRemaining = daysTotal % 30
    let MonthTotal = Math.floor(daysTotal/30)

    days = daysRemaining
    months = MonthTotal

    let duration = ""
    if(months === 0){
        duration +=`
        ${days} Hari
        `
        } else if (months === 1){
        duration += `
        ${months} Bulan ${days} Hari
        `
        } else{
            duration += `
            ${months} Bulan ${days} Hari
            `
        }
    return duration
}

module.exports = {home}
