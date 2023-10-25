const express = require('express')
const path = require('path')
const dummy = require('./src/assets/databases/blogs.json')
const dummyTest = require('./src/assets/databases/testimonial.json')
const hbs = require('hbs')
const flash = require('express-flash')
const session = require('express-session')
const bcrypt = require('bcrypt')

const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

const update = require('./src/assets/js/updateProject')
const add = require('./src/assets/js/addProject')
const regis = require('./src/assets/js/regis')
const upload = require('./src/middlewares/uploadFile')


const app = express()
const port = 5000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(express.static('src/assets'))
app.use(express.static('src/uploads'))

app.use(express.urlencoded({extended: false}))

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
    secret: 'Dumbways'
  })
)

app.listen(port, () => {
    console.log('App Listening on port 5000')
})

app.get('/', home)
app.get('/login', formLogin)
app.post('/login', login)
app.get('/logout', logout)
app.get('/register', regis.formRegis)
app.post('/register', regis.register)
app.get('/addproject', add.formproject)
app.post('/addproject', upload.single('image'), add.addproject)
app.get('/projectdetail/:id', projectdetail)
app.get('/testimonials', testimonials)
app.get('/contactme', contactme)
app.get('/updateproject/:id', update.formUpdate)
app.post('/updateproject/:id', upload.single('image'), update.updateProject)
app.get('/deleteproject/:id', deleteproject)

async function projectdetail(req, res){
    try {
        const { id } = req.params

        const query = `SELECT tb_projects.name, start_date, end_date, description, technologies, image, tb_users.name AS author FROM tb_projects LEFT JOIN tb_users ON tb_projects.author = tb_users.id WHERE tb_projects.id=${id}`
        let obj = await sequelize.query(query, { type: QueryTypes.SELECT })

        let duration = durationCount(obj[0].start_date,obj[0].end_date)

        start_date = new Date(obj[0].start_date)
        startDate = start_date.getDate()+' '+start_date.toString().substr(4,3)+' '+start_date.getFullYear();

        end_date = new Date(obj[0].end_date)
        endDate = end_date.getDate()+' '+end_date.toString().substr(4,3)+' '+end_date.getFullYear();

        const dummyData = {
            ...obj[0],
            startDate,
            endDate,
            duration
        }

            res.render('blog-detail', {
                data: dummyData,
                isLogin: req.session.isLogin,
                user: req.session.user
            })
    } catch (error) {
        console.log(error);
    }

}

function testimonials(req, res){
    res.render('testimonial', {
        dummyTest,
        isLogin: req.session.isLogin,
        user: req.session.user
    })
}

function contactme(req, res){
    res.render('contact-me', {
        isLogin: req.session.isLogin,
        user: req.session.user
    })
}

async function deleteproject(req, res){
    if(!req.session.isLogin){
        req.flash('danger', "Login First")
        res.redirect('/login')
    }else{
        const { id } = req.params
    
        const query = `DELETE FROM tb_projects WHERE id='${id}'`
        await sequelize.query(query, { type: QueryTypes.DELETE })
    
        res.redirect('/')
    }
   
}

function formLogin(req, res){
    if(!req.session.isLogin){
        res.render('login')
    }else{
        res.redirect('/')
    }
    
}

async function home(req, res){
    try {
        const query = "SELECT tb_projects.id, tb_projects.name, start_date, end_date, description, technologies, image, tb_users.name AS author FROM tb_projects LEFT JOIN tb_users ON tb_projects.author = tb_users.id ORDER BY tb_projects.id DESC"
        let obj = await sequelize.query(query, { type: QueryTypes.SELECT })


        let data = []
        let buttonIf = Boolean

        for (let i = 0; i < obj.length; i++){
            if(req.session.user == obj[i].author){
                buttonIf = true
            }else{
                buttonIf = false
            }
            let object = {
                id: obj[i].id,
                name: obj[i].name,
                duration: durationCount(obj[i].start_date,obj[i].end_date),
                desc: obj[i].description,
                tech: obj[i].technologies,
                image: obj[i].image,
                author: obj[i].author,
                isLogin: req.session.isLogin,
                ifclause: buttonIf

            }
            data.push(object)
        }

        res.render('index', {
            dummy: data,
            isLogin: req.session.isLogin,
            user: req.session.user,
        })

    } catch (error) {
        console.log(error);
    }
}

async function login(req, res){
    try {
        const { email, password } = req.body

        const query = `SELECT * FROM tb_users WHERE email='${email}'`
        let obj = await sequelize.query(query, {type: QueryTypes.SELECT})

        if (!obj.length){
            req.flash('danger', "User has not been registered")
            return res.redirect('/login')
        }

        await bcrypt.compare(password, obj[0].password, (err, result) => {
            if (!result){
                req.flash('danger', 'password is wrong')
                return res.redirect('/login')
            }else {
                req.session.isLogin = true,
                req.session.user = obj[0].name
                req.session.idUser = obj[0].id
                req.flash('success', "Login Success")
                req.flash('danger', "Password is wrong")
                return res.redirect('/')
            }
        })

    } catch (error) {
        console.log(error);
    }
}

function logout(req, res){
    if (req.session.isLogin){
        req.session.destroy((error) => {
            if(error){
                console.log(error);
            }else{
                res.redirect('/login')
            }
        })
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

