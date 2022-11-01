var container=document.getElementById("container");
var userInput=document.getElementById("user");//where text is written
var button=document.getElementById("button");//submit button
var start=document.getElementById("start");
button.addEventListener("click",func);
start.addEventListener("click",func1);
var myelement=null;
function func(){
  var valueUserInput=userInput.value;
$.ajax({
    type: "POST",
    url: "http://localhost:8080/api/persons",
    data: JSON.stringify({ "userName": valueUserInput}),
    contentType: "application/json",
    success: function (result) {
      console.log(result);
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
      url: "http://localhost:8080/api/persons",
      //data: JSON.stringify({ "userName": valueUserInput}),
      contentType: "application/json",
      success: function (result) {
        console.log(result);
        var length=result.length;
        for(let i=0;i<length;i++)
        {
           var element=result[i];
           var name=element.userName;
           var x_pos=element.x_pos;
           var y_pos=element.y_pos;
           console.log(name+","+x_pos+","+y_pos);
           var div_element=document.createElement("div");
           div_element.innerText=name;
           container.append(div_element);
           var str=x_pos+"px";
           div_element.style.left=str;
           str=y_pos+"px";
           div_element.style.top=str;
           if(name==userInput.value)
           myelement=div_element;
           var myElementXPos=myelement.style.left;
           var myElementYPos=myelement.style.top;

        }
        start.style.visibility="hidden"; userInput.type="hidden";
        button.type="hidden";
      },
      error: function (result, status) {
        console.log(result);
      }
    }); 
}

//now moving the My element and updating the positions on server side
setInterval( func3,100/6);
addEventListener("keydown",(event)=>
{
  if(event.key=='d')
  console.log("d pressed");
})
function func3()
{



}