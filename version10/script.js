/******************************************************************************************
 * function liste:
 * - date()
 * - log_manual()
 * - log_advanced()
 * - log_automatic()
 * - add_log()
 * - sendval_manual_deplacement()
 * - sendval_automatic_deplacement()
 * - sendval_advanced_deplacement()
 * - sendval_advanced_deplacement_mobile()
 * - compass()
 * - hour()
 * - compassaction()
 * - test_recpetion()
 * - stop()
 * - connectionTest()
 * - add()
 * - remove()
 * - hideandshowmanual()
 * - hideandshowmadvanced()
 * - hideandshowmautomatic()
 * - connection()
 * - deconnection()
 * 
 */

//global variable
var nborder = 0; //order number
var direction; // robot direction (forward, backward, right, left)
var angle; //north angle
//MODIFICAT 26/01/2021
//var IP_adresse = '192.168.2.113'
//MODIFICAT 29/09/2021
var IP_adresse = '192.168.1.2'
//MODIFICAT 23/10/2020 12:21
//var IP_adresse = '147.83.159.170'
var port = '5001'
//var IP_adresse = '192.168.43.118'
//var port = '5000'
/**********************************************************************
 * modification of the page according to the type of media (computer, smartphone)
 */

$(document).ready(function(){
    $('#desktop-other').show();
    $('#slider-advanced-mobile').hide();
    $('#goMobile').hide();

    var ua = navigator.userAgent;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
        document.getElementById("slider").classList.add("rota"),
        $('#slider-advanced-mobile').show(),
        $('#slider-advanced-desktop').hide(),
        $('#goDesktop').hide(),
        $('#goMobile').show(),
        $('#img1').hide(),
        $('#img2').hide(),
        $('#img3').hide(),
        document.getElementById("title2").classList.add("texte-mobile"),
        document.getElementById("connectionMessage").classList.add("texte-mobile"),
        document.getElementById("connectionMessage2").classList.add("texte-mobile"),
        document.getElementById("connectionWait").classList.add("texte-mobile"),
        document.getElementById("MaC").classList.add("texte-mobile"),
        document.getElementById("AdC").classList.add("texte-mobile"),
        document.getElementById("AuC").classList.add("texte-mobile"),
        document.getElementById("buttonConnection").classList.add("button-mobile"),
        document.getElementById("buttonConnection2").classList.add("button-mobile"),
        document.getElementById("speedshow").classList.add("center")
}
);


/****************************************************************
 * retrieving slider values from manual mode
 ****************************************************************/
var slider = document.getElementById("speed_manual");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
output.innerHTML = this.value;
}


/****************************************************************
 * retrieving slider left values from advanced mode on desktop
 ****************************************************************/
var slider_left = document.getElementById("speed_left");
var output_left = document.getElementById("demo_left");
output_left.innerHTML = slider_left.value;

slider_left.oninput = function() {
output_left.innerHTML = this.value;
}

/****************************************************************
 * retrieving slider right values from advanced mode on desktop
 ****************************************************************/
var slider_right = document.getElementById("speed_right");
var output_right = document.getElementById("demo_right");
output_right.innerHTML = slider_right.value;

slider_right.oninput = function() {
output_right.innerHTML = this.value;
}

/****************************************************************
 * retrieving slider left values from advanced mode on phone
 ****************************************************************/
var slider_left_mobile = document.getElementById("speed_left_mobile");
var output_left_mobile = document.getElementById("demo_left_mobile");
output_left_mobile.innerHTML = slider.value;

slider_left_mobile.oninput = function() {
output_left_mobile.innerHTML = this.value;
}

/****************************************************************
 * retrieving slider right values from advanced mode on phone
 ****************************************************************/
var slider_right_mobile = document.getElementById("speed_right_mobile");
var output_right_mobile = document.getElementById("demo_right_mobile");
output_right_mobile.innerHTML = slider.value;

slider_right_mobile.oninput = function() {
output_right_mobile.innerHTML = this.value;
}



/*****************************************************************
 * initializations of round sliders
 *****************************************************************/

