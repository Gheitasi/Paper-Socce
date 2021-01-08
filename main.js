let nodes = [];

for(let i = 0; i < 13; i++) {
    nodes[i] = [];
    for(let j = 0; j < 9; j++) {
        nodes[i][j] = new node();
    }
}
set_node(nodes);
visit_wall(nodes);
var row,column;
row=6;
column=4;
var temp_r,temp_c;
var flag=true;
var turn=false;
nodes[row][column].setVisit(true);


//Graphic
var can, ctx,
    canX = [], canY = [],
    mouseIsDown = 0, len = 0;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var xNode=0,ynode=0;
var black="black";
var blue="blue";
var red="red";
canvas.addEventListener("mousedown", mouseDown, false);
canvas.addEventListener("mousemove", mouseXY, false);
canvas.addEventListener("touchstart", touchDown, false);
canvas.addEventListener("touchend", touchUp, false);
canvas.addEventListener("touchmove", touchXY, false);

document.body.addEventListener("mouseup", mouseUp, false);
document.body.addEventListener("touchcancel", touchUp, false);
// var player1_name = window.prompt("لطفا نام بازیکن اول را وارد کنید: ");
// var player2_name = window.prompt("لطفا نام بازیکن دوم را وارد کنید:");
var player1_name="ali1";
var player2_name="ali2";
document.getElementById('nobatSh').innerHTML = player1_name;
// drow_text(player1_name);

function mouseUp() {
   mouseIsDown = 0;
   mouseXY();
}

function mouseDown() {
   mouseIsDown = 1;
   mouseXY();
}

function touchDown() {
   mouseIsDown = 1;
   touchXY();
}

function touchUp(e) {
   if (!e)
       e = event;
   len = e.targetTouches.length;
}

function mouseXY(e) {
   if (!e)
       e = event;
   canX[0] = e.pageX - canvas.offsetLeft;
   canY[0] = e.pageY - canvas.offsetTop;
}

function touchXY(e) {
   if (!e)
       e = event;
   e.preventDefault();
   len = e.targetTouches.length;
   for (i = 0; i < len; i++) {
       canX[i] = e.targetTouches[i].pageX - canvas.offsetLeft;
       canY[i] = e.targetTouches[i].pageY - canvas.offsetTop;
   }
}

