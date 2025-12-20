/*** MAIN JAVASCRIPT ***/

/* All variables */

    var isSmallScreen;
    var isMobile;
    var isLargeScreen;

    var projectColour;
    var projectColourLight;
    var projectNumber;

    var detailActive = true;
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

    /*************************************************/
        


/* Check if page has loaded */

    var everythingLoaded = setInterval(function() { 
      if (/loaded|complete/.test(document.readyState)) {
        clearInterval(everythingLoaded);
        
        if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)){

            isMobile = true;
            init(); 
            /*$("#main").fadeIn().css("display", "inline-block");
            $(".spinner").hide();
            $('#bg').remove();
            $('.works').css("background-color", "white");*/

        } else {

            isMobile = false;
            init(); 
            /*$.ajax({
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
                                    });
                                    $(".spinner").hide();
                                });
                            } 
                        })
                    });
                },
                dataType: 'html',
                cache: false
            });  */
        }
      }
    }, 10);

    /*************************************************/



/* Check if desktop screen is small */

    function checkifSmallScreen(){

        /*var selected = $('.selected');
        var selectedPos = $(".selected").position();
        var selectedHeight = $(".selected .title").height();*/

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

        /*if ($(window).width() >= 2000)  {
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
        } */              
    }

    /*************************************************/
        
        

/* Initialise page load */

    function init() { // Initialise page load
        checkifSmallScreen();    

        var relPreRenderPage = "/" + $(".next .title").html().replace(/\s+/g, '') + ".html"
        var relPreRender = document.createElement ("link");
        relPreRender.setAttribute("rel", "prerender");
        relPreRender.setAttribute("href",relPreRenderPage);
        document.getElementsByTagName("head")[0].appendChild(relPreRender);

        projectColour = $(".project-title").attr("data-color");
        projectColourLight = $(".project-title").attr("data-colorlight");
        projectNumber = $(".project-title").attr("data-project");

        //$(".intro div").css("left", $(".selected").position().left);            
        $(".collage, .project-bg, .loop").not(".transparent").css("background-color", projectColour);
        $(".proj_color").css("color", projectColour);
        $(".project-bg-light").css("background-color", projectColourLight);
        $("body::selection").css("background", projectColour);
        $(".mobile").hide();

        $('#bg').css("transform", "translateY(-99%)");
        $(".spinner").hide();
        //$("#main").fadeIn().css("display", "inline-block");   
        $("#bg").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
             $("#main").fadeIn( "500", function() {
                $(this).css("display", "inline-block");
                if(isMobile){
                    $(".desktop").hide();
                    $(".mobile").show();
                }
            });
         });
    }

    /*************************************************/
        


/* Load individual project *********************************************************************/

    /* All Images & Videos loaded */

        function allLoaded(){ 

            var relPreRenderPage = "/" + $(".next .title").html().replace(/\s+/g, '') + ".html"
            var relPreRender = document.createElement ("link");
            relPreRender.setAttribute("rel", "prerender");
            relPreRender.setAttribute("href",relPreRenderPage);
            document.getElementsByTagName("head")[0].appendChild(relPreRender);

            $(".spinner").hide();
        /*
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
*/
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

    /* Back */

        $(document).on("click",".back, #logo", function(){ 
             //window.close();
             window.location.href = 'http://www.kexiny.com';
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

                console.log($(this).attr("data-id"));
                var nextProj = $(this).attr("data-id");
          
                    
                $('#transition-bg').css({
                    "background-color": $(this).attr("data-color"),
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
                    if(nextProj == "#project1"){
                        window.location.href = '/simplifying-conference-registration.html';
                    } else if (nextProj == "#project2"){
                        window.location.href = '/reimbursing-expenses-promptly.html';
                    } else if (nextProj == "#project3"){
                        window.location.href = '/discovering-lifestyle.html';
                    } else if(nextProj == "#project4"){
                        window.location.href = '/explaining-budget.html';
                    }


                    //launchProject($(nextProj));
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
            } // Profile

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
            } // Case studies
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
       


        

        