$(document).ready(function () {

    // manual mode round slider
    $("#shape").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        width: "0",
        radius: 100,
        value: 1,
        max: "60",
        startAngle: 180,
        handleSize: "+50",
        min: "1",
       
        
    });
    //advanced mode round slider
    $("#shape1").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        width: "0",
        radius: 100,
        value: 1,
        max: "60",
        startAngle: 180,
        handleSize: "+50",
        min: "1",
    });

    //direction round slider
    $("#shape2").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        width: "0",
        radius: 100,
        value: 1,
        max: "359",
        startAngle: 90,
        handleSize: "+50",
        min: "0",
    });
    
}) ;

/*************************************************************************************************
date()
description:
returns the date in format year/month/day/hour/minute/second
parameter:
none
return:
the current date
************************************************************************************************** */


function date(){
    var now = new Date();
    var year   = now.getFullYear();
    var month    = now.getMonth() + 1;
    var day    = now.getDate();
    var hour   = now.getHours();
    var minute  = now.getMinutes();
    var second = now.getSeconds();
    var theDate = year+"/"+month+"/"+day+" /"+hour+"/"+minute+"/"+second;
    return theDate;
}

/*************************************************************************************************
log_manual()
description:
returns a list containing the executed order and the order number for manual mode
parameter:
    - time , duration of the action 
    - speed , speed in percent of motors
    - direction , crawler direction
return:
    -[order number, order]
************************************************************************************************** */
function log_manual(time, speed, direction){
    nborder +=1	;
    theDate =date();
    var order = theDate + "Client send :/order:"+nborder+"/Time:"+time+"/Speed:"+speed+"/Direction:"+direction+":" ;
    var infos=[nborder, order];
    return infos;
}

/*************************************************************************************************
log_advanced()
description:
returns a list containing the executed order and the order number for manual mode
parameter:
    - time , duration of the action
    - speed1 , speed in percent of motor right
    - speed1 , speed in percent of motor left
return:
    - [order number, order]
************************************************************************************************** */
function log_avanced(time, speed1, speed2){
    nborder +=1	;
    theDate =date();
    var order = theDate + "Client send :/order:"+nborder+"/Time:"+time+"/Motor right:"+speed1+"/Motor left:"+speed2+":" ;
    var infos=[nborder, order];
    return infos;
}

/*************************************************************************************************
log_automatic()
description:
returns a list containing the executed order and the firts order number  and last oder number for automatic mode
parameter:
    none
return:
    - [first order number, last oder number, order]
************************************************************************************************** */
function log_automatic(){
    nborder +=1	;
    theDate =date();
    var nborder2 = nborder+nb_ligne-1;
    var order = theDate + "Client send :/order:"+nborder+"-"+nborder2;
    var infos=[nborder,nborder2, order];
    nborder = nborder2;
    return infos;

}
/*************************************************************************************************
add_log()
description:
add a text in the log div
parameter:
    - text, text to display
return:
    none
************************************************************************************************** */
function add_log(text){
    var para = document.createElement("p");
    var node = document.createTextNode(text);
    para.appendChild(node);

    var element = document.getElementById("affichage_log");
    element.appendChild(para); 
}

/*************************************************************************************************
sendval_lights()
description:
retrieve the parameter (lights) from the web page, 
send the request if the parameters are complete
show response in logs
parameter:
    none
return:
    none
************************************************************************************************** */
function sendval_lights(){
    var lights_value = document.getElementById("switch1");
    
    
    if (lights_value!='' ){
        
        if (lights_value.checked == true){

            var requestURL = 'http://'+IP_adresse+':'+port+'/api/lights_off';
            var request = new XMLHttpRequest();
            console.log(request)
            request.open('GET', requestURL);
            request.responseType = 'text';
            request.send();
            test_reception();

            
            request.onload = function() {
            var res = request.response;
            add_log(res);

            
            document.getElementById("on_off_color_lights").classList.add("greencolor");
            document.getElementById("on_off_color_lights").classList.remove("redcolor");
            }
          } 
          else {
            
            var requestURL = 'http://'+IP_adresse+':'+port+'/api/lights_on';
            var request = new XMLHttpRequest();
            console.log(request)
            request.open('GET', requestURL);
            request.responseType = 'text';
            request.send();
            test_reception();

            request.onload = function() {
            var res = request.response;
            add_log(res);
            document.getElementById("on_off_color_lights").classList.remove("greencolor");
            document.getElementById("on_off_color_lights").classList.add("redcolor");
            
            }
        
        }

        
    }
    
}

