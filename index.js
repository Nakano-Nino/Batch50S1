const express = require('express')
const path = require('path')
const dummy = require('./src/assets/databases/blogs.json')
const dummyTest = require('./src/assets/databases/testimonial.json')
const hbs = require('hbs')

var update = require('./src/assets/js/updateProject')
var add = require('./src/assets/js/addProject')

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
app.get('/addproject', add.formproject)
app.post('/addproject', add.addproject)
app.get('/projectdetail/:id', projectdetail)
app.get('/testimonials', testimonials)
app.get('/contactme', contactme)
app.get('/updateproject/:id', update.formUpdate)
app.post('/updateproject/:id', update.updateProject)
app.get('/deleteproject/:id', deleteproject)

function home(req, res){
    res.render('index', {dummy})

    // const dump = dum
}

function projectdetail(req, res){
    const { id } = req.params

    res.render('blog-detail', {dummy})
}

function testimonials(req, res){
    res.render('testimonial', {dummyTest})
}

function contactme(req, res){
    res.render('contact-me')
}

function deleteproject(req, res){
    const { id } = req.params

    dummy.splice(id, 1)
    res.redirect('/')
}