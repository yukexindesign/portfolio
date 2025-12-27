/*** MAIN JAVASCRIPT ***/

/* All variables */

    var videoID;
    var nowHovering = 0;
    var lastHovered;

    var isSmallScreen;
    var isMobile;
    var isLargeScreen;

    var projectColour;
    var projectColourLight;
    var projectNumber;

    var detailActive = false;
    var profileActive = false;
    var nextClicked = false;

    var allVidsLoaded = false;
    var allImgsLoaded;
    var imgCount = 0;
    var totalImgs;

    var currentscrollpos;
    var last_known_scroll_position = 0;
    var ticking = false;
    var moveout = false;
    var movein = true;

    var windowY;

    /*************************************************/
        


/* Check if page has loaded */

    var everythingLoaded = setInterval(function() { 
      if (/loaded|complete/.test(document.readyState)) {
        clearInterval(everythingLoaded);
        
        if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)){

            isMobile = true;
            init(); 
            $("#main").fadeIn().css("display", "inline-block");
            $(".spinner").hide();
            $('#bg').remove();
            $('.works').css("background-color", "white");

        } else {

            isMobile = false;
            init(); 
            $.ajax({
                url: "videos.html",
                success: function (data) { 
                    $("#main").append(data);     
                    $(".hover").each(function(i){
                        $(this).on("loadeddata", function(){
                            if (i+1 === $(".hover").length) {
                       
                                

                                $("#main").fadeIn( "500", function() {
                                    $(this).css("display", "inline-block");
                                    /*$('#main').append("<div id='works-bg'></div>");
                                    var worksH = $(".works").innerHeight();
                                    var worksM = parseInt($(".works").css("margin-top").replace(/[^0-9.]/g, ''));
                                    var worksT = $(".works").position().top;
                                    console.log(worksT);
                                    console.log(worksH);
                                    console.log(worksM);
                                    $("#works-bg").css({
                                        "top": worksT + worksM,
                                        "height": worksH
                                    });*/
                                    $(".spinner").hide();
                                });
                            } 
                        })
                    });
                },
                dataType: 'html',
                cache: false
            });  
        }
      }
    }, 10);

    /*************************************************/



/* Check if desktop screen is small */

    function checkifSmallScreen(){

        var selected = $('.selected');
        var selectedPos = $(".selected").position();
        var selectedHeight = $(".selected .title").height();

        if (($(window).width() <= 720) && (isMobile == true)) {
            isSmallScreen = true;
            $(".hover").css("display", "none");
        } else {
            isSmallScreen = false;
            $(".hover").css("display", "block");
        }

        if ($(window).width() <= 1080) {
            $(".indicator-fixed").hide();
        } else {
            $(".indicator-fixed").show();
        }

        if ($(window).width() >= 2000) {
            isLargeScreen = true;

        } else {
            isLargeScreen = false;
        }

        if ($(window).width() >= 2000)  {
            if (selected.length) {
                var wrapperPos = selectedPos.top + selectedHeight;
                 var largeS = (wrapperPos/4) * 3
                 //console.log("largeS " + largeS)
                $(".intro div").css("margin-top", largeS);
            }

        } 

        if (($(window).width() < 2000) && (!isMobile)) {
            if (selected.length) {
                var wrapperPos = selectedPos.top + selectedHeight;
                $(".intro div").css("margin-top", wrapperPos);
            }
        }               
    }

    /*************************************************/
        
        