/*************************************************************************************************
sendval_manual_deplacement()
description:
retrieve the parameters (time, speed and direction values) from the web page, 
send the request if the parameters are complete
show response in logs
parameter:
    none
return:
    none
************************************************************************************************** */
function sendval_manual_deplacement(){
    var time_value = $("#shape").roundSlider("getValue");
    var speed_value = document.getElementById("speed_manual").value;
    if (time_value != '' & speed_value!='' & direction!='undefined'){
        var info = log_manual(time_value, speed_value, direction);
        var order = info[1];
        var nborder = info[0];

        add_log(order);
        var requestURL = 'http://'+IP_adresse+':'+port+'/api/manual/deplacement?time='+ time_value +'&speed=' + speed_value +'&direction=' + direction +'&order='+order+'&nborder='+nborder;
                var request = new XMLHttpRequest();
                request.open('GET', requestURL);
                request.responseType = 'text';
                request.send();
                test_reception();

            
                request.onload = function() {
                    var res = request.response;
                    add_log(res);
                }
    }
    else {
        var theDate=date();
        var order = theDate + "Client send : missing arguments";
        add_log(order)
    }
    
}

/*************************************************************************************************
sendval_automatic_deplacement()
description:
retrieve the parameters (time, and speeds) from the web page, 
send the request if the parameters are complete
show response in logs
parameter:
    none
return:
    none
************************************************************************************************** */
function sendval_automatic_deplacement(){
    var time = [];
    var speed1 = [];
    var speed2 = [];
    for (i = 1; i <= nb_ligne; i++) {
        time.push(document.getElementById('time'+i).value);
        speed1.push(document.getElementById('speed1'+i).value);
        speed2.push(document.getElementById('speed2'+i).value);
    }
    var info = log_automatic()
    var order = info[2];
    var nborder2 = info[1];
    var nborder = info[0];
    if(nborder2 >= nborder){
    add_log(order);
    
        url_send ='http://'+IP_adresse+':'+port+'/api/automatic/deplacement?number='+nb_ligne+'&order='+order+'&nborder='+nborder+'&nborderend='+nborder2;
        for (i=1; i<=nb_ligne; i++){
            url_send = url_send+'&time'+i+'='+time[i-1]+'&speed1'+i+'='+speed1[i-1]+'&speed2'+i+'='+speed2[i-1];

        }
        nborder = nborder2;
        var requestURL = url_send;
            var request = new XMLHttpRequest();
            request.open('GET', requestURL);
            request.responseType = 'text';
            request.send();
	    test_reception();

                request.onload = function() {
                    var res = request.response;
                    add_log(res);
                }
        

    }
    else {
        var theDate =date()
        var error_message = theDate + "Client send :/ missing arguments";
        add_log(error_message);
    }

    
}
/*************************************************************************************************
sendval_advanced_deplacement()
description:
retrieve the parameters (time, and speeds) from the web page (desktop), 
send the request if the parameters are complete
show response in logs
parameter:
    none
return:
    none
************************************************************************************************** */
function sendval_advanced_deplacement(){
    var time = $("#shape1").roundSlider("getValue");
    var speed1 = document.getElementById('speed_right').value;
    var speed2 = document.getElementById('speed_left').value;
    if (time != '' & speed1!='' & speed2 !=''){
        var info =log_avanced(time, speed1, speed2);
        var order = info[1];
        var nborder = info[0];
        add_log(order);
		//MODIFICAT 5/10/2021 
	    var requestURL = 'http://'+IP_adresse+':'+port+'/api/advanced/deplacement?time='+time+'&speed1='+speed1+'&speed2='+speed2+"&nborder="+nborder+"&order="+order;
	    console.log(requestURL);
	    
        //var requestURL = 'http://192.168.43.118:'+port+'/api/advanced/deplacement?time='+time+'&speed1='+speed1+'&speed2='+speed2+"&nborder="+nborder+"&order="+order
            var request = new XMLHttpRequest();
                request.open('GET', requestURL);
                request.responseType = 'text';
                request.send();
            test_reception();
            
                request.onload = function() {
                    var res = request.response;
                    add_log(res);
                }
            }
    else {
        var theDate=date();
        var order = theDate + "Client send : missing arguments";
        add_log(order);
    }           
    
}

