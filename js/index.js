//JavaScript

window.TP2 = {
    header: function(url){
        this._load("#header", url);
    },
    footer: function(url){
        this._load("#footer", url);
    },
    nav: function(url){
        this._load("#nav", url);
    },
    section: function(section){
        section = section || location.hash;
        TP2._load("#section",
            "/TWeb_TP2/content/section."+ section.replace("#", "") +".html");
    },
    aside: function(url){
        this._load("#aside", url);
    },
    article: function(article, cssClass){
        cssClass = cssClass || article + " selected";
        $('<article class="' + cssClass + '">')
            .load('content/article.'+article+'.html')
            .appendTo("div.body");
    },
    menuItem: {
        click: function(){
            TP2.menuItem.toggle($(this));
        },
        toggle: function($el){
            $el = $el || $("a[href=" + location.hash + "]");
            var $menuItem = $el.parent();
            if($menuItem.hasClass('selected')) return;
            $menuItem.addClass('selected').siblings().removeClass('selected');
        }
    },
    _load: function(el, url){
        $(el).load(url);
    }
};

window.onhashchange = function(){
    TP2.menuItem.toggle();
    TP2.section();
};
