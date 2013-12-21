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
 *
 */
(function(a){window.TWeb=function(b){b=b||{};var d=function(a){a=a||{};for(var b in a)if("undefined"!=typeof this[b])this[b](a[b]);return this},c;for(c in a)d[c]=a[c];c={header:0,nav:0,footer:0,aside:0};for(var e in c)if("undefined"!=typeof b[e])d[e](b[e]);else d[e](c[e]);if("undefined"!=typeof b.section)d.section(b.section);else if(console.log(location.hash),!d._validateHash(location.hash)||!location.hash&&"#home"!=location.hash)location.hash="home";window.onhashchange=function(){d.section()};return d}})({header:function(a){return this._load("header",
a)},footer:function(a){return this._load("footer",a)},nav:function(a){return this._load("nav",a)},aside:function(a){return this._load("aside",a)},section:function(a,b){if(this._loaded_section)if("undefined"==typeof a){if(!this._validateHash(location.hash))return!1;a=location.hash}else{if(!this._validateHash(a))return!1;if(!a.match(/\//g)){location.hash!=a&&(location.hash=a);return}}else if(a=a||location.hash,!this._validateHash(a))return!1;var d=this._sectionCallback(a,b,this),c=a.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i);
c&&(a=c[1]);if(this._loaded_section!==a)return this._section(a,d);c&&c[2]&&this._article(c[2],b);return $(a)},article:function(a,b){var d=0,c=$("article[data-name='%article%']".replace("%article%",a));c.length?d=1:(c=$('<article class="selected">').attr("data-name",a).load("content/article."+a+".html",b),c.appendTo("section div.articles"));var e=$("section > nav");if(e.length)c.removeClass("selected");else return d&&b&&b(),c;e.find("ul").length||$("<ul>").appendTo(e);e=$("section > nav > ul li a[data-name='%article%']".replace("%article%",
a));if(!e.length){var e=$("<a>").attr("data-name",a).html(a.replace(/\_/g," ")).click(function(){$("section div.articles article").removeClass("selected");$(this).parent().addClass("selected").siblings().removeClass("selected");c.addClass("selected")}),f=$("<li>").append(e);f.appendTo("section > nav > ul")}c.select=function(){this.siblings().removeClass("selected");f.addClass("selected").siblings().removeClass("selected");this.addClass("selected")};d&&b&&b();return c},css:function(a){this.header.$.css(a);
this.footer.$.css(a);this.aside.$.css(a);this.section.$.css(a);this.nav.$.css(a)},slideshow:function(a){a=a||{};var b=$(a.el+" li");a.n=b.length-1;var d=a.n;setInterval(function(){var c=b[d];$(c).is(":visible")?$(c).fadeOut(1E3):$(c).fadeIn(1500,function(){b.show();d=a.n});0==--d&&(d=a.n)},1E3*a.seconds)},scroll:function(a,b,d){var c=this._match(a);if(!c)return!1;d=d||2E3;var e="#%id% li:nth-child(%i%)",e=e.replace("%id%",c[2]),e=e.replace("%i%",b);this.section(a,function(){setTimeout(function(){$("html, body").animate({scrollTop:$(e).offset().top},
d)},300)})},_match:function(a){return a.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i)},_validateHash:function(a){return a.match(/\/$/g)||!a.match(/^#[\w\-\/]+$/i)?!1:!0},_sectionCallback:function(a,b,d,c){var e=a.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i);e&&(a=e[1],c=e[2]);return function(e,g){"error"==g?(console.log("Failed to load ",a),d._loaded_section||"#home"==a||d.section("#home")):(d._loaded_section=a,c?(d._toggle($("a[href='%hash%']".replace("%hash%",a))),d._article(c,b)):d._toggle())}},_section:function(a,
b){if(!a.match(/^#/))throw"invalid section name "+a;$("section").attr("id",a.replace("#",""));return this._load(a,"content/section.%section%.html".replace("%section%",a.replace("#","")),b)},_article:function(a,b){$("section div.articles article").removeClass("selected");$("section > nav a[data-name='%article%']".replace("%article%",a)).parent().addClass("selected").siblings().removeClass("selected");$("section div.articles article[data-name='%article%']".replace("%article%",a)).addClass("selected");
b?b():scroll(0,0)},_toggle:function(a){a=a||$("a[href='%hash%']".replace("%hash%",location.hash));a=a.parent();a.hasClass("selected")||a.addClass("selected").siblings().removeClass("selected")},_load:function(a,b,d){b=b||"content/"+a+".html";return $(a).first().load(b,d)},_loaded_section:0});
