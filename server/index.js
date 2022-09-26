const express = require("express")
const path = require('path')
const mongoose = require('mongoose')

const {login} = require('./middleware/login')
const {signup} = require('./middleware/signup')
const {jwtAuth} = require('./middleware/jwtAuth')
const loginRoute = require('./routes/loginRoute')
const signupRoute = require('./routes/signupRoute')

const app = express();
const PORT = 8080

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


app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client//dist/index.html'))
})

app.listen(PORT, () =>{
  console.log(`app is running on http://localhost:${PORT}`);
})