/* Load main project listing */

    function display(works) { 
        var out = "";
        var i;
        var image;

        for(i = 0; i < works.length; i++) {
            //out = '<div class="item" id="project' + (i + 1) + '" data-project="' + (i + 1) + '"' + ' data-color="' + works[i].color + '" onClick="_gaq.push([' + "'" + "_trackEvent', 'project', 'click', 'project" + (i + 1) + "', '0']);" + '"' + '><p class="title fw-bold">' + works[i].title + '</p><p class="type">' + works[i].type + '</p></div>';
            if (works[i].active == "yes") {
                out = '<div class="item" id="project' + (i + 1) + '" data-project="' + (i + 1) + '"' + ' data-color="' + works[i].color + '" data-colorlight="' + works[i].colorlight + '" data-active="' + works[i].active + '"><h1 class="title fw-bold cs' + (i + 1) + '">' + works[i].title + '</h1><p class="type">' + works[i].type + '</p></div>';
            } else {
                out = '<div class="item coming-soon" id="project' + (i + 1) + '" data-project="' + (i + 1) + '"' + ' data-color="' + works[i].color + '" data-colorlight="' + works[i].colorlight + '" data-active="' + works[i].active + '"><h1 class="title fw-bold">' + works[i].title + '</h1><p class="type">' + works[i].type + '</p></div>';
            }
            $('.works').append(out);

            /*if(works.length - 1 === i) {
                console.log(document.querySelectorAll("body")[0].scrollHeight);
            }*/
        }
    }

    function init() { // Initialise page load
        checkifSmallScreen();    
    	display(list);
    }

    /*************************************************/
        


