// Board control
var five = require('johnny-five');
var board = new five.Board();

// Web Server
var express = require('express');
var app = express();

// Board code
var led;
var ledON = false;
board.on("ready", function () {
	led = new five.Led(13);
	app.listen(3000);
	console.log("Server ready at port 3000");
});

// Web Server config
app.get('/', function (req, res) {
	ledON = parseInt(req.query.status);

	console.log("Toggling LED. Current state: " + ledON);

	// toggle led
	if (ledON) {
		led.on();
	} else {
		led.off();
	}

	// browser controls
	var html="<style>*{padding:0;margin:0;box-sizing:border-box;}</style>";
	html += '<a href="?status=0" style="display: block; height: 45vh; background-color:#e74c3c"></a>';
	html += '<a href="?status='+!ledON*1+'" style="display: block; height: 10vh; background-color:#9b59b6"></a>';
	html += '<a href="?status=1" style="display: block; height: 45vh; background-color:#2ecc71"></a>';

	res.send(html);
});