/*************************************************************************************************
sendval_advanced_deplacement_mobile()
description:
retrieve the parameters (time, and speeds) from the web page (mobile), 
send the request if the parameters are complete
show response in logs
parameter:
    none
return:
    none
************************************************************************************************** */
function sendval_advanced_deplacement_mobile(){
    var time = $("#shape1").roundSlider("getValue");
    var speed1 = document.getElementById('speed_right_mobile').value;
    var speed2 = document.getElementById('speed_left_mobile').value;
    if (time != '' & speed1!='' & speed2 !=''){
        var info =log_avanced(time, speed1, speed2);
        var order = info[1];
        var nborder = info[0];
        add_log(order);
        var requestURL = 'http://'+IP_adresse+':'+port+'/api/advanced/deplacement?time='+time+'&speed1='+speed1+'&speed2='+speed2+"&nborder="+nborder+"&order="+order
            var request = new XMLHttpRequest();
                request.open('GET', requestURL);
                request.responseType = 'text';
                request.send();
		test_reception();
            
                request.onload = function() {
                    var res = request.response;
                    add_log(res);
                }
            }
    else {
        var theDate=date();
        var order = theDate + "Client send : missing arguments";
        add_log(order);
    }           
    
}
/*************************************************************************************************
compass())
description:
send a request to ask for direction (angle to north).
it takes place every 1 second
parameter:
    none
return:
    none
************************************************************************************************** */
function compass(){
    var requestURL ='http://'+IP_adresse+':'+port+'/api/read_compass';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    
    request.onload = function() {
        angle = request.response;
        console.log(angle);
        document.getElementById("compassread").innerHTML = angle;
        document.getElementById("compassread_pop").innerHTML = angle;

        

    }
	//MODIFICAT 09/10/2020 10:41
	//setTimeout(compass, 2000);
    setTimeout(compass, 3000);
}

/*************************************************************************************************
motors())
description:
send a request to ask for gpio state of motors IO2
it takes place every 1 second
parameter:
    none
return:
    none
************************************************************************************************** */
function motors(){
    var requestURL ='http://'+IP_adresse+':'+port+'/api/read_IO2';
    
    var request = new XMLHttpRequest(); // create XHR request
    request.open('GET', requestURL); //specify HTTP method
    request.responseType = 'text'; //waited reponse type 
    request.send(); //execute XHR request
    
    request.onload = function() {
    var motors = request.response;
    var motors_value = document.getElementById("switch2");
    console.log(motors);
    document.getElementById("readIO2").innerHTML = motors;
    if (motors=="(0, 0)"){
        motors_value.checked=false;
    }
    else {
        motors_value.checked=true;
    }

}
setTimeout(motors, 3000);
        
        
    }

/*************************************************************************************************
lights())
description:
send a request to ask for gpio state of lights
it takes place every 1 second
parameter:
    none
return:
    none
************************************************************************************************** */
function lights(){
    var requestURL ='http://'+IP_adresse+':'+port+'/api/read_lights';
    
    var request = new XMLHttpRequest(); // create XHR request
    request.open('GET', requestURL); //specify HTTP method
    request.responseType = 'text'; //waited reponse type 
    request.send(); //execute XHR request
    
    request.onload = function() {
    var lights = request.response;
    var lights_value = document.getElementById("switch1");
    console.log(lights);
    document.getElementById("readLights").innerHTML = lights;
    if (lights=="(1, 1)"){
        lights_value.checked=false;
    }
    else {
        lights_value.checked=true;
    }

}
setTimeout(lights, 3000);
        
        
    }