/* Load individual project *********************************************************************/


    /* Project listing hover & click */

    	$(document).on( 
        {
            mouseenter: function()
            {     
                var relPreRenderPage = "/" + $(this).attr("data-project").replace(/\s+/g, '') + ".html"
                var relPreRender = document.createElement ("link");
                relPreRender.setAttribute("rel", "prerender");
                relPreRender.setAttribute("href",relPreRenderPage);
                document.getElementsByTagName("head")[0].appendChild(relPreRender);

                if ($(this).attr("data-active") == "no") {
                    $(this).css("cursor", "default");
                }

                $(".fixed, .opening, #email svg").addClass("tc-white");
                $('#bg').css("background-color", $(this).attr("data-color"));

                nowHovering = $(this).attr("data-project");

                if(isMobile == false && isSmallScreen == false) {
                    $(".item").not(this).css("opacity", "0.1");

                    var hoveredProj = String($(this).attr("data-project"));
                    videoID = '#hover' + hoveredProj;
                
                    if($(videoID).hasClass("exit-vid")){
                        $(videoID).removeClass("exit-vid").addClass("active-vid");
                    } else {
                        $(videoID).addClass("active-vid");
                    }

                    if ($(videoID).is("video")){
                        $(videoID)[0].play();
                    }
                }
            },
            mouseleave: function()
            {
                var relPreRenderPage = "/" + $(this).attr("data-project").replace(/\s+/g, '') + ".html"
                $("link[href='" + relPreRenderPage + "']").remove();

                $(".fixed, .opening, #email svg").removeClass("tc-white");

                $('#bg').css("background-color", "none");
                justHovered = nowHovering;

                $(".item").not(this).css("opacity", "1");
                
                 if(isMobile == false && isSmallScreen == false) {

                    $(videoID).addClass("exit-vid").removeClass("active-vid");
                    setTimeout(function(){
                        $(".exit-vid").removeClass("exit-vid");
                    }, 800);

                    if ($(videoID).is("video")){
                        $(videoID)[0].pause();
                        $(videoID)[0].currentTime = 0;
                    }

                }
             
            },
            click: function()
            {
                event.preventDefault;
                /*gtag('event', 'click', {
                  'event_category': project,
                  'event_action': click,
                  'event_label': project1,
                  'value': 0
                });*/
                if ($(this).attr("data-active") == "yes") {
                    launchProject($(this));
                }
            }
        }
        , '.item');

        /*************************************************/

    /* All Images & Videos loaded */

        function allLoaded(){ 

            var relPreRenderPage = "/" + $(".next .title").html().replace(/\s+/g, '') + ".html"
            var relPreRender = document.createElement ("link");
            relPreRender.setAttribute("rel", "prerender");
            relPreRender.setAttribute("href",relPreRenderPage);
            document.getElementsByTagName("head")[0].appendChild(relPreRender);

            $(".spinner").hide();
      
            if (nextClicked == false) { // Clicked from listing
                if(isMobile == false && isSmallScreen == false) {
                    $("body").css("position", "relative");
                    $(".detail").css("opacity", "1");
             
                } else {
                    $("body").css("position", "relative");
                    $(".selected").fadeIn();
                    $(".detail").css("opacity", "1");
                    $('#transition-bg').css("transform", "translateY(-99%)");
                    if(isSmallScreen == true && isMobile == false) {
                        $('#bg').css("transform", "translateY(-99%)");
                    }
                }
            } else { // Clicked next
                if(isMobile == false && isSmallScreen == false) {
                    $(".detail").fadeIn( "500", function() {
                        $("body").css("position", "relative");
                        $('#transition-bg').css("transform", "translateY(-99%)");
                    });
                } else {
                    $(".selected").fadeIn();
                    $("body").css("position", "relative");
                    $(".detail").show();
                    $('#transition-bg').css("transform", "translateY(-99%)");
                    if(isSmallScreen == true && isMobile == false) {
                        $('#bg').css("transform", "translateY(-99%)");
                    }
                }
            }

            $(".back, #logo").addClass("active-btn").removeAttr("onclick");

            if (isMobile == false){
                $(".indicator-fixed").html("&#9667;&#9667;&#9667;").fadeIn();
            } else {
                //$('#bg').css("transform", "translateY(-99%)");
            }

            checkifSmallScreen();

            detailActive = true;
            nextClicked = false;
        }
        

        function checkVidLoad(){ // Check of videos are loaded
            var i = 0;
            $(".detail .loop").each(function(i){
                $(this).on("canplay", function(){
                    mediacount = mediacount + 1;
                    if(mediacount == totalMedia){
                    }
                    if (i+1 === $(".detail .loop").length) {
                        allVidsLoaded = true;
                        allLoaded();
                    } 
                })
            });
        }


        function checkImgLoad(){ // Check if images are loaded
            allImgsLoaded = false;
            imgCount = 0;
            totalImgs = $(".detail img").length;
            var i = 0;
         
            $(".detail img").each(function(i){
                $(this).on("load", function(){
                    if (i+1 === $(".detail img").length) {
                        allImgsLoaded = true;
                        allLoaded();
                    }
                });
            });
        }

        /*************************************************/

    /* Launch html */

        function launchProject(_this){ 
            $(".spinner").show();

            projectColour = _this.attr("data-color");
            projectColourLight = _this.attr("data-colorlight");
            projectNumber = _this.attr("data-project");

            _this.find(".title").css("color", projectColour);
            $(".fixed").removeClass("tc-white");
            $(".tc-white").removeClass("tc-white");
            $("#works-bg").css("background-color","#f5f5f5");

            var topPos = _this.position().top;
            var h = _this.height();
            var titleh = _this.find(".title").height();
            var finalPos;
            
            if(nextClicked == false && profileActive == false) { // Clicked from main listing

                /* Background transition */
                if(isMobile == false && isSmallScreen == false) { // [BG] Desktop
                    $('#bg').css("transform", "translateY(-99%)");
                    $('#transition-bg').css({
                        "background-color": projectColour,
                        "transform": "translateY(-99%)"
                    })
                    $("#transition-bg").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
     
                         $('#bg').css({
                            "opacity": "0",
                            "transform": "translateY(0%)",
                            "background-color": "#f5f5f5"
                        }); 
                    });
                } else { // [BG] Mobile
                    $('#transition-bg').css({
                        "background-color": projectColour,
                        "transform": "translateY(0%)"
                    })
                }


                var newscroll = _this.offset().top;

                if (isLargeScreen == true) {
                    //finalPos = topPos - $(window).innerHeight()/1.4 - titleh;
                    console.log("selected top = " + topPos);
                    console.log("windowY = " + windowY);
                    
                    finalPos = topPos - windowY;
                    console.log("finalpos = " + finalPos);

                } else {
                    finalPos = topPos - windowY;
                }

                

             
                //console.log("selected height = " + h);
                //console.log("window innerheight = " + $(window).innerHeight());
                //console.log("newscroll = " + newscroll)

                

                $("body").css("position", "fixed");

                $(".opening").css("opacity", "0");
    
                $(".about").removeClass("active-btn").attr("onclick", "return false");
                $(".indicator-fixed").hide();

                _this.addClass("selected").removeClass("item");
                $(".selected").find(".type").fadeOut();

                var changeurl = _this.find(".title").html().replace(/\s+/g, '-').toLowerCase() + ".html";
                window.location.href = changeurl;
                return;
                if(isMobile == false) { // Desktop
                    
                    $(videoID).removeClass("active-vid");

                    if ($(videoID).is("video")){
                        $(videoID)[0].pause();
                        $(videoID)[0].currentTime = 0;
                    }

                    $(".item").not("selected").css("opacity", "0").addClass("inactive").removeClass("item");
                    //console.log(finalPos);
                    $(".selected").css({
                        'top': finalPos,
                        'position':'fixed'
                    });

                    if($(".selected").css('position') == 'fixed'){
                        $(".selected").animate({
                            "top": "86.1875"
                        },{
                            duration:800,
                            complete: function() {
                                
                                $(".inactive").hide();
                                $(".opening").hide();
                                /*$(this).removeClass("selected").addClass("selected-move");
                                $(".selected-move").css({
                                    'position':'relative',
                                    'top': '0'
                                });*/
                                
                                $.ajax({
                                    //url: _this.find(".title").html().replace(/\s+/g, '') + ".html",
                                    url: projectNumber + ".html",
                                    success: function (data) { 
                                        $(".detail").html(data); 
                                        checkImgLoad();
                                        $(".collage, .project-bg, .loop").not(".transparent").css("background-color", projectColour);
                                        $(".proj_color").css("color", projectColour);
                                        $(".project-bg-light").css("background-color", projectColourLight).find( "h3" ).css( "color", projectColour );
                                        $(".active").css("box-shadow", "0 0 0 1px white, 0 0 0 3px " + projectColour)
                                        $("body::selection").css("background", projectColour);
                                        $(".mobile").hide();
                                        $(window).scrollTop(0);

                                        var newTopPos =  $(".selected").position().top;
                                        var newh = $(".selected").height();
                                        //console.log(isLargeScreen);
                                        if (isLargeScreen == true) {
                                            var largeS = ((newTopPos + newh)/4) * 3
                                            $(".intro div").css("margin-top", largeS);
                                        } else {
                                            $(".intro div").css("margin-top", newTopPos + newh);
                                        }

                                        window.history.pushState("object or string", "Title", "/" + changeurl);

                                    },
                                    dataType: 'html',
                                    cache: false
                                });                       
                            }
                        });
                    };

                } else { // [Listing] Mobile ONLY

                    $(".item, .selected").fadeOut( "500", function() {

                        $(".item").not("selected").addClass("inactive").removeClass("item");

                        $(".selected").css({
                            'top': '40px'
                        });

                        $(".opening").hide();

                        $.ajax({
                            //url: $(".selected").find(".title").html().replace(/\s+/g, '') + ".html",
                            url: $(".selected").attr("data-project") + ".html",
                            success: function (data) { 

                                $(".detail").html(data); 
                                $('.works').css("background-color", "none");
                                checkImgLoad();
                                $(".collage, .project-bg, .loop").not(".transparent").css("background-color", projectColour);
                                $(".proj_color").css("color", projectColour);
                                $(".project-bg-light").css("background-color", projectColourLight);
                                $("body::selection").css("background", projectColour);

                                //$(".desktop").hide();
                                //$(".mobile").show();
                                $(window).scrollTop(0);
                                //console.log($(".full").css("z-index"));

                                window.history.pushState("object or string", "Title", "/" + changeurl);


                                /*var selectedheight = $(".selected").outerHeight()/2;

                                if (selectedheight > 20){
                                    $(".pj-desc").css("margin-top", "15px");
                                } else {
                                    $(".pj-desc").css("margin-top", "-28px");
                                }*/
                                //$('#bg').css("height", "0");
                                //window.history.pushState("object or string", "Title", "/" + _this.find(".title").html().replace(/\s+/g, '-').toLowerCase());
                            },
                            dataType: 'html',
                            cache: false
                        }); 
                    });
                }
            } 

            if (nextClicked == true) { // Clicked next

                $(".selected").css({
                    "opacity": "0",
                    "padding":"0",
                    "top": "0",
                    "display": "none",
                    "position": "relative"
                });

                $(".selected .type").show();
                $(".selected").removeClass("selected").addClass("inactive");
                _this.addClass("selected").removeClass("inactive");
                _this.find(".type").fadeOut();
                var changeurl = _this.find(".title").html().replace(/\s+/g, '-').toLowerCase() + ".html";

                //$('#transition-bg').css("background-color", projectColour);

                if(isMobile == false) { // [Next] Desktop

                    _this.css({
                        'position':'fixed',
                        'top': "86.1875px",
                        "opacity": "1"
                    });
                    $(".detail").empty();
                    $(".detail").hide();

                    if(_this.is(".selected") && $(".detail").css("display") == "none") {
                            
                        $.ajax({
                            //url: _this.find(".title").html().replace(/\s+/g, '') + ".html",
                            url: projectNumber + ".html",
                            success: function (data) { 

                                $(".detail").html(data); 
                                checkImgLoad();
                                $(".selected").fadeIn();
                                $(".collage, .project-bg, .loop").not(".transparent").css("background-color", projectColour);
                                $(".proj_color").css("color", projectColour);
                                $(".project-bg-light").css("background-color", projectColourLight);
                                $("body::selection").css("background", projectColour);
                                $(".mobile").hide();
                                $(window).scrollTop(0);
                                checkifSmallScreen();
                                newTopPos =  $(".selected").position().top;
                                newh = $(".selected .title").height();
                                
                                if (isLargeScreen == true) {
                                    var largeS = ((newTopPos + newh)/4) * 3
                                    $(".intro div").css("margin-top", largeS);
                                    //console.log("largeS " + largeS);
                                } else {
                                    var norm = newTopPos + newh;
                                    //console.log("norm " + norm);
                                    //console.log("newTopPos " + newTopPos);
                                    //console.log("newh " + newh);
                                    $(".intro div").css("margin-top", newTopPos + newh);
                                }
                                //window.history.pushState("object or string", "Title", "/" + _this.find(".title").html().replace(/\s+/g, '-').toLowerCase());
                                //$(".detail").css("opacity", "1");
                                //scroll = new Smooth({ native: true, preload: true });
                                //scroll.init();
                                $(".detail").fadeIn("500", function(){
                                    $('#transition-bg').css("transform", "translateY(-99%)");
                                });

                                window.history.pushState("object or string", "Title", "/" + changeurl);
                                
                            },
                            dataType: 'html',
                            cache: false
                        });                     
                    }  

                } else { // [Next] Mobile ONLY

                    $(".selected").css({
                        "top": "40px",
                        "opacity": "1"
                    });

                    $(".detail").empty();
                    //$(".detail").css("opacity", "0");
        
                    $.ajax({
                        //url: $(".selected").find(".title").html().replace(/\s+/g, '') + ".html",
                        url: $(".selected").attr("data-project") + ".html",
                        success: function (data) { 
                            $(".detail").html(data); 
                            checkImgLoad();
                            $(".intro").css("left", "auto")
                            $(".selected").fadeIn();
                            
                            //$(".selected").css("top", "initial").fadeIn();

                            $(".collage, .project-bg, .loop").not(".transparent").css("background-color", projectColour);
                            $(".proj_color").css("color", projectColour);
                            $(".project-bg-light").css("background-color", projectColourLight);
                            $("body::selection").css("background", projectColour);
                            //$(".desktop").hide();
                            //$(".mobile").show();
                            $(window).scrollTop(0);
                            checkifSmallScreen();
                            window.history.pushState("object or string", "Title", "/" + changeurl);
                            //window.history.pushState("object or string", "Title", "/" + _this.find(".title").html().replace(/\s+/g, '-').toLowerCase());
                            //$('#transition-bg').css("transform", "translateY(-99%)");
                 
                        },
                        dataType: 'html',
                        cache: false
                    }); 
                }
            }  
        }

    /*************************************************/



