const express = require('express')
const path = require('path')
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
    res.render('index')
}

function formproject(req, res){
    res.render('add-blog')
}

function addproject(req, res){
    const data = req.body

    console.log(data);
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
