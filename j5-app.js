// Board control
var five = require('johnny-five');
var board = new five.Board();

// Board code
var led;
var ledON = false;
board.on("ready", function () {
	led = new five.Led(13);
});

// Web Server
var express = require('express');
var app = express();

// Web Server config
app.get('/toggleLed', function (req, res) {
	ledON = parseInt(req.query.status);

	console.log("Toggling LED. Current state: " + ledON);

	// toggle led
	if (ledON) {
		led.on();
	} else {
		led.off();
	}

	var html="";
	// indicator
	html += '<p style="display: block">'+'Current status: ' + (ledON)?"Activated":"Deactivated"+'</p>';

	// toggle buttons
	html += '<a href="?status=0" style="display: block">Turn off</a>';
	html += '<a href="?status=1" style="display: block">Turn on</a>';

	res.send(html);
});

app.listen(3000);
