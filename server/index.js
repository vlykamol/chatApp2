const express = require("express")
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
const PORT = 8080

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(express.json())


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client//dist/index.html'))
})
app.post('/login-data', (req, res) =>{
  console.log(req.body);
  res.send({status : "ok"})
})

app.listen(PORT, () =>{
  console.log(`app is running on http://localhost:${PORT}`);
})