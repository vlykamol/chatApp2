const express = require("express")
const http = require('http')

const path = require('path')
const mongoose = require('mongoose')
const {Server} = require('socket.io')
const cors = require('cors')


const {login} = require('./middleware/login')
const {signup} = require('./middleware/signup')
const {jwtAuth} = require('./middleware/jwtAuth')
const loginRoute = require('./routes/loginRoute')
const signupRoute = require('./routes/signupRoute')

const PORT = 8080


const app = express();
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
  cors :{
    origin : "http://localhost:5173",
    methods : ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


mongoose.connect('mongodb://localhost:27017/chatApp2', () => console.log('database connected'))

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(express.json())


const posts = [1,2,3,5,6]

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/login-data', login, loginRoute)
app.post('/signup-data', signup, signupRoute)

app.get('/post/all', jwtAuth, (req, res) => {
  res.json({posts: posts})
})


io.on('connection', (socket) => {
  console.log('new user connected', socket.id);

  socket.on('messageAll', message => {
    console.log('message to all', message);
    socket.broadcast.emit('messageAll', message)
  })
  
  socket.on('createNewRoom', data =>{
    const {user, roomName} = data
    console.log(user, 'created new room', roomName);
    socket.join(roomName)
  })

  socket.on('joinRoom', data => {
    const {user, roomName} = data
    console.log(user, 'joined room', roomName);
    socket.join(roomName)
  })
  

  socket.on('message', data => {
    const { user, roomName, message} = data
    socket.to(roomName).emit('message', {roomName, user,message})
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