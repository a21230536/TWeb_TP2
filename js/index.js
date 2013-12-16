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
            .load('content/article.'+article+'.html');
        $article.appendTo("div.articles");

        var $a = $("<a>").html(article).click(function(){
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
