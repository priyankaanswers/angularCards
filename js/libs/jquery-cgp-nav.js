//Common.js
$(document).ready(function() {
    //Nav Bar
    /*$('nav li a').on('click', function () {
        $('nav li a').removeClass('active');
        $('nav li').removeClass('activeli');
        $(this).addClass('active');
        $(this).parent().addClass('activeli');
    });*/
    //Sub Nav Bar
    //Only for News and Events for now in desktop view
    if ($(window).width() > 992) {
        $("#news, #events").mouseover(function() {
            if (!$('#news, #events').hasClass('active')) {
                $('.subNavBarDummy').hide();
                $('#subNavBar').show();
            }
        }).mouseout(function() {
            if (!$('#news, #events').hasClass('active')) {
                $('#subNavBar').hide();
                $('.subNavBarDummy').hide();
            }
        });
        $("#subNavBar").mouseover(function() {
            $('.subNavBarDummy').hide();
            $(this).show();
        });
    }

    //Hide sub nav bar for tablet and mobile versions
    if ($(window).width() > 992) {
        $('#subNavBar').hide();
        $('.subNavBarDummy').hide();

    }
    //Hide tablet viewnav on click
    // $('.categoriesMain .nav li a').on('click', function() {
    //     console.log('test')
    // });


    // //On re-sizing window for sub-nav
    // $(window).resize(function() {
    //     if ($(window).width() > 992) {
    //         $("#news, #events").mouseover(function() {
    //             if (!$('#news, #events').hasClass('active')) {
    //                 $('.subNavBarDummy').hide();
    //                 $('#subNavBar').show();
    //             }
    //         }).mouseout(function() {
    //             if (!$('#news, #events').hasClass('active')) {
    //                 $('#subNavBar').hide();
    //                 $('.subNavBarDummy').hide();
    //             }
    //         });
    //         $("#subNavBar").mouseover(function() {
    //             $('.subNavBarDummy').hide();
    //             $(this).show();
    //         });
    //     }
    // });

    //On Search click
    /*$('.searchClass').on('click', function () {
        $('#morphsearch').show();
        $('input.morphsearch-input').show();
        $('.morphsearch-input').focus();
    });*/

    //Safari Detection
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    if (isSafari) {
        $('.navClose').css('top', '-12px');
    }

    //Navbar button toggle click
    $('.navbar-toggle').on('click', function() {
        //Only change the icon for the main nav bar and not the sub nav bar
        if (!$(this).hasClass('categoriesBtn')) {
            $('.sr-only, .icon-bar, .navClose').toggle();
            $('.navbar-fixed-top').removeClass('navBarfixedTopOnShrink');
            $(this).blur();

            //Fade out sub nav bar when main nav bar is open
            //First close if subnavbr is open
            if ($('.categoriesBtn span').hasClass('chevronActive')) {
                $('.categoriesBtn').click();
                //Then fade out
                setTimeout(function() {
                    $('.categoriesBtn').fadeOut();
                }, 100);
            }

            //Always fade out sub nav bar when main nav bar is clicked
            $('.categoriesBtn').fadeOut();

            //Fade in sub nav bar in closed state when main nav bar is closed
            if ($('.categoriesBtn').css('display') == 'none') {
                //console.log('@', $('.categoriesBtn, .categoriesMain'))
                $('.categoriesBtn, .categoriesMain').fadeIn();
                if ($('.categoriesBtn span').hasClass('chevronActive')) {
                    $('.categoriesBtn').click();
                }
            }

            //Push main content down when nav bar is open
            setTimeout(function() {
                $('.sampleContent').toggleClass('mainContent');
            }, 100);
        }
    });

    //On Categories Chevron Toggle
    $('.categoriesBtn').on('click', function() {
        if ($('.categoriesBtn span').hasClass('chevronActive')) {
            $('.categoriesBtn span').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down').removeClass('chevronActive');
        } else {
            $('.categoriesBtn span').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up').addClass('chevronActive');
        }
    });

    //On Categories Close Button Click
    $('.categoriesClose').on('click', function() {
        $('.categoriesBtn').click();
    });

    //Notification check
    /*var displayOfNotification = $('.notification').css('display');
    if (displayOfNotification == 'block') {
        $('.desktopMain').css('top', '14px');
        $('.container-tablet').parent().css('height', '105px');
        $('.navbar-fixed-top').css('top', '30px');
    } else {
        $('.container-tablet').parent().css('height', '75px');
        $('.navbar-fixed-top').css('top', '0px');
        $('.desktopMain').css('top', '14px');
        //Push all desktop stuffs bit up on notification close
        $('.desktopSub, .main-logo, #subNavBar').css('top', '-22px');
        //Only desktop version for main content push down
        if ($(window).width() > 992) {
            $('.sampleContent').css('top', '-22px');
        } else {
            $('.sampleContent').css('top', '50px');
        }
        $(window).resize(function () {
            if ($(window).width() > 992) {
                $('.sampleContent').css('top', '-22px');
            } else {
                $('.sampleContent').css('top', '50px');
            }
        });
    }*/

    //Notification Close Click
    /*  $('.closeNotification').on('click', function () {
          $('.notification').fadeOut(function () {
              $('.navbar-fixed-top').css('top', '0px');
              $('.container-tablet').parent().css('height', '75px');

              //Push all desktop stuffs bit up on notification close
              $('.desktopSub, .main-logo, #subNavBar').css('top', '-22px');

              //Only desktop version for main content push down
              if ($(window).width() > 992) {
                  $('.sampleContent').css('top', '-22px');
              }
          });
      });*/

    //On Scroll
    //Shrink effect only for mobile
    $(window).scroll(function() {
        if ($(window).width() <= 414 && $(document).scrollTop() > 30) {
            $('.tabletLogo').hide();
            $('.mobileLogo').show();
            $('.mobileLogo').addClass('mobileLogoOnShrink');
            $('.navbar-toggle').addClass('navBarToggleShrink');
            $('.navbar-header').addClass('navBarHeaderShrink');
        } else {
            $('.mobileLogo').hide();
            $('.tabletLogo').show();
            $('.navbar-toggle').removeClass('navBarToggleShrink');
            $('.navbar-header').removeClass('navBarHeaderShrink');
        }
    });

}); //end document.ready