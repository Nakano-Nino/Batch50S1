const express = require('express')
const path = require('path')
const hbs = require('hbs')

const config = require('../../config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

async function formUpdate(req, res){

  try {
    const { id } = req.params
    const query = `SELECT name, start_date, end_date, description, technologies, image FROM tb_projects where id=${id}`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    const dummyData = {...obj[0], id}

    if(!req.session.isLogin){
      req.flash('danger', "Login first")
      res.redirect('/login')
    }else{
      res.render('update-blog', {
        data: dummyData,
        isLogin: req.session.isLogin,
        user: req.session.user
      })
  }

    

  } catch (error) {
    console.log(error);
  }
}

async function updateProject(req, res){
    

    // const updatedData = {
    //   pjkName,
    //   dateStart,
    //   dateEnd,
    //   desc,
    //   checkbox
    // }

    try {
      const { id } = req.params
      const { pjkName, dateStart, dateEnd, desc, checkbox} = req.body

      console.log(checkbox);

      const query = `UPDATE tb_projects SET name='${pjkName}', start_date='${dateStart}', end_date='${dateEnd}', description='${desc}', technologies='{${checkbox}}', image='nino' WHERE id='${id}'`
      let obj = await sequelize.query(query, { type: QueryTypes.UPDATE })
      res.redirect('/')
    } catch (error) {
      console.log(error);
    }
  }


module.exports = {formUpdate, updateProject}