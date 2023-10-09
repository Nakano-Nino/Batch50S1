const dataTestimonial = [
    {
      name: "Dendy Syah",
      comment: "Mantap",
      rating: 5,
      image: "https://c4.wallpaperflare.com/wallpaper/380/525/157/anime-masamune-kun-s-revenge-aki-adagaki-hd-wallpaper-preview.jpg"
    },
    {
      name: "Dandy Adhitya",
      comment: "Okelah",
      rating: 4,
      image: "https://c4.wallpaperflare.com/wallpaper/380/525/157/anime-masamune-kun-s-revenge-aki-adagaki-hd-wallpaper-preview.jpg"
    },
    {
      name: "Juan David",
      comment: "I'm Batman",
      rating: 5,
      image: "https://c4.wallpaperflare.com/wallpaper/380/525/157/anime-masamune-kun-s-revenge-aki-adagaki-hd-wallpaper-preview.jpg"
    },
    {
      name: "Ken",
      comment: "bruh",
      rating: 5,
      image: "https://c4.wallpaperflare.com/wallpaper/380/525/157/anime-masamune-kun-s-revenge-aki-adagaki-hd-wallpaper-preview.jpg"
    }
  ]

  function testimonial(){
    let setTestimonial = ""

    dataTestimonial.forEach(item => {
      setTestimonial += `
      <div class="testimonial">
        <img src=${item.image} class="profile-testimonial" />
        <p class="quote">${item.comment}</p>
        <p class="author">- ${item.name}</p>
      </div>`
    })

    document.getElementById("testimonials").innerHTML = setTestimonial
  }

 testimonial()

 function filterTestimonial(rating){
  let setTestimonial = ""

  const filteredData = dataTestimonial.filter(data => data.rating === rating)
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
 }

