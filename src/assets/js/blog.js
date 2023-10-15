const addProject = []

function getData(event) {
  event.preventDefault()

  let pjkName = document.getElementById("pjkName").value
  let startDate = document.getElementById("dateStart").value
  let endDate = document.getElementById("dateEnd").value
  let desc = document.getElementById("desc").value
  let image = document.getElementById("input-blog-image").files

  function durationCount(start,end){
    let dateStart = new Date(start)
    let dateEnd = new Date(end)
    let daysBetween = 1000*60*60*24

    let timeDifference = dateEnd - dateStart
    let daysTotal = timeDifference / daysBetween
        daysRemaining = daysTotal % 30
    let MonthTotal = Math.floor(daysTotal/30)
    console.log(MonthTotal)

    days = daysRemaining
    months = MonthTotal

  }

  let checkbox = document.getElementsByName("checkbox")
  let check = []
  for (let i = 0; i < checkbox.length; i++){
    if(checkbox[i].checked){
      let checkOption = checkbox[i].value
      check.push(checkOption)
    }
  }

  durationCount(startDate,endDate)

  image = URL.createObjectURL(image[0])

  const obj = {
    pjkName,
    days,
    months,
    desc,
    projectTechno:check,
    image
  }

  addProject.push(obj)
  renderBlog()
}

function renderBlog() {
  document.getElementById("content").innerHTML = ""

  for(let i = 0; i < addProject.length; i++) {
    
    let project = addProject[i]

    let projectTechno = ""
    for (let i = 0; i < project.projectTechno.length; i++){
      projectTechno += `<img src="./asset/svg/${project.projectTechno[i]}.svg"></img>`
    }

    let duration="";
    if(project.months === 0){
      duration +=`
      ${project.days} Hari
      `
    } else if (project.months === 1){
      duration += `
      ${project.months} Bulan ${project.days} Hari
      `
    } else{
        duration += `
        ${project.months} Bulan ${project.days} Hari
        `
      }
    
    document.getElementById("content").innerHTML += `
    <div class="pjk-container">
      <img src="${project.image}" alt="picture" class="img-size">
      <p style="padding-top: 10px; margin: auto; font-weight: bold;">${project.pjkName}</p>
      <p style="padding-top: 5px; padding-bottom: 5px; margin: auto; font-size: small;">Durasi : ${duration}</p>
      <div class="desc-container">
        <p class="pjk-text">${project.desc}</p>
      </div>  
      <p>
        ${projectTechno}
      </p>
      <div class="pjk-btn">
        <button style="margin-right:10px;" class="btn-size">Edit</button>
        <button class="btn-size">Delete</button>
      </div>
    </div>`
  }

}