/*************************************************************************************************
hour())
description:
send a request to ask for crawler hour
it takes place every 1 second
parameter:
    none
return:
    none
************************************************************************************************** */
function hour() {
    var requestURL ='http://'+IP_adresse+':'+port+'/api/hour';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'text';
    request.send();
    
    request.onload = function() {
        var hour = request.response;
        console.log();
        document.getElementById("hour").innerHTML = hour;

        

    }
	//MODIFICAT 09/10/2020 10:42
    //setTimeout(hour, 2000); 
	setTimeout(hour, 3000);
}

/*************************************************************************************************
compassaction()
description:
retrieve the parameters (time, and speeds) from the web page, 
send the request if the parameters are complete
show response in logs
parameter:
    none
return:
    none
************************************************************************************************** */
function compassaction(){
    nborder+=1;
    ///var angle = document.getElementById("compassvalue").value
    var angle = $("#shape2").roundSlider("getValue");
    if(angle !=''){
        var theDate=date();
        var order = theDate +" Client send /order:"+nborder+" /rotation:"+angle;
        add_log(order);
        test_reception();
        var requestURL ='http://'+IP_adresse+':'+port+'/api/rotation?compassvalue='+angle+"&nborder="+nborder+"&order="+order;
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'text';
        request.send();

        request.onload = function() {
            var res = request.response;
            add_log(res);
        }
    }
    else {
        var theDate=date()
        var order = theDate + "Client send : missing arguments"
        add_log(order);
    }
}

/*************************************************************************************************
test_recepetion()
description:
to send with a second request, to verify that this second is well received by the API
parameter:
    none
return:
    none
************************************************************************************************** */
function test_reception(){
    var requestURL ='http://'+IP_adresse+':'+port+'/api/test'
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'text';
    request.send();

    request.onload = function() {
        var res = request.response;
        add_log(res);
    } 
}

/*************************************************************************************************
stop()
description:
stop the current action
parameter:
    none
return:
    none
************************************************************************************************** */
function stop(){
    //test_reception()
    var requestURL = 'http://'+IP_adresse+':'+port+'/api/stop';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'text';
    request.send();

    request.onload = function() {
        var res = request.response;
        add_log(res);
      }
}


/*************************************************************************************************
stop()
description:
stop the current action
parameter:
    none
return:
    none
************************************************************************************************** */
function IO2_motors(){
    //test_reception()
    var motors_value = document.getElementById("switch2");

    if (motors_value!=''){
        if (motors_value.checked==true){

            var requestURL = 'http://'+IP_adresse+':'+port+'/api/IO2_on';
            var request = new XMLHttpRequest();
            //request.open('GET', requestURL);
            request.open('POST', requestURL);
            request.responseType = 'text';
            request.send();

            request.onload = function() {
                var res = request.response;
                add_log(res);
                document.getElementById("on_off_motor_lights").classList.add("greencolor");
                document.getElementById("on_off_motor_lights").classList.remove("redcolor");
            }
        }
        else {
            var requestURL = 'http://'+IP_adresse+':'+port+'/api/IO2_off';
            var request = new XMLHttpRequest();
            //request.open('GET', requestURL);
            request.open('POST', requestURL);
            request.responseType = 'text';
            request.send();

            request.onload = function() {
                var res = request.response;
                add_log(res);
                document.getElementById("on_off_motor_lights").classList.remove("greencolor");
                document.getElementById("on_off_motor_lights").classList.add("redcolor");
            }
        }
    }

}

