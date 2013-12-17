//JavaScript
/*
(function(a){window.TWeb=function(b){b=b||{};var d=function(a){a=a||{};for(var b in a)if("undefined"!=typeof this[b])this[b](a[b]);return this},c;for(c in a)d[c]=a[c];c={header:0,nav:0,footer:0,aside:0,section:"home"};for(var e in c)if("undefined"!=typeof b[e])d[e](b[e]);else d[e](c[e]);return d};window.onhashchange=function(){a.section()}})({header:function(a){return this._load("header",a)},footer:function(a){return this._load("footer",a)},nav:function(a){return this._load("nav",a)},aside:function(a){return this._load("aside",
    a)},section:function(a){this._section?"undefined"==typeof a?a=location.hash:location.hash=a:a=a||location.hash;this._section=1;this._toggle();return this._load("section."+a.replace("#",""))},article:function(a,b){b=b||a+" selected";var d=$('<article class="'+b+'">').load("content/article."+a+".html");d.appendTo("div.articles");var c=$("<a>").html(a.replace(/\_/g," ")).click(function(){$("div.articles article").removeClass("selected");$(this).parent().addClass("selected").siblings().removeClass("selected");
    d.addClass("selected")}),c=$("<li>").append(c);1!=b&&c.addClass("selected");c.appendTo("section > nav > ul");return this},css:function(a){this.header.$.css(a);this.footer.$.css(a);this.aside.$.css(a);this.section.$.css(a);this.nav.$.css(a)},slideshow:function(a){a=a||{};var b=$(a.el+" li");a.n=b.length-1;var d=a.n;setInterval(function(){var c=b[d];$(c).is(":visible")?$(c).fadeOut(1E3):$(c).fadeIn(1500,function(){b.show();d=a.n});0==--d&&(d=a.n)},1E3*a.seconds)},_toggle:function(a){a=a||$("a[href=%hash%]".replace("%hash%",
    location.hash));a=a.parent();a.hasClass("selected")||a.addClass("selected").siblings().removeClass("selected")},_load:function(a,b){b=b||"content/"+a+".html";a.match(/^section/)&&(a="section");this[a].$=$(a).first().load(b);return this[a].$},_section:0});
(function(url, callback){
    // create a script element
    var script = document.createElement('script');
    script.setAttribute('type','text/JavaScript');
    script.setAttribute('src',url);
    // ie
    script.onreadystatechange = function () {
        if (this.readyState == 'complete') callback(script);
    };
    // other
    script.onload = function (){
        callback( script );
    };
    // append (load) the script
    var head = document.getElementsByTagName("head");
    head[0].appendChild(script);
})("js/jquery/jquery-2.0.3.js")
*/

/**
 * Situs JavaScript Constructor
 * HTML5 Content Loading with jQuery
 * @version none
 * @email jose.vieira.lisboa@gmail.com
 * @license Public
 */
(function(situs){
    window.TWeb = function(content){
        content = content || {};
        var _ = function(content){
            content = content || {};
            for(var name in content )
                if(typeof this[name] != 'undefined')
                    this[name](content[name]);
            return this;
        };
        for(var k in situs) _[k] = situs[k];
        var defaults = { header:0, nav:0, footer:0, aside:0, section:"home" };
        for(var name in defaults )
            if(typeof content[name] != 'undefined') _[name](content[name]);
            else _[name](defaults[name]);
        return _;
    };
    window.onhashchange = function(){
        situs.section();
    };
})({
    header: function(url){
        return this._load("header", url);
    },
    footer: function(url){
        return this._load("footer", url);
    },
    nav: function(url){
        return this._load("nav", url);
    },
    aside: function(url){
        return this._load("aside", url);
    },
    section: function(section){
        if(!this._section) section = section || location.hash;
        else if(typeof section == 'undefined') section = location.hash;
        else location.hash = section;
        this._section = 1;
        this._toggle();
        return this._load("section."+section.replace("#", ""));
    },
    article: function(article, cssClass){
        cssClass = cssClass || article + " selected";
        var $article = $('<article class="' + cssClass + '">')
            .load('content/article.' + article + '.html');
        $article.appendTo("div.articles");

        var $a = $("<a>").html(article.replace(/\_/g, " ")).click(function(){
            $("div.articles article").removeClass('selected');
            $(this).parent().addClass("selected").siblings().removeClass("selected");
            $article.addClass("selected");
        });

        var $li = $("<li>").append($a)
        if(cssClass != 1) $li.addClass("selected");
        $li.appendTo("section > nav > ul");

        return this;
    },
    css: function(css){
        this.header.$.css(css);
        this.footer.$.css(css);
        this.aside.$.css(css);
        this.section.$.css(css);
        this.nav.$.css(css);
    },
    slideshow: function(attr){
        attr = attr || {};
        var $els = $(attr.el + ' li');
        attr.n = $els.length - 1;
        var i = attr.n;
        setInterval(function(){
            var el = $els[i];
            if($(el).is(":visible")) $(el).fadeOut(1000);
            else $(el).fadeIn(1500, function(){
                $els.show();
                i = attr.n;
            });
            if(--i == 0) i = attr.n;
        }, attr.seconds*1000);
    },
    _toggle: function($el){
        $el = $el || $("a[href=%hash%]".replace("%hash%", location.hash));
        var $menuItem = $el.parent();
        if($menuItem.hasClass('selected')) return;
        $menuItem.addClass('selected').siblings().removeClass('selected');
    },
    _load: function(el, url){
        url = url || "content/"+el+".html";
        if(el.match(/^section/)) el = "section";
        this[el].$ = $(el).first().load(url);
        return this[el].$;
    },
    _section: 0
});