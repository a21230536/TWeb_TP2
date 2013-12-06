//JavaScript

if(console) console.log("TWeb TP2 Pronto.");

if(!window.jQuery) throw "jQuery não Encontrado!";

$("#header").load("/TWeb_TP2/content/header.html");
$("#nav").load("/TWeb_TP2/content/nav.html");
$("#footer").load("/TWeb_TP2/content/footer.html");
$("#content").load("/TWeb_TP2/content/section.home.html");
//$("aside").get(0).load("/TWeb_TP2/content/aside.html");