/*************************************************************************************************
connectionTest()
description:
test the connection with API
change the color of the connection indicator
parameter:
    none
return:
    none
************************************************************************************************** */
function connnectionTest(){
   
    var requestURL = 'http://'+IP_adresse+':'+port+'/api/connectiontest';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    request.timeout = 2000;
    
    
    request.onload = function(){
        var theDate = date();
        message = theDate + " connection established";
        document.getElementById("on_off_color").classList.remove("redcolor");
        document.getElementById("on_off_color").classList.add("greencolor");
        document.getElementById("on_off_color_pop").classList.remove("redcolor");
        document.getElementById("on_off_color_pop").classList.add("greencolor");
    }

    request.ontimeout = function (e) {
        document.getElementById("on_off_color").classList.add("redcolor");
        document.getElementById("on_off_color").classList.remove("greencolor");
        document.getElementById("on_off_color_pop").classList.remove("redcolor");
        document.getElementById("on_off_color_pop").classList.add("greencolor");
      };
    

    request.send()
	//MODIFICAT 09/10/2020 10:42
    //setTimeout(connnectionTest, 2000);
	setTimeout(connnectionTest, 3000);
    
}

//partie affichage
var nb_ligne = 3;
/*************************************************************************************************
add()
description:
test the connection with API
add a line in the automatic mode table
parameter:
    none
return:
    none
************************************************************************************************** */
function add() {
    nb_ligne +=1;
    var table = document.getElementById("myTable");
    var row = table.insertRow(nb_ligne);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = nb_ligne;
    cell2.innerHTML = '<input type="number" id="time' +nb_ligne+'" name="time" min="0" max="100" class="input_min">';
    cell3.innerHTML ='<input type="number" id="speed1'+nb_ligne+'" name="speed" min="-100" max="100" class="input_min">';
    cell4.innerHTML ='<input type="number" id="speed2'+nb_ligne+'" name="speed" min="-100" max="100" class="input_min">';
}

/*************************************************************************************************
remove()
description:
test the connection with API
remove the last line in the automatic mode table
parameter:
    none
return:
    none
************************************************************************************************** */
function remove(){
    nb_ligne -=1;
    document.getElementById('myTable').deleteRow(-1);
    
}

//navbar

/*************************************************************************************************
hideandshowmanual()
description:
hide advanced and automatic mode page
show manaul mode page
parameter:
    none
return:
    none
************************************************************************************************** */
function hideandshowmanual(){
    if (accessWebPage == 0){
        document.getElementById("col11").classList.remove('d-none');
        document.getElementById("col12").classList.add('d-none');
        document.getElementById("col13").classList.add('d-none');
        document.getElementById("navbar1").classList.add('active');
        document.getElementById("navbar2").classList.remove('active');
        document.getElementById("navbar3").classList.remove('active');
        document.getElementById("MaC").classList.remove('d-none');
        document.getElementById("AdC").classList.add('d-none');
        document.getElementById("AuC").classList.add('d-none');
    }
}

/*************************************************************************************************
hideandshowadvanced()
description:
hide manual and automatic mode page
show advanced mode page
parameter:
    none
return:
    none
************************************************************************************************** */
function hideandshowadavnced(){
    if(accessWebPage == 0){
        document.getElementById("col12").classList.remove('d-none');
        document.getElementById("col11").classList.add('d-none');
        document.getElementById("col13").classList.add('d-none');
        document.getElementById("navbar2").classList.add('active');
        document.getElementById("navbar1").classList.remove('active');
        document.getElementById("navbar3").classList.remove('active');
        document.getElementById("MaC").classList.add('d-none');
        document.getElementById("AdC").classList.remove('d-none');
        document.getElementById("AuC").classList.add('d-none');
    }
}

/*************************************************************************************************
hideandshowautmatic()
description:
hide advanced and manual mode page
show automatic mode page
parameter:
    none
return:
    none
************************************************************************************************** */
function hideandshowautomatic(){
    if(accessWebPage == 0){
        document.getElementById("col13").classList.remove('d-none');
        document.getElementById("col12").classList.add('d-none');
        document.getElementById("col11").classList.add('d-none');
        document.getElementById("navbar3").classList.add('active');
        document.getElementById("navbar2").classList.remove('active');
        document.getElementById("navbar1").classList.remove('active');
        document.getElementById("MaC").classList.add('d-none');
        document.getElementById("AdC").classList.add('d-none');
        document.getElementById("AuC").classList.remove('d-none');
    }
}