function drow_text(player_name_main){
    // ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.font = 'Bold 14px iransans';
    var xtext=canvas.width  ;
    var ytext=canvas.height / 2 ;
    var text_p="برنامه نویسی و طراحی: علی قیطاسی";
    ctx.fillText(text_p, xtext,530 );
}
drow_text();
function drawNode(i,j) {
    i++;
    yNode = i*40;
    xNode = j*40;
    ctx.beginPath();
    ctx.arc(xNode+20, yNode+20, 2, 0, Math.PI*2,false);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
function drawNodeG(i,j) {
    yNode = i*40;
    xNode = j*40;
    ctx.beginPath();
    ctx.arc(xNode+20, yNode+20, 2, 0, Math.PI*2,false);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
function drawSelectionNode(i,j) {
    yNode = i*40;
    xNode = j*40;
    ctx.beginPath();
    ctx.arc(xNode+20, yNode+20, 4, 0, Math.PI*2,false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
function drawSelectedNode(i,j) {
    yNode = i*40;
    xNode = j*40;
    ctx.beginPath();
    ctx.arc(xNode+20, yNode+20, 4, 0, Math.PI*2,false);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
function drawLine(i,j,ip,jp,color) {
    ctx.beginPath();
    ctx.moveTo(j*40+20, i*40+20);
    ctx.lineTo(jp*40+20, ip*40+20);
    ctx.fillStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.closePath();
    ctx.stroke();
}
function draw_wall(){
    drawLine(1,0,11,0,black);
    drawLine(1,0,1,3,black);
    drawLine(1,3,0,3,black);
    drawLine(0,3,0,5,black);
    drawLine(0,5,1,5,black);
    drawLine(1,5,1,8,black);
    drawLine(1,8,11,8,black);
    drawLine(11,0,11,3,black);
    drawLine(11,3,12,3,black);
    drawLine(12,3,12,5,black);
    drawLine(12,5,11,5,black);
    drawLine(11,5,11,8,black);

}
draw_wall();


drawNodeG(0,5);
drawNodeG(0,4);
drawNodeG(0,3);
for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 9; j++) {
        drawNode(i,j);
    }
}
drawNodeG(12,3);
drawNodeG(12,4);
drawNodeG(12,5);
drawSelectionNode(6,4);



var controllerGame=false;
function showResult() {
    if(flag){
        temp_r=row;
        temp_c=column;
    }
    flag=true;
    bx1=document.getElementById('rowbx');
    bx2=document.getElementById('colbx');
    row=bx1.value;
    column=bx2.value;
    bx1.value="";
    bx2.value="";
    bx1.focus();


    if(row>12 || row<0){
        alert("ردیف رو درست وارد نکردی");
        return;
    }
    if(column<0 || column >8){
        alert("ستون رو درست وارد نکردی");
        return;
    }


    if(( abs(temp_r-row)==1 && abs(temp_c-column)==1 ) || ( abs(temp_r-row)==0 && abs(temp_c-column)==1 ) || ( abs(temp_r-row)==1 && abs(temp_c-column)==0 )){
        if(nodes[row][column].getTurn_on()==true){
            let exROW,exCOLUMN;
            exROW=row-temp_r;
            exCOLUMN=column-temp_c;

            if(exROW==-1&&exCOLUMN==0){
                if(nodes[temp_r][temp_c].getYall(0)){
                    alert("این مسیر رو قبلا رفتی");
                    flag=false;
                }
                nodes[temp_r][temp_c].setVisit(true);
                nodes[temp_r][temp_c].setYall(true,0);

                if(nodes[row][column].getVisit()==true){
                    nodes[row][column].setYall(true,4);
                    controllerGame=false;

                }else{
                    nodes[row][column].setVisit(true);
                    nodes[row][column].setYall(true,4);
                    controllerGame=true;
                }

            }else if(exROW==-1 && exCOLUMN==-1){ //1
                if(nodes[temp_r][temp_c].getYall(1)){
                    alert("این مسیر رو قبلا رفتی");
                    flag=false;
                }
                nodes[temp_r][temp_c].setVisit(true);
                nodes[temp_r][temp_c].setYall(true,1);

                if(nodes[row][column].getVisit()){
                    nodes[row][column].setYall(true,5);
                    controllerGame=false;

                }else{
                    nodes[row][column].setVisit(true);
                    nodes[row][column].setYall(true,5);
                    controllerGame=true;
                }

            }else if(exROW==0 && exCOLUMN==-1){ //2
                if(nodes[temp_r][temp_c].getYall(2)){
                    alert("این مسیر رو قبلا رفتی");
                    flag=false;
                }

                nodes[temp_r][temp_c].setVisit(true);
                nodes[temp_r][temp_c].setYall(true,2);

                if(nodes[row][column].getVisit()){
                    nodes[row][column].setYall(true,6);
                    controllerGame=false;

                }else{
                    nodes[row][column].setVisit(true);
                    nodes[row][column].setYall(true,6);
                    controllerGame=true;
                }

            }else if(exROW==1 && exCOLUMN==-1){ //3
                if(nodes[temp_r][temp_c].getYall(3)){
                    alert("این مسیر رو قبلا رفتی");
                    flag=false;
                }
                nodes[temp_r][temp_c].setVisit(true);
                nodes[temp_r][temp_c].setYall(true,3);

                if(nodes[row][column].getVisit()){
                    nodes[row][column].setYall(true,7);
                    controllerGame=false;

                }else{
                    nodes[row][column].setVisit(true);
                    nodes[row][column].setYall(true,7);
                    controllerGame=true;
                }

            }else if(exROW==1 && exCOLUMN==0){ //4
                if(nodes[temp_r][temp_c].getYall(4)){
                    alert("این مسیر رو قبلا رفتی");
                    flag=false;
                }
                nodes[temp_r][temp_c].setVisit(true);
                nodes[temp_r][temp_c].setYall(true,4);

                if(nodes[row][column].getVisit()){
                    nodes[row][column].setYall(true,0);
                    controllerGame=false;

                }else{
                    nodes[row][column].setVisit(true);
                    nodes[row][column].setYall(true,0);
                    controllerGame=true;
                }

            }else if(exROW==1 && exCOLUMN==1){ //5
                if(nodes[temp_r][temp_c].getYall(5)){
                    alert("این مسیر رو قبلا رفتی");
                    flag=false;
                }
                nodes[temp_r][temp_c].setVisit(true);
                nodes[temp_r][temp_c].setYall(true,5);

                if(nodes[row][column].getVisit()){
                    nodes[row][column].setYall(true,1);
                    controllerGame=false;

                }else{
                    nodes[row][column].setVisit(true);
                    nodes[row][column].setYall(true,1);
                    controllerGame=true;
                }

            }else if(exROW==0 && exCOLUMN==1){ //6
                if(nodes[temp_r][temp_c].getYall(6)){
                    alert("این مسیر رو قبلا رفتی");
                    flag=false;
                }
                nodes[temp_r][temp_c].setVisit(true);
                nodes[temp_r][temp_c].setYall(true,6);


                if(nodes[row][column].getVisit()){
                    nodes[row][column].setYall(true,2);
                    controllerGame=false;

                }else{
                    nodes[row][column].setVisit(true);
                    nodes[row][column].setYall(true,2);
                    controllerGame=true;
                }

            }else if(exROW==-1 && exCOLUMN==1){  //7
                if(nodes[temp_r][temp_c].getYall(7)){
                    alert("این مسیر رو قبلا رفتی");
                    flag=false;
                }
                nodes[temp_r][temp_c].setVisit(true);
                nodes[temp_r][temp_c].setYall(true,7);

                if(nodes[row][column].getVisit()){
                    nodes[row][column].setYall(true,3);
                    controllerGame=false;

                }else{
                    nodes[row][column].setVisit(true);
                    nodes[row][column].setYall(true,3);
                    controllerGame=true;
                }


            }else{
                flag=false;
            }
            drawSelectionNode(row,column);
            drawSelectedNode(temp_r,temp_c);
            if(turn){
                drawLine(temp_r,temp_c,row,column,blue);
            }else{
                drawLine(temp_r,temp_c,row,column,red);
            }
            if (controllerGame) {
                if(turn){
                    turn=false;
                }else{
                    turn =true;
                }
            }
            if(!nodes[row][column].getVisit()){
                if(turn){
                    turn=false;
                }else{
                    turn =true;
                }
            }else{

            }
        }else{
            flag=false;
        }
    }else{
        flag=false;
    }

    if(!turn){
        document.getElementById('nobatSh').innerHTML = player1_name;
    }else{
        document.getElementById('nobatSh').innerHTML = player2_name;
    }

    if(winGame(nodes[row][column],row,column)){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.font = 'Bold 14px iransans';
        xtext=canvas.width ;
        ytext=canvas.height / 2 ;
        text_p="بازی تموم شد. بازی رو دوباره بارگزاری کن";
        ctx.fillText(text_p, xtext,280 );
        if(turn){
            alert(player1_name+" برنده شد.");
            console.log("Win:"+player1_name);
            return;
        }else{
            alert(player2_name+" برنده شد.");
            console.log("Win:"+player2_name);

            return;
        }

    }


}

//function
function set_node(node){
	node[0][0].setTurn_on(false);
	node[0][1].setTurn_on(false);
	node[0][2].setTurn_on(false);

	node[0][6].setTurn_on(false);
	node[0][7].setTurn_on(false);
	node[0][8].setTurn_on(false);

	node[12][0].setTurn_on(false);
	node[12][1].setTurn_on(false);
	node[12][2].setTurn_on(false);

	node[12][6].setTurn_on(false);
	node[12][7].setTurn_on(false);
	node[12][8].setTurn_on(false);
}
function visit_wall(node){
	for(let i=1;i<11;i++){
		node[i][0].setYall(true,4);
	}
	for(let i=2;i<12;i++){
		node[i][0].setYall(true,0);
	}
//right
	for(let i=1;i<11;i++){
		node[i][8].setYall(true,4);
	}
	for(let i=2;i<12;i++){
		node[i][8].setYall(true,0);
	}
//left

	for(let i=0;i<3;i++){
		node[1][i].setYall(true,6);
	}

	for(let i=1;i<4;i++){
		node[1][i].setYall(true,2);
	}

	for(let i=5;i<8;i++){
		node[1][i].setYall(true,6);
	}
	for(let i=6;i<9;i++){
		node[1][i].setYall(true,2);
	}
//top

	for(let i=0;i<3;i++){
		node[11][i].setYall(true,6);
	}

	for(let i=1;i<4;i++){
		node[11][i].setYall(true,2);
	}

	for(let i=5;i<8;i++){
		node[11][i].setYall(true,6);
	}
	for(let i=6;i<9;i++){
		node[11][i].setYall(true,2);
	}
//goal
//down
	node[1][3].setYall(true,0);
	node[0][3].setYall(true,4);

	node[0][3].setYall(true,6);
	node[0][4].setYall(true,2);

	node[0][4].setYall(true,6);
	node[0][5].setYall(true,2);

	node[1][5].setYall(true,0);
	node[0][5].setYall(true,4);

//top

	node[12][3].setYall(true,0);
	node[11][3].setYall(true,4);

	node[12][3].setYall(true,6);
	node[12][4].setYall(true,2);

	node[12][4].setYall(true,6);
	node[12][5].setYall(true,2);

	node[12][5].setYall(true,0);
	node[11][5].setYall(true,4);
// down
}


function abs(a){
	if(a<0)
		return -a;
	return a;

}
function winGame(node,row,column){
	if(dedlock(node))
		return true;

	if((row==0 && column==3)||(row==0 && column==4)||(row==0 && column==5)){
		return true;
	}
	if((row==12 && column==3)||(row==12 && column==4)||(row==12 && column==5)){
		return true;
	}
	return false;
}
function dedlock(node){
	let f0,f1,f2,f3,f4,f5,f6,f7;
	f0=node.getYall(0);
	f1=node.getYall(1);
	f2=node.getYall(2);
	f3=node.getYall(3);

	f4=node.getYall(4);
	f5=node.getYall(5);
	f6=node.getYall(6);
	f7=node.getYall(7);
	if(f0 && f1 && f2 && f3 && f4 && f5 && f6 && f7 ){
		return true;
	}
	return false;
}