/* Fixed links *****************************************************************************/

    /* About */

        $(document).on( // Open about
        {
            click: function()
            {
                if(!detailActive){
                    event.preventDefault;
                    //window.history.pushState("object or string", "Title", "/about");
                    profileActive = true;

                    currentscrollpos = window.pageYOffset;
                    $(window).scrollTop(0);
                    $(".about").removeClass("active-btn").attr("onclick", "return false");
                    $(".close-about, #logo").addClass("active-btn").removeAttr("onclick");
                    $(".works, .nda").addClass("noscroll");
                    $(".indicator-fixed, .close-about, #logo, #email").removeClass("tc-norm").addClass("tc-white");
                    //$(".indicator-fixed").html("About");
                    $(".indicator-fixed").html("");
                    $(".opening .content-block").addClass("dark");
                    $(".opening a").addClass("opened");
                    
                    $('.profile').fadeIn( "500", function() {
                        $("#white-bg").show();
                    });
                }
            }
        }
        , '.about, .opening a');

        $(document).on( // Close about
        {
            click: function()
            {
                if(!detailActive){
                    event.preventDefault;
                    //window.history.pushState("object or string", "Title", "/");
                    profileActive = false;
                    
                    $(".close-about, #logo").removeClass("active-btn").attr("onclick", "return false");
                    $(".about").addClass("active-btn").removeAttr("onclick");
                    $(".indicator-fixed, .close-about, #logo, #email").removeClass("tc-white").addClass("tc-norm");
                    $(".indicator-fixed").html("");
                    $(".works, .nda").removeClass("noscroll");
                    $(".opening .content-block").removeClass("dark");
                    $(".opening a").removeClass("opened");
                    $(".profile").fadeOut( "500", function() {
                        $(window).scrollTop(0);
                        $("#white-bg").hide();
                    });
                }
            }
        }
        , '.close-about, #logo');

        $(document).on("click",".back, #logo", function(){ // Back
            event.preventDefault;
            if(detailActive){
                //window.history.pushState("object or string", "Title", "/");
                //$('#transition-bg').css("height", "100vh");
                $('#transition-bg').css("transform", "translateY(0%)");
                //setTimeout(function(){ $('#bg').css("background-color", "#eee"); }, 400);
                $(".opening").css("opacity", "1");

                $("#transition-bg").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
                    window.scroll(0, 0);
                    $(".detail").css("opacity", "0");
                    
                    if(isMobile == false){
                        /*$(".selected").css({
                            "padding":"0",
                            "top": "0",
                            "left": "0",
                            "position": "relative"
                        });*/
                        $(".selected").removeAttr("style");
                        $("body").removeAttr("style");
                    } else {
                        $('.works').css("background-color", "white");
                    }

                    $(".text p").hide();
                    $(".selected .title").css("color", "").show();
                    $(".selected .title, .back, #logo, #email").removeClass("tc-white");
                    $(".selected .type").fadeIn();
                    $(".selected").removeClass("selected").addClass("item");
                    $(".inactive").removeClass("inactive").css("opacity", "1").addClass("item").fadeIn();
                    $(".back, #logo").removeClass("active-btn").attr("onclick", "return false");;
                    $(".about").addClass("active-btn").removeAttr("onclick");;
                    //$(".indicator-fixed").html("Works").css({
                    $(".indicator-fixed").html("").removeClass("tc-white").removeAttr("href");
                    $(".project-bg-light, .project-bg, .proj_color").removeAttr("style");

                    $(".detail").empty();

                    $(".opening").fadeIn( "500", function() {
                        $("#works-bg").css("background-color","white");
                        if(isMobile == false){
                            $('#bg').css({
                                "opacity": "1",
                                "transform": "translateY(0%)"
                            });
                        }
                        $('#transition-bg').css("transform", "translateY(-100%)");
                        detailActive = false;
                    });
                });                
            }
        });

        /*************************************************/

    /* Next */

    $(document).on({

            /*mouseenter: function()
            { 
                $('#transition-bg').css({
                    "background-color": $(this).attr("data-color"),
                    //"top": "initial",
                    //"bottom": "0"
                });
            },
            mouseleave: function()
            { 
                $('#transition-bg').css({
                    "background-color": projectColour,
                });

            },*/
            click: function()
            {   

                detailActive = false;
                nextClicked = true;

                $('#transition-bg').css({
                    "background-color": $(this).attr("data-color"),
                });

                var nextProj = $(this).attr("data-id");
          
                    
                    $('#transition-bg').css({
                        "transform": "translateY(0%)"
                    });
                    //window.removeEventListener('scroll', smoothAnimation);
                
                setTimeout(function(){ 
                    window.scroll(0, 0);

                    $(".spinner").show();
                    $("body").css("position", "fixed");
                    $(".indicator-fixed").removeClass("tc-white");
                      $(".selected .title").css("color", "").show();
                    //window.addEventListener('scroll', smoothAnimation);
                    launchProject($(nextProj));
                }, 500);

            }
        }
    , '.next');



