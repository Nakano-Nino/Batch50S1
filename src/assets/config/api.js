const request = require('request')

async function fetchdata() {
    const api = "https://api.npoint.io/c99c241d2863a1d9f5a4"

    const response = await request.get(api,(error, response, body) => {
        if(error) {
            return console.dir(error)
        }
        return JSON.parse(body)
    })
    return response
}

module.exports = fetchdata