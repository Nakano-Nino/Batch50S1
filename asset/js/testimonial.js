const dataTestimonial = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()

  xhr.open("GET", "https://api.npoint.io/c99c241d2863a1d9f5a4")

  xhr.onload = function (){
    if(xhr.status == 200){
      resolve(JSON.parse(xhr.response))
    }else{
      reject("Error Loading Data")
    }
  }

  xhr.onerror = function (){
    reject("Network Error")
  }

  xhr.send()
})

  async function testimonial(){
    try {
      const resp = await dataTestimonial
      let setTestimonial = ""

      resp.forEach(item => {
        setTestimonial += `
        <div class="testimonial">
          <img src=${item.image} class="profile-testimonial" />
          <p class="quote">${item.comment}</p>
          <p class="author">- ${item.name}</p>
        </div>`
      })

      document.getElementById("testimonials").innerHTML = setTestimonial
    } catch (error) {
      console.log(error)
    }
  }

 testimonial()

 async function filterTestimonial(rating){
  try {
    const resp = await dataTestimonial

    let setTestimonial = ""

    const filteredData = resp.filter(data => data.rating === rating)
    console.log(filteredData)

    if(filteredData.length === 0){
      setTestimonial = `<h2>Data Not Found</h2>`
    }else{
      filteredData.forEach(item => {
        setTestimonial += `
          <div class="testimonial">
            <img src=${item.image} class="profile-testimonial" />
            <p class="quote">${item.comment}</p>
            <p class="author">- ${item.name}</p>
          </div>`
      })
    }

    document.getElementById("testimonials").innerHTML = setTestimonial

  } catch (error) {
    console.log(error);
  }
 }

