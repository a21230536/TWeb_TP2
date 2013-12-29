/**
 * TWeb JavaScript Constructor
 * HTML5 Content Loading with jQuery
 * @version 0.0.0
 * @email jose.vieira.lisboa@gmail.com
 * @license Public
 */
(function(situs){
    situs.loadScript("js/prefixfree.js");

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

        var defaults = { header:0, nav:0, footer:0, aside:0 };
        for(var name in defaults )
           if(typeof content[name] != 'undefined') _[name](content[name]);
//Ze DISABLED load defaults...
//Ze           else _[name](defaults[name]);
//Ze
//Ze        if(typeof content.section != 'undefined') _.section(content.section);
//Ze        else {
//Ze            //console.log(location.hash);
//Ze            //_.section("#home");
                if((!_._validateHash(location.hash) || !location.hash)
                    && location.hash != "#home" ) location.hash = "home";
//Ze        }

        // to use the same object
        window.onhashchange = function(){
            //console.log("hashchange", location.hash, arguments);
            _.section();
        };

        return _;
    };

    TWeb.ready = function(f){
        if(this._ready) f();
        else this._readyStack.unshift(f);
    };
    TWeb._ready = 0;
    TWeb._readyStack = [];

    if(!window.jQuery) situs.loadScript("js/jquery/jquery-2.0.3.min.js", function(){
        TWeb._ready = 1;
        while(TWeb._readyStack.length) (TWeb._readyStack.shift())();
    });
    else TWeb._ready = 1;

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
        return this._load("aside", url, function(){
            $("section").css({
                "min-height": 1105//$('aside').height() + 15
            });
        });
    },
    section: function(section, callback){
        var _this = this;

        //*/ not ready, put it on when ready stack
        if(!TWeb._ready){
            if(section){
                TWeb.ready(function(){
                    setTimeout(function(){
                       scrollTo(0,0);
                    }, 250);
                    _this.section(section, callback);
                });
            }
            return _this;
        }
        //*/

        if(this._loading_section) return false;

        //1. first (section) load
        if(!this._loaded_section){
            section = section || location.hash;
            if(!this._validateHash(section)) return false;
        }
        //2. section not specified (hashchange event)
        else if(typeof section == 'undefined'){
            if(this._loaded_section === location.hash) return false;
            if(!this._validateHash(location.hash)) return false;
            section = location.hash;// no section argument: use hash
        }
        //3. section specified
        else {
            if(this._loaded_section == section) return false;

            if(!this._validateHash(section)) return false;
            if(!section.match(/\//g)){    
                // change the location hash
                if(location.hash != section){
                    console.log("force hashchange to", section);
                    location.hash = section;
                }
                else console.log("hash didn't change", section);
                return;
            }
        }

        var _callback = this._sectionCallback(section, callback, this);
        var matches = section.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i);
        if(matches) section = matches[1];

        // É necessário carregar a secção se a secção for diferente da secção carregada
        if( this._loaded_section !== section )  return this._section(section, _callback);

        if(matches && matches[2] ) _this._article(matches[2], callback); 
        return $(section);
    },
    article: function(article, callback){// returns jQuery wrapped article with custom select method
        var _callback = 0;

        // 1. article
        var $article = $("article[data-name='%article%']".replace('%article%', article));
        // article not found: load article
        if(!$article.length){
            $article = $('<article class="selected">').attr("data-name", article)
                .load('content/article.' + article + '.html', callback);
            $article.appendTo("section div.articles");
        }
        else _callback = 1;// rememmber to callbak

        //2. article navigator
        var $nav = $("section > nav"); 
        // section doesn't have a navigator: nothing else to do
        if(!$nav.length){
            if(_callback && callback) callback();
            return $article; 
        } 
        else $article.removeClass("selected");
        // the navigator nav is empty: create an unordered list
        if(!$nav.find("ul").length) $("<ul>").appendTo($nav); 

        var section = $("#body > section").attr('id');

        //3. article navigator link
        var $a = $("section > nav > ul li a[data-name='%article%']".replace('%article%', article));
        // article link item not found: create navigator item
        if(!$a.length){
            $a = $("<a>").attr("data-name", article).html(article.replace(/\_/g, " "))
                .attr("href", "#"+section +"/"+article);

            // navigator item
            var $li = $("<li>").append($a) // create item
            $li.appendTo("section > nav > ul");// add item to list
        }
    
        $article.select = function(){
            var hash = "#" + $("#body > section").attr('id') + "/" + article;
            //console.log("SELECT", location.hash, hash );
            //location.hash = hash;

            this.siblings().removeClass('selected');
            $li.addClass("selected").siblings().removeClass("selected");
            this.addClass("selected");

        };

        if(_callback && callback) callback();
        return $article;
    },
    /* EFFECTS */
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
            if( i > 0) $($els[i--]).fadeOut(1000);
            else $($els[attr.n]).fadeIn(1000, function(){
                i = attr.n;
                $els.show();
            });
        }, attr.seconds*1000);
    },
    scroll: function(section, i, t){
        var matches = this._match(section);
        if(!matches) return false;
        t = t || 2000;
        var _this = this;
        var selector = "#%id% li:nth-child(%i%)";
        selector = selector.replace("%id%", matches[2]);
        selector = selector.replace("%i%", i);
        this.section(section, function(){
            location.hash = section;
            setTimeout(function(){   
                _this.scrollTo(selector);
            }, 250);
        });
    },
    scrollTo: function(selector, t){
        var $el = $(selector);
        if(!$el.length) return false;
        t = t || 1000;
/*
        $('html, body').animate({
            scrollTop: $el.offset().top - 10
        }, t);
*/
        window.scrollTo(0, $el.offset().top - 10);

        setTimeout(function(){
            $(selector).addClass("selected");
            setTimeout(function(){
                $(selector).removeClass("selected");
            }, t);
        }, 250);
    },
    
    //music('#id').toggle(this)
    toggle: function(el, condition){
        var $el = $(el);
        if(typeof condition != 'undefined') {
            if(typeof condition == 'function') condition = condition();
            if(condition) $el.addClass("selected");
            else $el.removeClass("selected");
        }
        else {
            if($el.hasClass("selected")) $el.removeClass("selected");
            else $el.addClass("selected");
        }
    },
    play: function(selector, volume){
        var $el = $(selector);
        $el[0].volume = volume || .25;
        if ($el[0].paused) $el[0].play();
        else $el[0].pause();
        return this;
    },
    screen: function(url){
        //*/ not ready, put it on the 'when ready' stack
        var _this = this;
        if(!TWeb._ready){
            TWeb.ready(function(){
                _this.screen(url);
            });
            return _this;
        }
        //*/

        $("#screen").show();
        this.el("#screen").load(url);
        return this;
    },
    append: function(url){
        //*/ not ready, put it on the 'when ready' stack
        var _this = this;
        if(!TWeb._ready){
            TWeb.ready(function(){
                _this.append(url);
            });
            return _this;
        }
        //*/
        $("body").append($("<div>").load(url));
        return this;
    },
    el: function(selector){
        if(!TWeb._ready) return false;

        var _this = this;
        return {
            selector: selector,
            a: function(attr){
                var $el = $("<a>");
                if(attr.cssClass) $el.addClass(attr.cssClass);
                if(attr.title) $el.attr("title", attr.title);
                if(attr.click) $el.click(attr.click);
                $(this.selector).prepend($el);
                return this;
            },
            scrolls: function(section){
                //console.log("scrolls");
                $(this.selector).click(function(){
                    var index = $(this).attr("data-index");
                    _this.scroll(section, index);
                });
                return this;
            },
            load: function(url){
                $(this.selector).load(url);
                return this;
            },
            append: function(url){
                $(this.selector).append($("<div>").load(url));
                return this;
            },
            fadeOut: function(speed){
                $(this.selector).fadeOut(speed);
                return this;
            }
        };
    },
    /* AJAX */
    loadScript: function(url, callback){
        // create a script element
        var script = document.createElement('script');
        script.setAttribute('type','text/JavaScript');
        script.setAttribute('src',url);

        // ie
        script.onreadystatechange = function () {
            if (this.readyState == 'complete') if(callback) callback(script);
        };

        // other
        script.onload = function (){
            if(callback) callback( script );
        };

        // append (load) the script
        var head = document.getElementsByTagName("head");
        head[0].appendChild(script);
    },
    /* HELPERS */
    _match: function(section){
        return section.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i);
    },
    _validateHash: function(hash){
        if(hash.match(/\/$/g)) return false;
        if(!hash.match(/^#[\w\-\/]+$/i) )return false;
        return true;
    },
    _sectionCallback: function(section, callback, _this, article){
        var matches = section.match(/^(#[\w\-\_]+)\/([\w\-\_]+)$/i);
        if(matches){
            section = matches[1];
            article = matches[2];  
        }
        return function(){
            if(arguments[1] == "error"){
                //console.log("Failed to load ", section); 
                // load section #home
                // if theres isn't any section loaded and failed section is not #home 
                if(!_this._loaded_section && section != "#home")  _this.section("#home");
            }
            else{
                if(!location.hash.match(section)) location.hash = section;
                //$("section").css("opacity", 0).fadeTo("fast" , 1)
                _this._loaded_section = section;
                if(article){
                    _this._toggle( $("a[href='%hash%']".replace("%hash%", section)) );
                    _this._article(article, callback);
                }
                else _this._toggle();
            }
            _this._loading_section = 0;
        };
    },
    _section: function(section, callback){
        if(!section.match(/^#/)) throw "invalid section name " + section;
        $("section").attr("id", section.replace("#", ""));

        this._loading_section = section;
        return this._load(section,
            "content/section.%section%.html".replace("%section%", section.replace("#", "")),
            callback);
    },
    _article: function(article, callback){
        // unselect articles in section
        $("section div.articles article").removeClass('selected');        
        // select article's nav item
        $("section > nav a[data-name='%article%']".replace("%article%",article))
            .parent().addClass("selected").siblings().removeClass("selected");
        // select article
        $("section div.articles article[data-name='%article%']".replace("%article%", article)).addClass("selected");        
        if(callback) callback();
        else window.scroll(0,0);
        //$('html,body').scrollTop(0);
        //$('html, body').animate({ scrollTop: 0 }, 'fast');
    },
    _toggle: function($el){
        $el = $el || $("a[href='%hash%']".replace("%hash%", location.hash));
        var $menuItem = $el.parent();
        if($menuItem.hasClass('selected')) return;
        $menuItem.addClass('selected').siblings().removeClass('selected');
    },
    _load: function(el, url, callback){
        //*/ not ready, put it on the 'when ready' stack
        var _this = this;
        if(!TWeb._ready){
            //console.log("TWeb is not ready!");
            TWeb.ready(function(){
                _this._load(el, url, callback);
            });
            return _this;
        }
        //*/
        url = url || "content/" + el + ".html";
        return $(el).first().load(url, callback);
    },
    _loading_section: null,
    _loaded_section: 0,
    _: function(){
        // ...
        return this;
    }
});
