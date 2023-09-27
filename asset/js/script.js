function getData(){
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    if (name == ""){
        return alert("nama tidak boleh kosong")
    } else if (email == ""){
        return alert("email tidak boleh kosong")
    } else if (phone == ""){
        return alert("nomor telpon tidak boleh kosong")
    } else if (subject == ""){
        return alert("subject harus dipilih")
    } else if (message == ""){
        return alert("pesan tidak boleh kosong")
    }

    const emailReceiver = "yudhaprasty17@gmail.com"
    let a = document.createElement("a")
    a.href = `mailto:${emailReceiver}?subject=${subject}&body= Halo, Saya ${name}, tolong hubungi nomor saya ${phone} untuk membahas sesuatu ${message}`
    a.click()

    let data = {
        name,
        email,
        phone,
        subject,
        message
    }

    console.log(data)
}
