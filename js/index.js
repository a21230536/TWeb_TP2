/*$('<div id="screen">').css({
	position:"absolute",
	width:"100%",
	margin:0,
	padding:0,
	top:0,
	bottom:0,
	backgroundColor:"black",
	opacity:0.5
}).appendTo("body");

$("#screen").click(function(){
	$(this).fadeOut("fast")
});*/

/**
 * TWeb - Content Loading with jQuery
 *
 * //carrega conteúdos pré-definidos
 * TP2 = new TWeb();
 *
 * //ultrapassar os conteúdos pre-definidos
 * TP2 = new TWeb({
 *     header: "content/header2.html",
 *     footer: "content/footer2.html",
 *     nav: "content/nav2.html",
 *     aside: "content/aside2.html",
 *     section: "#section"
 * });
 *
 * //carregar conteúdos
 * TP2.header("content/header.html");
 * TP2.footer("content/footer.html");
 * TP2.footer("content/nav.html");
 * TP2.aside("content/aside.html");
 * TP2.section("#home");
 * TP2.article("fado");
 *
 * TP2.slideshow("ul");
 * TP2.scroll("#section/article", 7);// scrolls to '#article li:nth-child(7)'
 * TP2.scrollTo("#id");// scrolls to '#id'
 *
 */
(function(a){window.TWeb=function(b){b=b||{};var c=function(a){a=a||{};for(var b in a)if("undefined"!=typeof this[b])this[b](a[b]);return this},d;for(d in a)c[d]=a[d];d={header:0,nav:0,footer:0,aside:0};for(var e in d)if("undefined"!=typeof b[e])c[e](b[e]);else c[e](d[e]);if("undefined"!=typeof b.section)c.section(b.section);else if(console.log(location.hash),!c._validateHash(location.hash)||!location.hash&&"#home"!=location.hash)location.hash="home";window.onhashchange=function(){c.section()};return c}})({header:function(a){return this._load("header",a)},footer:function(a){return this._load("footer",a)},nav:function(a){return this._load("nav",a)},aside:function(a){return this._load("aside",a)},section:function(a,b){if(this._loaded_section)if("undefined"==typeof a){if(!this._validateHash(location.hash))return!1;a=location.hash}else{if(!this._validateHash(a))return!1;if(!a.match(/\//g)){location.hash!=a&&(location.hash=a);return}}else if(a=a||location.hash,!this._validateHash(a))return!1;var c=this._sectionCallback(a,b,this),d=a.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i);d&&(a=d[1]);if(this._loaded_section!==a)return this._section(a,c);d&&d[2]&&this._article(d[2],b);return $(a)},article:function(a,b){var c=0,d=$("article[data-name='%article%']".replace("%article%",a));d.length?c=1:(d=$('<article class="selected">').attr("data-name",a).load("content/article."+a+".html",b),d.appendTo("section div.articles"));var e=$("section > nav");if(e.length)d.removeClass("selected");else return c&&b&&b(),d;e.find("ul").length||$("<ul>").appendTo(e);e=$("section > nav > ul li a[data-name='%article%']".replace("%article%",a));if(!e.length){var e=$("<a>").attr("data-name",a).html(a.replace(/\_/g," ")).click(function(){$("section div.articles article").removeClass("selected");$(this).parent().addClass("selected").siblings().removeClass("selected");d.addClass("selected")}),f=$("<li>").append(e);f.appendTo("section > nav > ul")}d.select=function(){this.siblings().removeClass("selected");f.addClass("selected").siblings().removeClass("selected");this.addClass("selected")};c&&b&&b();return d},css:function(a){this.header.$.css(a);this.footer.$.css(a);this.aside.$.css(a);this.section.$.css(a);this.nav.$.css(a)},slideshow:function(a){a=a||{};var b=$(a.el+" li");a.n=b.length-1;var c=a.n;setInterval(function(){var d=b[c];$(d).is(":visible")?$(d).fadeOut(1E3):$(d).fadeIn(1500,function(){b.show();c=a.n});0==--c&&(c=a.n)},1E3*a.seconds)},scroll:function(a,b,c){c=this._match(a);if(!c)return!1;var d=this,e="#%id% li:nth-child(%i%)",e=e.replace("%id%",c[2]),e=e.replace("%i%",b);this.section(a,function(){setTimeout(function(){d.scrollTo(e)},300)})},scrollTo:function(a,b){var c=$(a);if(!c.length)return!1;b=b||2E3;$("html, body").animate({scrollTop:c.offset().top-10},b);setTimeout(function(){$(a).addClass("selected");setTimeout(function(){$(a).removeClass("selected")},b)},b)},_match:function(a){return a.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i)},_validateHash:function(a){return a.match(/\/$/g)||!a.match(/^#[\w\-\/]+$/i)?!1:!0},_sectionCallback:function(a,b,c,d){var e=a.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i);e&&(a=e[1],d=e[2]);return function(e,a)).parent().addClass("selected").siblings().removeClass("selected");$("section div.articles article[data-name='%article%']".replace("%article%",a)).addClass("selected");b?b():window.scroll(0,0)},_toggle:function(a){a=a||$("a[href='%hash%']".replace("%hash%",location.hash));a=a.parent();a.hasClass("selected")||a.addClass("selected").siblings().removeClass("selected")},_load:function(a,b,c){b=b||"content/"+a+".html";return $(a).first().load(b,c)},_loaded_section:0});
