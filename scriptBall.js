var movingBall=document.getElementById("movingBall");
 var initialBallXpos,initialBallYpos;
 var ballXpos=653;
 var ballYpos=442;
initialBallXpos=ballXpos;
initialBallYpos=ballYpos;
//console.log(movingBall.style.left);
var intervalId=setInterval(movingFunc,100/6);
var timeoutId=null;
var y_mov=1;
var objectHeight=100;
var objectWidth=50;
var containerTop=192;
var containerLeft=10;
var valid=true;
var containerHeight=500;
var ballHeight=50;
var ballWidth=50;
var mypoint=0;
var opponentPoint=0;
var div_me=document.getElementById("me");
var div_opponent=document.getElementById("opponent");
function movingFunc()
{ 
  if(dbElements==2)
  {
  $.ajax({
    type: "GET",
    url: "http://192.168.11.189:8080/api/yes",
    contentType: "application/json",
    success: function (result) {
      //console.log(result);
      if(result==true)
        startOrNot=true;
      //console.log("put is successful");
    },
    error: function (result, status) {
      clearInterval(id);
      console.log(result);
    }
  });
}

  if(startOrNot)
{
    movingBall.style.visibility="visible";
    ballXpos=ballXpos+x_mov;//moving left
    ballYpos=ballYpos+y_mov;
    movingBall.style.left=ballXpos+"px";
    movingBall.style.top=ballYpos+"px";
  // console.log(ballXpos);
   for(var i=0;i<2;i++)
   {
    //console.log("in");
    if(valid==true)
    {
      //console.log(true);
      if(((ballYpos+ballHeight)>=(objectsYpos[i]+containerTop))&&(ballYpos<=(objectsYpos[i]+containerTop+objectHeight)))
    {
      console.log("ball on same ypos with objects");
      if(((ballXpos<=(containerLeft+(objectsXpos[i]+objectWidth))&&i==0)&&(ballXpos>=(containerLeft+objectsXpos[i]-ballWidth)))||(((ballXpos+ballWidth)>=(objectsXpos[i]+containerLeft)&&i==1)&&ballXpos<=(objectsXpos[i]+containerLeft+objectWidth)))
      {
        //console.log("ball on same xpos with objects"+","+objectsXpos[i]+","+ballXpos);
    x_mov=-x_mov;console.log("yes");valid=false;
    setTimeout(()=>{valid=true},500)
      }
    }
   }
  }
}


    if(ballXpos<10||ballXpos>1246)
    {
      if(ballXpos<10)
      opponentPoint=opponentPoint+1;
      if(ballXpos>1246)
      mypoint=mypoint+1;
      div_me.innerText="MyPoint: "+mypoint;
      div_opponent.innerText="OpponentPoint: "+opponentPoint;
        movingBall.style.visibility="hidden";
    clearInterval(intervalId);
    
    timeoutId=setTimeout(()=>{
      ballXpos=initialBallXpos;
      ballYpos=initialBallYpos;
      x_mov=initial_x_mov;
      intervalId=setInterval(movingFunc,100/6);
    },1000)
}
if(ballYpos<containerTop||((ballYpos+ballHeight)>(containerHeight+containerTop)))
{
  console.log("ggsg");
  y_mov=-y_mov;valid=false;
  setTimeout(()=>{valid=true},500)
}


}


