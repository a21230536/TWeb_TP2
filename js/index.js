//JavaScript

/**
 * Situs JavaScript Constructor
 * HTML5 Content Loading with jQuery
 * @version none
 * @email jose.vieira.lisboa@gmail.com
 * @license Public
 */
(function(situs){
    window.Situs = function(content){
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
        section = section || location.hash;
        this._toggle();
        return this._load("section."+section.replace("#", ""));
    },
    article: function(article, cssClass){
        cssClass = cssClass || article + " selected";
        $('<article class="' + cssClass + '">')
            .load('content/article.'+article+'.html')
            .appendTo("div.body");
        return this;
    },
    css: function(css){
        this.header.$.css(css);
        this.footer.$.css(css);
        this.aside.$.css(css);
        this.section.$.css(css);
        this.nav.$.css(css);
    },
    _toggle: function($el){
        $el = $el || $("a[href=%hash%]".replace("%hash%",location.hash));
        var $menuItem = $el.parent();
        if($menuItem.hasClass('selected')) return;
        $menuItem.addClass('selected').siblings().removeClass('selected');
    },
    _load: function(el, url){
        url = url || "content/"+el+".html";
        if(el.match(/^section/)) el = "section";
        this[el].$ = $(el).first().load(url);
        return this[el].$;
    }
});
