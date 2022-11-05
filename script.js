var container=document.getElementById("container");
var userInput=document.getElementById("user");//where text is written
var button=document.getElementById("button");//submit button
var start=document.getElementById("start");
button.addEventListener("click",func);
start.addEventListener("click",func1);
var myelement=null;
var myElementYPos=null;
var myElementXPos=null;
var myElementId=null;
var myElementName=null;
var dbElements=0;
var test1=false;
var wait=document.getElementById("wait");
var urlName="http://192.168.11.189:8080/api/persons";
var objectsYpos=[0,0];
var objectsXpos=[0,0];
var x_mov=-5;
var initial_x_mov=x_mov;
var startOrNot=false;
var start_only_once=false;
function func(){
  var valueUserInput=userInput.value;
$.ajax({
    type: "POST",
    url: urlName,
    data: JSON.stringify({ "userName": valueUserInput}),
    contentType: "application/json",
    success: function (result) {
      console.log("in put");
      myElementId=result.id;
      //console.log(result);
      var div_element=document.createElement("div");
      myelement=div_element;
      var name=result.userName;
      myElementName=name;
      div_element.innerText=name;
      container.append(div_element);
      div_element.style.left=result.x_pos+"px";
      div_element.style.top=result.y_pos+"px";
      myElementXPos=(result.x_pos);
      myElementYPos=(result.y_pos);
      //console.log(myElementId+","+myElementName+","+myElementXPos+","+myElementYPos);
    },
    error: function (result, status) {
      console.log(result);
    }
  });
  userInput.type="hidden";
  button.type="hidden";
}
function func1()
{
  $.ajax({
      type: "GET",
      url: urlName,
      //data: JSON.stringify({ "userName": valueUserInput}),
      contentType: "application/json",
      success: function (result) {
        
       // console.log(result);
        var length=result.length;//would be 2 only
        dbElements=length;
        for(let i=0;i<length;i++)
        {
          
           var element=result[i];
           var name=element.userName;
           if(i==0&&myElementName==name)
           {
           x_mov=+5;initial_x_mov=+5;
           }
           if(name==myElementName)
           {
           continue;
           }
           //console.log("other user:"+name);
           var x_pos=element.x_pos;
           var y_pos=element.y_pos;
           //console.log(name+","+x_pos+","+y_pos);
           var div_element=document.createElement("div");
           div_element.innerText=name;
           container.append(div_element);
           var str=(1286-(x_pos)-objectWidth)+"px";
           div_element.style.left=str;
           str=y_pos+"px";
           div_element.style.top=str;
        }
        start.style.visibility="hidden"; 
      },
      error: function (result, status) {
        console.log(result);
      }
    }); 

   
    $.ajax({
      type: "GET",
      url: "http://192.168.11.189:8080/api/startOrNot",
      contentType: "application/json",
      success: function (result) {
        console.log(result);
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
  


//now moving the My element and updating the positions on server 

var id=setInterval( func3,1000/6);
addEventListener("keydown",(event)=>
{
  if(event.key=='w'){//move upward
 // console.log("d pressed");
  if(myelement!=null&&start.style.visibility=="hidden"&&dbElements==2){
    if(myElementYPos>20){
      myElementYPos=myElementYPos-30;
    myelement.style.top=(myElementYPos)+"px";
    //console.log("yes");
    }
      }
  }
  if(event.key=="s")
  {
    if(myelement!=null&&start.style.visibility=="hidden"&&dbElements==2){
      if(myElementYPos<=(500-objectHeight)){
        myElementYPos=myElementYPos+30;
      myelement.style.top=(myElementYPos)+"px";
      //console.log("yes");
      }
        }
  }
})
function func3()
{
  //console.log("yes"+myelement+myelement.style.left);
  //console.log("frames");
  //lets update position of the myelement to server //ajax post
  if(myelement!=null&&start.style.visibility=="hidden"&&dbElements==2){
  //console.log(myelement.innerText+","+myElementId+","+myelement.style.left.substring(0,3)
  //+","+ myelement.style.top.substring(0,3) );

  
    //console.log("ajaxxxxxxxxx");
  $.ajax({
    type: "PUT",
    url: urlName,
    data: JSON.stringify({ "userName":myElementName,
                                "id":myElementId,
                                "x_pos":myElementXPos,
                                 "y_pos":myElementYPos }),
    contentType: "application/json",
    success: function (result) {
      //console.log("put is successful");
    },
    error: function (result, status) {
      clearInterval(id);
      console.log(result);
    }
  });



//updating users position on every device
$.ajax({
  type: "GET",
  url: urlName,
  //data: JSON.stringify({ "userName": valueUserInput}),
  contentType: "application/json",
  success: function (result) {
   // console.log(result);
   dbElements=result.length;
    for(var i=0;i<2;i++)
    {
      
      if(result[i].id!=myElementId){
        //console.log(result[i].id);
     var x_pos=result[i].x_pos;
     var y_pos=result[i].y_pos;
     container.children[1].style.left=(1286-parseInt(x_pos)-objectWidth)+"px";
     container.children[1].style.top=parseInt(y_pos)+"px"; break;  
      }
    }
   // console.log(container);
  },
  error: function (result, status) {
    //console.log(result);
  }
}); 
  
  } 

  if(dbElements==1&&container.children.length==1)
  {
      wait.style.visibility="visible";
      start.style.visibility="visible";
      objectsXpos=[0,0];
      objectsYpos=[0,0];
  }
  else if(dbElements==1&&container.children.length==2)
  {
    wait.innerText="opponent disconnected";
    wait.style.visibility="visible";
    objectsXpos=[0,0];
      objectsYpos=[0,0];
  }
  else if(dbElements==2&&container.children.length==2)
  {
    wait.style.visibility="hidden";
    objectsXpos=[parseInt(container.children[0].style.left),parseInt(container.children[1].style.left)];
    objectsYpos=[parseInt(container.children[0].style.top),parseInt(container.children[1].style.top)];
  }
}

//if users presses refresh just do ajax delete
window.onbeforeunload = function(e) {
  //console.log(e);
//   var check=e.preventDefault();
 
// e.returnValue = "Are you sure you want to exit?";
console.log(myElementId);
myelement=null;
$.ajax({
  type: "DELETE",
  url: urlName+"/"+myElementId,
  contentType: "application/json",
  success: function (result) {
    console.log(result);
  },
  error: function (result, status) {
    clearInterval(id);
    console.log(result);
  }
});
console.log("yes");
};