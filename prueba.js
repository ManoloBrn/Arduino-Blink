var http = require("http"),
    PORT = 1337,
    HOST = "127.0.0.1";
 var j5 = require("johnny-five"), //require the johnny-five module
    board = new j5.Board(),       //init the board
    boardReady = false;             //will be used to keep track if the board is ready (because it is determined via a callback function)
	board.on("ready",function(){
		    boardReady = true;
		});
http.createServer(requestListener).listen(PORT,HOST,function(){
    console.log("LED-SERVER RUNNING ON http://" + HOST + ":" + PORT);
});
function requestListener(request, response){
    /*
        get an array with the information about the request
        EXAMPLE:
            making a request to the endpoint /led/13/on
            would result in info containing the following information
            ["led", "13", "on"]
    */
    var info = request.url.slice(1).split("/");
    /*test if the request if valid*/
    if( info[0] === "led" && info[1] > 0 && info[1] <= 13 && (info[2]=="on"||info[2]=="off")){
        var led = parseInt(info[1]);
        var state = info[2] == "on" ? true : false;
        response.end("turning led " + led + " " + (state ? "on" : "off"));
       
		//will be called from the http server when a valid request comes
		function toggleLed(led,on){
    	if(boardReady){
        	console.log( "changing led state", led, on );
        // turn the desired led on or off depending on the passed parameter
       		 var led = new j5.Led(led);
        if(on){led.on()}else{led.off()}
    }
}
        toggleLed(led,state);
    }else{
        response.end("invalid request");
    }
}