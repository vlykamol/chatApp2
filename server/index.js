const express = require("express")
const http = require('http')
const path = require('path')
const mongoose = require('mongoose')
const {Server} = require('socket.io')

//middlewares
const {signup} = require('./middleware/signup')
// const {jwtAuth} = require('./middleware/jwtAuth')

//routes and controllers
const loginRoute = require('./routes/loginRoute')
const signupRoute = require('./routes/signupRoute')
const roomRoute = require('./routes/roomRoute')
const contactRoute = require('./routes/contactRoute')

//server setup
const PORT = 8080
const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors :{
    origin : "http://localhost:5173",
    methods : ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

//database connection
mongoose.connect('mongodb://localhost:27017/chatApp2', () => console.log('database connected'))


app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/login-data', loginRoute)
app.post('/signup-data', signup, signupRoute)

app.use('/rooms', roomRoute)
app.use('/contacts', contactRoute)


//socket.io----------------------
io.on('connection', (socket) => {
  console.log('new user connected', socket.id);

  socket.on('messageAll', data => {
    const {user, message} = data
    socket.broadcast.emit('messageAll', {user, message})
  })

  socket.on('joinRoom', data => {
    const {userName, roomName} = data
    console.log(userName, 'joined room',roomName);
    socket.join(roomName)
  })  

  socket.on('message', data => {
    const { user, roomName, message} = data
    console.log('message recived', user.user, roomName, message);
    socket.to(roomName).emit('message', {roomName, user: user.user,message})
  })

  socket.on('disconnect', () =>{
    console.log('disconnected', socket.id);
  }) 
})


app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client//dist/index.html'))
})

server.listen(PORT, () =>{
  console.log(`app is running on http://localhost:${PORT}`);
})