/* Resize responsive ************************************************************************/   

    $(window).resize(function(){ 
        checkifSmallScreen();
    });

    /*************************************************/



/* Detect scroll visibility ******************************************************************/   

        $.fn.inView = function(){ // Check fixed elements scroll pos

            var win = $(window);

            obj = $(this);
            //the top Scroll Position in the page
            var scrollPosition = win.scrollTop();

            //the end of the visible area in the page, starting from the scroll position
            var visibleAreaIn = win.scrollTop() + win.height();
            var visibleAreaOut = win.scrollTop();
            //var visibleArea = win.scrollTop() + win.height();
            //the end of the object to checks

            if (isLargeScreen == false){
                var objEndPos = obj.offset().top + 350 + obj.outerHeight();
                var objStartPos = obj.offset().top + 350;
            } else {
                var objEndPos = obj.offset().top + 850 + obj.outerHeight();
                var objStartPos = obj.offset().top + 850;
            }

            if (visibleAreaOut >= objEndPos) {
                moveout = true;
            } else {
                moveout = false;
            }
            
            if(visibleAreaIn <= objStartPos) {
                movein = true;
            } else {
                movein = false;
            }
           
            var pos = [movein, moveout];
            return pos;
            //return(visibleArea >= objStartPos && scrollPosition <= objStartPos ? true : false)
        };

        var checkScroll;

        function doSomething(scroll_pos) {

            if (profileActive == true) { // Profile

                $(".content-block").each(function(){
                    var pos = $(this).inView();
              
                    if((pos[0] == false) && (pos[1] == false)){
                        if($(this).hasClass("dark")){
                      
                            $(".indicator-fixed, .close-about, #logo, #email").removeClass("tc-norm").addClass("tc-white");
                        } else {
                  
                            $(".indicator-fixed, .close-about, #logo, #email").removeClass("tc-white").addClass("tc-norm");
                        }
                    }
                    /*if($(this).hasClass("dark")){
                        if(pos[0] == true){
                            $(".indicator-fixed, .close-about, #logo, #email").addClass("tc-white");
                            
                        } 
                    } */
                });
            } 

            if(detailActive == true) { // Case studies

                if (!isMobile){
                    if ($(window).scrollTop() > 100){
                        $(".selected .title").fadeOut();
                    } else {
                        $(".selected .title").fadeIn();
                    }
                }   

                $(".content-block").each(function(){
                    var pos = $(this).inView();
                    //console.log("pos = " + pos[0], pos[1]);
                      
                    if((pos[0] == false) && (pos[1] == false)){
                
                        if(isMobile == false) {
                            $(".indicator-fixed").html($(this).attr("data-title"));
                        }

                        if($(this).hasClass("dark")){
                            $(".indicator-fixed, .back, #logo, #email").removeClass("tc-norm").addClass("tc-white");
                        } else {
                            $(".indicator-fixed, .back, #logo, #email").removeClass("tc-white").addClass("tc-norm");
                        }
                    } 

                    if(pos[0] == true){
                        if($(this).hasClass("first")){

                            if(!nextClicked){
                                //$(".selected .title").removeClass("tc-white");
                                //$(".selected .title").show();
                            }

                            $(".indicator-fixed").css("opacity", "1").html("&#9667;&#9667;&#9667;");
                            $(".indicator-fixed, .back, #logo, #email").removeClass("tc-white").addClass("tc-norm");
                                //$(".selected .title").addClass("tc-white");
                        }
                    } else {
                        if(!nextClicked){
                            //$(".selected .title").addClass("tc-white");
                            //$(".selected .title").hide();
                        }
                    }

                });
            } else {
                 windowY = window.scrollY;
                 console.log(windowY);
            } 
        } // do something

        window.addEventListener('scroll', smoothAnimation);

        function smoothAnimation(e){
          last_known_scroll_position = window.scrollY;

          if (!ticking) {

            window.requestAnimationFrame(function() {
              doSomething(last_known_scroll_position);
              ticking = false;
            });
             
            ticking = true;

          }
          
        }

        var scrollElement = function (element, scrollPosition, duration) {
          var style = element.style;

          // setup CSS transition duration and easing function
          style.webkitTransition =
                style.transition = duration + 's';
          style.webkitTransitionTimingFunction =
                style.TransitionTimingFunction = 'ease-in-out';

          // use translate3d to force hardware acceleration
          style.webkitTransform =
                style.Transform = 'translate3d(0, ' + -scrollPosition + 'px, 0)';
        }

        var scrollBody = scrollElement.bind(null, document.getElementsByTagName('body')[0]);

    /*************************************************/



