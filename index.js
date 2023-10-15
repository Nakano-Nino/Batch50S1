const express = require('express')
const path = require('path')
const dummy = require('./mocks/blogs.json')
const hbs = require('hbs')
const { Console } = require('console')

const app = express()
const port = 5000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(express.static('src/assets'))

app.use(express.urlencoded({extended: false}))

app.listen(port, () => {
    console.log('App Listening on port 5000')
})

app.get('/', home)
app.get('/addproject', formproject)
app.post('/addproject', addproject)
app.get('/projectdetail', projectdetail)
app.get('/testimonials', testimonials)
app.get('/contactme', contactme)

function home(req, res){
    res.render('index', {dummy})
}

function formproject(req, res){
    res.render('add-blog')
}

function addproject(req, res){
    const { pjkName, dateStart, dateEnd, desc, checkbox} = req.body

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

    console.log(checkbox[0].value)

    let check = []
    for (let i = 0; i < checkbox.length; i++){
        if(checkbox[i].checked){
            check.push(checkbox[i].value)
            console.log(check)
        }
    }

    let projectTechno = ""
    for (let i = 0; i < check.length; i++){
      projectTechno += `<img src="svg/${check[i]}.svg"></img>`
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
        duration,
        desc,
        projectTechno
    }

    dummy.push(obj)
    res.redirect('/')
}

function projectdetail(req, res){
    res.render('blog-detail')
}

function testimonials(req, res){
    res.render('testimonial')
}

function contactme(req, res){
    res.render('contact-me')
}
