const express = require('express')
const path = require('path')
const dummy = require('../databases/blogs.json')
const hbs = require('hbs')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))


function formUpdate(req, res){
    const { id } = req.params
    const dummyData = {...dummy[id], id}
    res.render('update-blog', {data: dummyData})
}

function updateProject(req, res){
    let {id} = req.params
    const { pjkName, dateStart, dateEnd, desc, checkbox} = req.body

    data = dummy[id]

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
    }

    let check = []
    for (let i = 0; i < checkbox.length; i++){
        check.push(checkbox[i])
    }

    let projectTechno = ""
    for (let i = 0; i < check.length; i++){
      projectTechno += `<img src="svg/${check[i]}.svg">`
    }

    durationCount(dateStart,dateEnd)

    let duration="";
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

    const obj = {
        pjkName,
        dateStart,
        dateEnd,
        duration,
        desc,
        projectTechno
    }
    dummy.splice(id, 1, obj)
    res.redirect('/')
  }


module.exports = {formUpdate, updateProject}