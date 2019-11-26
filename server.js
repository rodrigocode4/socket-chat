const express = require('express')
const path = require('path')
const ejs = require('ejs')
const os = require('os');

let hostname = os.networkInterfaces().wlp2s0.shift().address
const PORT = 3000

const address = {
    value: '',
    getURL() {
        return this.value
    },
    setURL(url) {
        this.value = url
    }
}

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
    res.setHeader('url', ).render('index.html')
})


const messages = []

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('receveIdMessage', data)
    })
})

server.listen(PORT, hostname, () => {
    let url = `http://${hostname}:${PORT}`
    address.setURL(url)
    console.log(`Server running port:`, address.getURL())
})