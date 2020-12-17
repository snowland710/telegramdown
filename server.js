/* TESTED WITH NODE VERSION 14+ */

const express = require('express')
const app = express()
const https = require('https')
const port = process.env.PORT || 3000

// Use an Environment Variable to Secure Token Value
const BOT_TOKEN = <BOT_SECRET_TOKEN>
// For better CORS: https://expressjs.com/en/resources/middleware/cors.html
app.use( (req, res, next)  => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/', (req, res) => {
    res.sendStatus(200)
})

// Inspired by: https://stackoverflow.com/a/21024737
app.get('/fileDownload', (req, res) => {
    let uploadResponse = { ok: false, result: null, error: 404, description: 'Not Found' }
    if (req._parsedUrl && req._parsedUrl.query) {        
        const tel_file_path = 'https://api.telegram.org/file/bot' + BOT_TOKEN + req._parsedUrl.query
        https.get(tel_file_path, (response) => {
            const data = []
            response.on('data', (chunk) => {
                data.push(chunk)
            }).on('end', () => {                
                const buffer = Buffer.concat(data)
                res.send(buffer)
            })
        })
    } else {
        res.sendStatus(uploadResponse)
    }
})

app.listen(port)
