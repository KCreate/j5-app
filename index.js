// Board control
var five = require('johnny-five')
var board = new five.Board()

// Web Server
var express = require('express')
var app = express()

app.get("/", function (req, res) {
  res.sendFile(__dirname, "index.html")
})

app.get("/", express.static("."))

// Web Server config
let value = 0
let buzzer
app.get("/write", function (req, res) {
	value = req.query.status
	console.log("writing: " + value)

  piezo.play({
    song: req.query.status,
    beats: parseFloat(req.query.beats),
    tempo: parseInt(req.query.tempo)
  })

	res.send(".")
})

board.on("ready", function () {
	piezo = new five.Piezo(7)
	app.listen(3000)
	console.log("Server ready at localhost:3000")
})