//******************************Function for POPUP button*************************************************
var btnPopup = document.getElementById('btnPopup');
var overlay = document.getElementById('overlay');
btnPopup.addEventListener('click',openMoadl);

function openMoadl() {
overlay.style.display='block';
}

var btnClose = document.getElementById('btnClose');
btnClose.addEventListener('click',closeModal);
function closeModal() {
overlay.style.display='none';
}
//**********************************************************************************************

//direction mode manual

/*************************************************************************************************
direction1()
description:
management of the 4 manual mode direction buttons
parameter:
    none
return:
    none
************************************************************************************************** */
function direction1(id){
    direction = document.getElementById(id).value;
    document.getElementById("forward").classList.remove('truc');
    document.getElementById("left").classList.remove('truc');
    document.getElementById("right").classList.remove('truc');
    document.getElementById("backward").classList.remove('truc');
    document.getElementById("icoforward").classList.remove('ico');
    document.getElementById("icoleft").classList.remove('ico');
    document.getElementById("icoright").classList.remove('ico');
    document.getElementById("icobackward").classList.remove('ico');
    document.getElementById(id).classList.add('truc');
    document.getElementById('ico'+id).classList.add('ico');
}


/*************************************************************************************************
connection()
description:
parameter:
    none
return:
    none
************************************************************************************************** */
function connection(){
    //test_reception()
    var requestURL = 'http://'+IP_adresse+':'+port+'/api/connection';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'text';
    request.send();

    request.onload = function() {
        var res = request.response;
        accessWebPage = res;
        console.log(res)
        if(accessWebPage == 0){
            document.getElementById("connectionpage").classList.add('d-none');
            document.getElementById("pageoccuper").classList.add('d-none');
            document.getElementById("page").classList.remove('d-none');
            document.getElementById("MaC").classList.remove('d-none');
            document.getElementById("col11").classList.remove('d-none');
            document.getElementById("decobuton").classList.remove('d-none');
            

        }
        else {
            document.getElementById("connectionpage").classList.add('d-none');
            document.getElementById("pageoccuper").classList.remove('d-none');
            document.getElementById("page").classList.add('d-none');
            document.getElementById("decobuton").classList.add('d-none');
        }
        
      }
}

/*************************************************************************************************
deconnection()
description:
parameter:
    none
return:
    none
************************************************************************************************** */
function deconnection(){
    
    
    if (confirm("confirm disconnection")){
        var requestURL = 'http://'+IP_adresse+':'+port+'/api/deconnection';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'text';
        request.send();
        request.onload = function() {
            var res = request.response;
            accessWebPage = res;
        }
        
        document.getElementById("connectionpage").classList.remove('d-none');
        document.getElementById("pageoccuper").classList.add('d-none');
        document.getElementById("page").classList.add('d-none');
        document.getElementById("MaC").classList.add('d-none');
        document.getElementById("AdC").classList.add('d-none');
        document.getElementById("AuC").classList.add('d-none');
	document.getElementById("decobuton").classList.add('d-none');

    }
    else {

    }
    
}




//function execute on page change
connnectionTest();
compass();
motors();
lights();
hour();


window.onbeforeunload = function(){
    var e = e || window.event;

    // For IE and Firefox
    if (e) {
        if(this.accessWebPage == 0){
			//MODIFICAT 26/01/2021
			var requestURL = 'http://'+IP_adresse+':'+port+'/api/deconnection';			
            //MODIFICAT 23/10/2020 12:21
			//var requestURL = 'http://147.83.159.170:5000/api/deconnection';
            //var requestURL = 'http://192.168.43.118:5000/api/deconnection';
            var request = new XMLHttpRequest();
            request.open('GET', requestURL);
            request.responseType = 'text';
            request.send();
            request.onload = function() {
                var res = request.response;
                accessWebPage = res;
        }
    }
      e.returnValue = 'Any string';
    }
  
    // For Safari
    this.deconnection();
    return 'Any string';
  };