var upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lower="abcdefghijklmnopqrstuvwxyz";
var numbers="0123456789";
var symbols="!@#$%^&*()-_=+[]{};:.,<>?/";

var slider=document.getElementById("length");
var label=document.getElementById("len-label");
var output=document.getElementById("output");
var copyMsg=document.getElementById("copy-msg");

slider.oninput=function(){
    label.textContent=slider.value;
};
function generate(){
    var length=parseInt(slider.value);
    var chars="";
}
if(document.getElementById("upper").checked) chars+=upper;
if(document.getElementById("lower").checked) chars+=lower;
if(document.getElementById("numbers").checked) chars+=numbers;
if(document.getElementById("symbols").checked) chars+=symbols;

if(chars===""){
    alert("Please select at least one option");
    return;
}
var password=""
for(var i=0;i<length;i++){
    var index=Math.floor(Math.random()*chars.length);
    password +=chars[index]
}
output.value=password;
copyMsg.textContent="";


function copyPassword(){
if(!output.value)return;
navigator.clipboard.writeText(output.value);
copyMsg.textContent="Copied";

}








