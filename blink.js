var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
    board = new five.Board();
var i = 0;
var n=0;
var p = 0;
board.on("ready", function() {
	
  // Create an Led on pin 13 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
  var led = new five.Led(11);
  for ( i = 0; i<=0; i++){
  	
  	setInterval(function(){
  		led.brightness(n); 
  		console.log(n);
  		if (n==0){
  			p = 1;
  		}
  		if (n==255){
  			p = -1;
  			console.log(p);
  		}
  		if (n<=255){
  			n = n + p;
  		}
  	
  		},10)
  }
  

});