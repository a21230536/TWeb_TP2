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
 * TP2.nav("content/nav.html");
 * TP2.aside("content/aside.html");
 * TP2.section("#home");
 * TP2.article("fado");
 *
 * //
 * TP2.slideshow("ul");
 * TP2.scroll("#section/article", 7);// scrolls to '#article li:nth-child(7)'
 * TP2.scrollTo("#id");// scrolls to '#id'
 * 
 * //
 * TP2.play(el);// plays or pauses HTLML5 video/audio element
 * TP2.toggle(el); // adds or removes class 'selected'
 * 
 * TP2.el(selector); // selects an element to use some methods
 *
 */
(function(a){a.loadScript("js/prefixfree.js");$("#screen").click(function(){$(this).fadeOut("fast")});window.TWeb=function(b){b=b||{};var c=function(a){a=a||{};for(var c in a)if("undefined"!=typeof this[c])this[c](a[c]);return this},d;for(d in a)c[d]=a[d];d={header:0,nav:0,footer:0,aside:0};for(var e in d)if("undefined"!=typeof b[e])c[e](b[e]);else c[e](d[e]);if("undefined"!=typeof b.section)c.section(b.section);else if(!c._validateHash(location.hash)||!location.hash&&"#home"!=location.hash)location.hash="home";window.onhashchange=function(){c.section()};return c}})({header:function(a){return this._load("header",a)},footer:function(a){return this._load("footer",a)},nav:function(a){return this._load("nav",a)},aside:function(a){return this._load("aside",a)},section:function(a,b){if(this._loaded_section)if("undefined"==typeof a){if(!this._validateHash(location.hash))return!1;a=location.hash}else{if(!this._validateHash(a))return!1;if(!a.match(/\//g)){location.hash!=a&&(location.hash=a);return}}else if(a=a||location.hash,!this._validateHash(a))return!1;var c=this._sectionCallback(a,b,this),d=a.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i);d&&(a=d[1]);if(this._loaded_section!==a)return this._section(a,c);d&&d[2]&&this._article(d[2],b);return $(a)},article:function(a,b){var c=0,d=$("article[data-name='%article%']".replace("%article%",a));d.length?c=1:(d=$('<article class="selected">').attr("data-name",a).load("content/article."+a+".html",b),d.appendTo("section div.articles"));var e=$("section > nav");if(e.length)d.removeClass("selected");else return c&&b&&b(),d;e.find("ul").length||$("<ul>").appendTo(e);var e=$("#body > section").attr("id"),g=$("section > nav > ul li a[data-name='%article%']".replace("%article%",a));if(!g.length){var g=$("<a>").attr("data-name",a).html(a.replace(/\_/g," ")).attr("href","#"+e+"/"+a),f=$("<li>").append(g);f.appendTo("section > nav > ul")}d.select=function(){$("#body > section").attr("id");this.siblings().removeClass("selected");f.addClass("selected").siblings().removeClass("selected");this.addClass("selected")};c&&b&&b();return d},css:function(a){this.header.$.css(a);this.footer.$.css(a);this.aside.$.css(a);this.section.$.css(a);this.nav.$.css(a)},slideshow:function(a){a=a||{};var b=$(a.el+" li");a.n=b.length-1;var c=a.n;setInterval(function(){0<c?$(b[c--]).fadeOut(1E3):$(b[a.n]).fadeIn(1E3,function(){c=a.n;b.show()})},1E3*a.seconds)},scroll:function(a,b,c){c=this._match(a);if(!c)return!1;var d=this,e="#%id% li:nth-child(%i%)",e=e.replace("%id%",c[2]),e=e.replace("%i%",b);this.section(a,function(){location.hash=a;setTimeout(function(){d.scrollTo(e)},300)})},scrollTo:function(a,b){var c=$(a);if(!c.length)return!1;b=b||2E3;$("html, body").animate({scrollTop:c.offset().top-10},b);setTimeout(function(){$(a).addClass("selected");setTimeout(function(){$(a).removeClass("selected")},b)},b)},toggle:function(a,b){var c=$(a);"undefined"!=typeof b?("function"==typeof b&&(b=b()),b?c.addClass("selected"):c.removeClass("selected")):c.hasClass("selected")?c.removeClass("selected"):c.addClass("selected")},play:function(a,b){var c=$(a);c[0].volume=b||0.25;c[0].paused?c[0].play():c[0].pause();return this},el:function(a){var b=this;return{selector:a,a:function(a){var b=$("<a>");a.cssClass&&b.addClass(a.cssClass);a.title&&b.attr("title",a.title);a.click&&b.click(a.click);$(this.selector).prepend(b);return this},scrolls:function(a){console.log("scrolls");$(this.selector).click(function(){var d=$(this).attr("data-index");b.scroll(a,d)})}}},loadScript:function(a,b){var c=document.createElement("script");c.setAttribute("type","text/JavaScript");c.setAttribute("src",a);c.onreadystatechange=function(){"complete"==this.readyState&&b&&b(c)};c.onload=function(){b&&b(c)};document.getElementsByTagName("head")[0].appendChild(c)},_match:function(a){return a.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i)},_validateHash:function(a){return a.match(/\/$/g)||!a.match(/^#[\w\-\/]+$/i)?!1:!0},_sectionCallback:function(a,b,c,d){var e=a.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i);e&&(a=e[1],d=e[2]);return function(e,f){"error"==f?c._loaded_section||"#home"==a||c.section("#home"):(location.hash.match(a)||(location.hash=a),c._loaded_section=a,d?(c._toggle($("a[href='%hash%']".replace("%hash%",a))),c._article(d,b)):c._toggle())}},_section:function(a,b){if(!a.match(/^#/))throw"invalid section name "+a;$("section").attr("id",a.replace("#",""));return this._load(a,"content/section.%section%.html".replace("%section%",a.replace("#","")),b)},_article:function(a,b){$("section div.articles article").removeClass("selected");$("section > nav a[data-name='%article%']".replace("%article%",a)).parent().addClass("selected").siblings().removeClass("selected");$("section div.articles article[data-name='%article%']".replace("%article%",a)).addClass("selected");b?b():window.scroll(0,0)},_toggle:function(a){a=a||$("a[href='%hash%']".replace("%hash%",location.hash));a=a.parent();a.hasClass("selected")||a.addClass("selected").siblings().removeClass("selected")},_load:function(a,b,c){b=b||"content/"+a+".html";return $(a).first().load(b,c)},_loaded_section:0});