/* Loop images *******************************************************************************/   
        
    /*
        function InfiniteRotator(){

                //initial fade-in time (in milliseconds)
                //var initialFadeIn = 0;
                var infiniteLoop0 = 0;

                
                //interval between items (in milliseconds)
                var itemInterval0 = 150;
                var itemInterval11 = 1000;
                var itemInterval13 = 1000;
                var itemInterval24 = 2000;
                
                //cross-fade time (in milliseconds)
                var fadeTime = 0;
                
                //count number of items
                var numberof0 = $('.rotating-item-0').length;
                var numberof11 = $('.rotating-item-11').length;
                var numberof13 = $('.rotating-item-13').length;
                var numberof24 = $('.rotating-item-24').length;

                //set current item
                var current0 = 0;
                var current11 = 0;
                var current13 = 0;
                var current24 = 0;

                //show first item
                //$('.rotating-item').eq(currentItem).fadeIn(initialFadeIn);

                //loop through the items        
                var infiniteLoop0 = setInterval(function(){
                    $('.rotating-item-0').eq(current0).hide();

                    if(current0 == numberof0 -1){
                        current0 = 0;
                    }else{
                        current0++;
                    }
                    $('.rotating-item-0').eq(current0).show();

                }, itemInterval0);   

                var infiniteLoop11 = setInterval(function(){
                    $('.rotating-item-11').eq(current11).hide();

                    if(current11 == numberof11 -1){
                        current11 = 0;
                    }else{
                        current11++;
                    }
                    $('.rotating-item-11').eq(current11).show();

                }, itemInterval11);   

                var infiniteLoop13 = setInterval(function(){
                    $('.rotating-item-13').eq(current13).hide();

                    if(current13 == numberof13 -1){
                        current13 = 0;
                    }else{
                        current13++;
                    }
                    $('.rotating-item-13').eq(current13).show();

                }, itemInterval13);   

                var infiniteLoop24 = setInterval(function(){
                    $('.rotating-item-24').eq(current24).hide();

                    if(current24 == numberof24 -1){
                        current24 = 0;
                    }else{
                        current24++;
                    }
                    $('.rotating-item-24').eq(current24).show();

                }, itemInterval24);  
            }; 
        */  

    /*************************************************/

        /*function openLink(){
            window.open("http://192.168.1.1/portfolio2020/index_proj1.html");
        }*/


       /* Remove css hover effects on mobile */
       function hasTouch() {
            return 'ontouchstart' in document.documentElement
                   || navigator.maxTouchPoints > 0
                   || navigator.msMaxTouchPoints > 0;
        }

        if (hasTouch()) { // remove all the :hover stylesheets
            try { // prevent exception on browsers not supporting DOM styleSheets properly
                for (var si in document.styleSheets) {
                    var styleSheet = document.styleSheets[si];
                    if (!styleSheet.rules) continue;

                    for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                        if (!styleSheet.rules[ri].selectorText) continue;

                        if (styleSheet.rules[ri].selectorText.match(':hover')) {
                            styleSheet.deleteRule(ri);
                        }
                    }
                }
            } catch (ex) {}
        }
       


        

        
