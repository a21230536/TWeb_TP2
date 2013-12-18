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
 *
 */
(function(a){window.TWeb=function(b){b=b||{};var d=function(a){a=a||{};for(var b in a)if("undefined"!=typeof this[b])this[b](a[b]);return this},c;for(c in a)d[c]=a[c];c={header:0,nav:0,footer:0,aside:0,section:"home"};for(var e in c)if("undefined"!=typeof b[e])d[e](b[e]);else d[e](c[e]);return d};window.onhashchange=function(){a.section()}})({header:function(a){return this._load("header",a)},footer:function(a){return this._load("footer",a)},nav:function(a){return this._load("nav",a)},aside:function(a){return this._load("aside",
    a)},section:function(a,b,d){var c=this;this._section?"undefined"==typeof a?a=location.hash:location.hash=a:a=a||location.hash;b=b||function(b,d){"error"==d?c._section||c.section("#home"):(c._section=a,c._toggle())};var e=a.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i);if(e){a=e[1];var f=e[2];this._section!==a?b=function(b,e){"error"==e?c._section||c.section("#home"):(c._section=a,c._toggle($("a[href='%hash%']".replace("%hash%",a))),c._article(f,d))}:c._article(f,d)}if(this._section!==a)return a=a||"#home",
    this._load("section."+a.replace("#",""),0,b)},_article:function(a,b){$("div.articles article").removeClass("selected");$("section > nav a[data-name='%article%']".replace("%article%",a)).parent().addClass("selected").siblings().removeClass("selected");$("div.articles article[data-name='%article%']".replace("%article%",a)).addClass("selected");b?b():scroll(0,0)},article:function(a){var b=$('<article class="selected">').attr("data-name",a).load("content/article."+a+".html");b.appendTo("div.articles");
    var d=$("section > nav");if(!d.length)return b;b.removeClass("selected");d.find("ul").length||$("<ul>").appendTo(d);a=$("<a>").attr("data-name",a).html(a.replace(/\_/g," ")).click(function(){$("div.articles article").removeClass("selected");$(this).parent().addClass("selected").siblings().removeClass("selected");b.addClass("selected")});var c=$("<li>").append(a);c.appendTo("section > nav > ul");b.select=function(){this.siblings().removeClass("selected");c.addClass("selected").siblings().removeClass("selected");
        this.addClass("selected")};return b},css:function(a){this.header.$.css(a);this.footer.$.css(a);this.aside.$.css(a);this.section.$.css(a);this.nav.$.css(a)},slideshow:function(a){a=a||{};var b=$(a.el+" li");a.n=b.length-1;var d=a.n;setInterval(function(){var c=b[d];$(c).is(":visible")?$(c).fadeOut(1E3):$(c).fadeIn(1500,function(){b.show();d=a.n});0==--d&&(d=a.n)},1E3*a.seconds)},_toggle:function(a){a=a||$("a[href='%hash%']".replace("%hash%",location.hash));a=a.parent();a.hasClass("selected")||a.addClass("selected").siblings().removeClass("selected")},
    _load:function(a,b,d){b=b||"content/"+a+".html";a.match(/^section/)&&(a="section");this[a].$=$(a).first().load(b,d);return this[a].$},_section:0});

