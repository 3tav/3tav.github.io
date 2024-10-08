"use strict";

var thsn_one_page = function() {
    if (jQuery('body').hasClass('thsn-one-page-site')) {

       // Applying active class to home link
        var x = 1;
        nav = jQuery('.mega-menu-wrap, #site-navigation > div');
        nav.find('a[href="#page"]').parent().addClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
        nav.find('a').each(function(){
            if( x != 1 ){
                jQuery(this).parent().removeClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
            }
            x = 0;
        });
        
        var sections = jQuery('.elementor-top-section, .thsn-slider-area'),
        nav          = jQuery('.mega-menu-wrap, #site-navigation > div'),
        nav_height   = jQuery('.thsn-sticky-header').height();
        
        // Run the one scroll function
        thsn_one_page_on_scroll();
    
        nav.find('a').on('click', function () {
            
            var $el = jQuery(this), 
            id = $el.attr('href');
            var arr = id.split('#')[1];
            if ( jQuery("#" + arr).length != 0) {
                window.history.pushState('page2', 'Title', id );
                jQuery(".thsn-navbar > div, body, .mega-menu-wrap").toggleClass("active");
                jQuery('html, body').animate({
                    scrollTop: jQuery('#'+ arr).offset().top - nav_height
                }, 500);  
                return false;
            }

        });

    }
}


var thsn_one_page_on_scroll = function() {

    var sections = jQuery('.elementor-top-section, .thsn-slider-area'),
    nav          = jQuery('.mega-menu-wrap, #site-navigation > div'),
    nav_height   = jQuery('.thsn-sticky-header').height();

    // active first menu
    if( jQuery('body').scrollTop() < 5 ){
        if( jQuery('body').hasClass('home') ){
            nav.find('a').parent().removeClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
            nav.find('a[href="#page"]').parent().addClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
        }
    }

    var cur_pos = jQuery(window).scrollTop(); 
    sections.each(function() {
        
        var top = jQuery(this).offset().top - (nav_height+2),
        bottom = top + jQuery(this).outerHeight(); 

        if (cur_pos >= top && cur_pos <= bottom) {

            if( typeof jQuery(this) != 'undefined' && typeof jQuery(this).attr('id')!='undefined' && jQuery(this).attr('id')!='' ){
                
                var mainThis = jQuery(this);
                nav.find('a').removeClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
                jQuery(this).addClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
                var arr = mainThis.attr('id');
                
                // Applying active class
                nav.find('a').parent().removeClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
                nav.find('a').each(function(){
                    var menuAttr = jQuery(this).attr('href').split('#')[1];						
                    if( menuAttr == arr ){
                        jQuery(this).parent().addClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
                    }
                })
            
            }
        }
    });
}


/*----  Functions  ----*/

jQuery.fn.thsn_is_bound = function(type) {
    if (this.data('events') !== undefined) {
        if (this.data('events')[type] === undefined || this.data('events')[type].length === 0) {
            return false;
        }
        return (-1 !== $.inArray(fn, this.data('events')[type]));
    } else {
        return false;
    }
};

var thsn_sticky_header = function() {
    if (jQuery('.thsn-header-sticky-yes').length > 0) {
        var header_html = jQuery('#masthead .thsn-main-header-area').html();
        jQuery('.thsn-sticky-header').append(header_html);

        jQuery('.thsn-sticky-header .main-navigation ul, .thsn-sticky-header .main-navigation ul li, .thsn-sticky-header .main-navigation ul li a').removeAttr('id');

        jQuery('.thsn-sticky-header h1').each(function() {
            var thisele = jQuery(this);
            var thisele_class = jQuery(this).attr('class');
            thisele.replaceWith('<span class="' + thisele_class + '">' + jQuery(thisele).html() + '</span>');
        });

        // For infostak header
        if (jQuery('.thsn-main-header-area').hasClass('thsn-infostack-header')) { // check if infostack header
            // for header style 3
            jQuery(".thsn-sticky-header .thsn-header-menu-area").insertAfter(".thsn-sticky-header .site-branding");
            jQuery('.thsn-sticky-header .thsn-header-info, .thsn-sticky-header .thsn-mobile-search, .thsn-sticky-header .nav-menu-toggle').remove();

            // for header style 4
            jQuery(".thsn-sticky-header .thsn-header-left, .thsn-sticky-header .thsn-header-right").remove();
        }

    }
}

var thsn_sticky_header_class = function() {
    // Add sticky class
    if (jQuery('#wpadminbar').length > 0) {
        jQuery('#masthead').addClass('thsn-adminbar-exists');
    }

    var offset_px = 300;
    if (jQuery('.thsn-main-header-area').length > 0) {
        offset_px = jQuery('.thsn-main-header-area').height() + offset_px;
    }

    // apply on document ready
    if (jQuery(window).scrollTop() > offset_px) {
        jQuery('#masthead').addClass('thsn-fixed-header');
        jQuery('.thsn-sticky-header .mega-menu.max-mega-menu.mega-menu-horizontal').attr("id", "mega-menu-themesion-top");
    } else {
        jQuery('#masthead').removeClass('thsn-fixed-header');
    }

    jQuery(window).scroll(function() {
        if (jQuery(window).scrollTop() > offset_px) {
            jQuery('#masthead').addClass('thsn-fixed-header');
            jQuery('.thsn-sticky-header .mega-menu.max-mega-menu.mega-menu-horizontal').attr("id", "mega-menu-themesion-top");
        } else {
            jQuery('#masthead').removeClass('thsn-fixed-header');
        }
    });

}

var thsn_toggleSidebar = function() {
    jQuery('#menu-toggle').on('click', function() {
        jQuery("body:not(.mega-menu-themesion-top) .thsn-navbar > div, body:not(.mega-menu-themesion-top)").toggleClass("active");
    })
    if (jQuery('.thsn-navbar > div > .closepanel').length == 0) {
        jQuery('.thsn-navbar > div').append('<span class="closepanel"><i class="thsn-base-icon-cancel-1"></i></span>');
        jQuery('.thsn-navbar > div > .closepanel, .mega-menu-themesion-top .nav-menu-toggle').on('click', function() {
            jQuery(".thsn-navbar > div, body, .mega-menu-wrap").toggleClass("active");
        });
        // Cart icon
        if (jQuery('.thsn-main-header-area .thsn-right-box > .thsn-cart-wrapper, .thsn-main-header-area .thsn-right-box .thsn-search-cart-box > .thsn-cart-wrapper').length > 0) {
            if (jQuery('.thsn-navbar > div > .thsn-responsive-icons').length == 0) {
                jQuery('.thsn-navbar > div').append("<div class='thsn-responsive-icons'></div>");
            }
            jQuery('.thsn-navbar > div > .thsn-responsive-icons').append('<div class="thsn-cart-wrapper"></div>');
            jQuery('.thsn-navbar > div > .thsn-responsive-icons .thsn-cart-wrapper').append(jQuery('.thsn-main-header-area .thsn-right-box > .thsn-cart-wrapper, .thsn-main-header-area .thsn-right-box .thsn-search-cart-box > .thsn-cart-wrapper').html());
        }
        // Search icon
        if (jQuery('.thsn-main-header-area .thsn-right-box > .thsn-header-search-btn, .thsn-main-header-area .thsn-right-box .thsn-search-cart-box > .thsn-header-search-btn').length > 0) {
            if (jQuery('.thsn-navbar > div > .thsn-responsive-icons').length == 0) {
                jQuery('.thsn-navbar > div').append("<div class='thsn-responsive-icons'></div>");
            }
            jQuery('.thsn-navbar > div > .thsn-responsive-icons').append('<div class="thsn-header-search-btn"></div>');
            jQuery('.thsn-navbar > div > .thsn-responsive-icons .thsn-header-search-btn').append(jQuery('.thsn-main-header-area .thsn-right-box > .thsn-header-search-btn, .thsn-main-header-area .thsn-right-box .thsn-search-cart-box > .thsn-header-search-btn').html());
        }

        return false;
    }
}

var thsn_preloader = function() {
    jQuery(".thsn-preloader").fadeOut('600');
}

var thsn_sorting = function() {
    jQuery('.thsn-sortable-yes').each(function() {
        var boxes = jQuery('.thsn-element-posts-wrapper', this);
        var links = jQuery('.thsn-sortable-list a', this);
        boxes.isotope({
            animationEngine: 'best-available'
        });
        links.on('click', function(e) {
            var selector = jQuery(this).data('sortby');
            if (selector != '*') {
                var selector = '.' + selector;
            }
            boxes.isotope({
                filter: selector,
                itemSelector: '.thsn-ele',
                layoutMode: 'fitRows'
            });
            links.removeClass('thsn-selected');
            jQuery(this).addClass('thsn-selected');
            e.preventDefault();
        });
    });
}

var thsn_back_to_top = function() {
    // scroll-to-top
    var btn = jQuery('.scroll-to-top');
    jQuery(window).scroll(function() {
        if (jQuery(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });
    btn.on('click', function(e) {
        e.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, '300');
    });
}

var thsn_navbar = function() {
    if (!jQuery('ul#thsn-top-menu > li > a[href="#"]').thsn_is_bound('click')) {
        jQuery('ul#thsn-top-menu > li > a[href="#"]').click(function() { return false; });
    }
    jQuery('.thsn-navbar > div > ul li:has(ul)').append("<span class='sub-menu-toggle'><i class='thsn-base-icon-down-open-big'></i></span>");
    jQuery('.thsn-navbar li').hover(function() {
        if (jQuery(this).children("ul").length == 1) {
            var parent = jQuery(this);
            var child_menu = jQuery(this).children("ul");
            if (jQuery(parent).offset().left + jQuery(parent).width() + jQuery(child_menu).width() > jQuery(window).width()) {
                jQuery(child_menu).addClass('thsn-nav-left');
            } else {
                jQuery(child_menu).removeClass('thsn-nav-left');
            }
        }
    });
    jQuery(".nav-menu-toggle").on("click tap", function() {
        thsn_toggleSidebar();
    });
    jQuery('.sub-menu-toggle').on('click', function() {
        if (jQuery(this).siblings('.sub-menu, .children').hasClass('show')) {
            jQuery(this).siblings('.sub-menu, .children').removeClass('show');
            jQuery('i', jQuery(this)).removeClass('thsn-base-icon-up-open-big').addClass('thsn-base-icon-down-open-big');
        } else {
            jQuery(this).siblings('.sub-menu, .children').addClass('show');
            jQuery('i', jQuery(this)).removeClass('thsn-base-icon-down-open-big').addClass('thsn-base-icon-up-open-big');
        }
        return false;
    });
    jQuery('.thsn-navbar ul.menu > li > a').on('click', function() {
        if (jQuery(this).attr('href') == '#' && jQuery(this).siblings('ul.sub-menu, ul.children').length > 0) {
            jQuery(this).siblings('.sub-menu-toggle').trigger('click');
            return false;
        }
    });
}

var thsn_lightbox = function() {
    var i_type = 'image';
    jQuery('a.thsn-lightbox, a.thsn-lightbox-video, .thsn-lightbox-video a, .thsn-lightbox a').each(function() {
        if (jQuery(this).hasClass('thsn-lightbox-video') || jQuery(this).closest('.elementor-element').hasClass('thsn-lightbox-video')) {
            i_type = 'iframe';
        } else {
            i_type = 'image';
        }
        if (jQuery(this).closest('.thsn-ele-portfolio').length == 0) {
            jQuery(this).magnificPopup({ type: i_type });
        }
    });
}

var thsn_video_popup = function() {
    jQuery('.thsn-popup').on('click', function(event) {
        event.preventDefault();
        var href = jQuery(this).attr('href');
        var title = jQuery(this).attr('title');
        window.open(href, title, "width=600,height=500");
    });
}

var thsn_testimonial = function() {
    jQuery('.thsn-testimonial-active').each(function() {
        var ele_parent = jQuery(this).closest('.thsn-element-posts-wrapper');
        jQuery('.themesion-ele.themesion-ele-testimonial', ele_parent).on('mouseover', function() {
            jQuery('.themesion-ele.themesion-ele-testimonial', ele_parent).removeClass('thsn-testimonial-active');
            jQuery(this).addClass('thsn-testimonial-active');
        });
    });
}

var thsn_search_btn = function() {
    jQuery(function() {
        jQuery('.thsn-header-search-btn').on("click", function(event) {
            event.preventDefault();
            jQuery(".thsn-header-search-form-wrapper").addClass("open");
            jQuery('.thsn-header-search-form-wrapper input[type="search"]').focus();
        });
        jQuery(".thsn-search-close").on("click keyup", function(event) {
            jQuery(".thsn-header-search-form-wrapper").removeClass("open");
        });
    });
}

var thsn_gallery = function() {
    jQuery("div.thsn-gallery").each(function() {
        jQuery(this).lightSlider({ item: 1, auto: true, loop: true, controls: false, speed: 1500, pause: 5500 });
    });
}

var thsn_center_logo_header_class = function() {
    if (jQuery('#masthead.thsn-header-style-5 ul#thsn-top-menu').length > 0) {
        var has_class = jQuery('#masthead.thsn-header-style-5 ul#thsn-top-menu > li').hasClass('thsn-logo-append');
        if (has_class == false) {
            var total_li = jQuery('#masthead.thsn-header-style-5 ul#thsn-top-menu > li').length;
            var li = Math.floor(total_li / 2);
            jQuery('#masthead.thsn-header-style-5 ul#thsn-top-menu > li:nth-child(' + li + ')').addClass('thsn-logo-append');
        }
    }
}

var thsn_selectwrap = function() {
    jQuery("select:not(#rating)").each(function() {
        jQuery(this).wrap("<div class='thsn-select'></div>");
    });
}

var thsn_selectwrap = function() {
    jQuery('select').select2({
        dropdownParent: jQuery('#page')
    });
}

/* ====================================== */
/* Circle Progress bar
/* ====================================== */
var thsn_circle_progressbar = function() {

    jQuery('.thsn-circle-outer').each(function() {

        var this_circle = jQuery(this);

        // Circle settings
        var emptyFill_val = "rgba(0, 0, 0, 0)";
        var thickness_val = 10;
        var fill_val = this_circle.data('fill');
        var size_val = 110;

        if (typeof this_circle.data('emptyfill') !== 'undefined' && this_circle.data('emptyfill') != '') {
            emptyFill_val = this_circle.data('emptyfill');
        }
        if (typeof this_circle.data('thickness') !== 'undefined' && this_circle.data('thickness') != '') {
            thickness_val = this_circle.data('thickness');
        }
        if (typeof this_circle.data('size') !== 'undefined' && this_circle.data('size') != '') {
            size_val = this_circle.data('size');
        }
        if (typeof this_circle.data('filltype') !== 'undefined' && this_circle.data('filltype') == 'gradient') {
            fill_val = { gradient: [this_circle.data('gradient1'), this_circle.data('gradient2')], gradientAngle: Math.PI / 4 };
        }

        if (typeof jQuery.fn.circleProgress == "function") {
            var digit = this_circle.data('digit');
            var before = this_circle.data('before');
            var after = this_circle.data('after');
            var digit = Number(digit);
            var short_digit = (digit / 100);

            jQuery('.thsn-circle', this_circle).circleProgress({
                value: 0,
                size: size_val,
                startAngle: -Math.PI / 4 * 2,
                thickness: thickness_val,
                emptyFill: emptyFill_val,
                fill: fill_val
            }).on('circle-animation-progress', function(event, progress, stepValue) { // Rotate number when animating
                this_circle.find('.thsn-circle-number').html(before + Math.round(stepValue * 100) + after);
            });
        }

        this_circle.waypoint(function(direction) {
            if (!this_circle.hasClass('completed')) {
                // Re draw when view
                if (typeof jQuery.fn.circleProgress == "function") {
                    jQuery('.thsn-circle', this_circle).circleProgress({ value: short_digit });
                };
                this_circle.addClass('completed');
            }
        }, { offset: '85%' });

    });
}

/* ====================================== */
/* Carousel
/* ====================================== */
var thsn_carousel = function() {

    jQuery(".themesion-element-viewtype-carousel").each(function() {

        var carouselElement = jQuery(this);

        jQuery('.thsn-ele', carouselElement).removeClass(function(index, className) {
            return (className.match(/(^|\s)col-md-\S+/g) || []).join(' ');
        }).removeClass(function(index, className) {
            return (className.match(/(^|\s)col-lg-\S+/g) || []).join(' ');
        }).removeClass(function(index, className) {
            return (className.match(/(^|\s)wpem-col\S+/g) || []).join(' ');
        }).removeClass(function(index, className) {
            return (className.match(/(^|\s)wpem-event-box-col\S+/g) || []).join(' ');
        }).removeClass('wpem-col');

        var columns = jQuery(this).data('columns');
        var loop = jQuery(this).data('loop');

        if (columns == '1') {
            var responsive_items = [ /* 1199 : */ '1', /* 991 : */ '1', /* 767 : */ '1', /* 575 : */ '1', /* 0 : */ '1'];
        } else if (columns == '2') {
            var responsive_items = [ /* 1199 : */ '2', /* 991 : */ '2', /* 767 : */ '2', /* 575 : */ '2', /* 0 : */ '1'];
        } else if (columns == '3') {
            var responsive_items = [ /* 1199 : */ '3', /* 991 : */ '2', /* 767 : */ '2', /* 575 : */ '2', /* 0 : */ '1'];
        } else if (columns == '4') {
            var responsive_items = [ /* 1199 : */ '4', /* 991 : */ '4', /* 767 : */ '3', /* 575 : */ '2', /* 0 : */ '1'];
        } else if (columns == '5') {
            var responsive_items = [ /* 1199 : */ '5', /* 991 : */ '4', /* 767 : */ '3', /* 575 : */ '2', /* 0 : */ '1'];
        } else if (columns == '6') {
            var responsive_items = [ /* 1199 : */ '6', /* 991 : */ '4', /* 767 : */ '3', /* 575 : */ '2', /* 0 : */ '1'];
        } else {
            var responsive_items = [ /* 1199 : */ '3', /* 991 : */ '3', /* 767 : */ '3', /* 575 : */ '2', /* 0 : */ '1'];
        }

        var margin_val = 30;
        if (jQuery(carouselElement).data('margin') != '') {
            margin_val = jQuery(carouselElement).data('margin');
        }

        var posts_wrapper_class = '.thsn-element-posts-wrapper';

        var val_nav = jQuery(carouselElement).data('nav');
        if (val_nav == 'above') {
            val_nav = false;
        }

        var car_options = {
            loop: jQuery(carouselElement).data('loop'),
            autoplay: jQuery(carouselElement).data('autoplay'),
            center: jQuery(carouselElement).data('center'),
            nav: val_nav,
            dots: jQuery(carouselElement).data('dots'),
            autoplaySpeed: jQuery(carouselElement).data('autoplayspeed'),
            autoplayTimeout: jQuery(carouselElement).data('autoplayspeed') + 5000,
            navSpeed: jQuery(carouselElement).data('autoplayspeed'),
            dotsSpeed: jQuery(carouselElement).data('autoplayspeed'),
            dragEndSpeed: jQuery(carouselElement).data('autoplayspeed'),
            margin: 30,
            items: columns,
            responsiveClass: true,
            responsive: {
                1199: {
                    items: responsive_items[0],
                },
                991: {
                    items: responsive_items[1],
                },
                767: {
                    items: responsive_items[2],
                },
                575: {
                    items: responsive_items[3],
                },
                0: {
                    items: responsive_items[4],
                }
            }
        };

        // gap - margin
        if (typeof margin_val == "string" && margin_val != '') {
            margin_val = margin_val.replace('px', '');
            margin_val = parseInt(margin_val);
            car_options['margin'] = margin_val;
        }

        // apply carousel effect with options
        var thsn_owl = jQuery(posts_wrapper_class, carouselElement).removeClass('row multi-columns-row').addClass('owl-carousel').owlCarousel(car_options).removeClass('wpem-row');

        jQuery('.thsn-carousel-prev', carouselElement).click(function(event) {
            event.preventDefault();
            thsn_owl.trigger('prev.owl.carousel', [jQuery(carouselElement).data('autoplayspeed')]);

        });
        jQuery('.thsn-carousel-next', carouselElement).click(function(event) {
            event.preventDefault();
            thsn_owl.trigger('next.owl.carousel', [jQuery(carouselElement).data('autoplayspeed')]);
        });

    });
};

/* ====================================== */
/* Menu item count
/* ====================================== */
var thsn_menu_count = function() {
    if (jQuery('ul#thsn-top-menu > li').length > 0 || jQuery('div#thsn-top-menu > ul > li').length > 0) {
        if (jQuery('ul#thsn-top-menu > li').length > 0) {
            var total_li = jQuery('ul#thsn-top-menu > li').length;
        }
        if (jQuery('div#thsn-top-menu > ul > li').length > 0) {
            var total_li = jQuery('div#thsn-top-menu > ul > li').length;
        }
        if (total_li > 6) {
            jQuery('#site-navigation').addClass('thsn-bigger-menu');
        }
    }
}

/* ====================================== */
/* Animate on scroll : Number rotator
/* ====================================== */
var thsn_number_rotate = function() {
    jQuery(".thsn-number-rotate").each(function() {
        var self = jQuery(this);
        var delay = (self.data("appear-animation-delay") ? self.data("appear-animation-delay") : 0);
        var animation = self.data("appear-animation");

        if (jQuery(window).width() > 959) {
            self.html('0');
            self.waypoint(function(direction) {
                if (!self.hasClass('completed')) {
                    var from = self.data('from');
                    var to = self.data('to');
                    var interval = self.data('interval');
                    self.numinate({
                        format: '%counter%',
                        from: from,
                        to: to,
                        runningInterval: 2000,
                        stepUnit: interval,
                        onComplete: function(elem) {
                            self.addClass('completed');
                        }
                    });
                }
            }, { offset: '85%' });
        } else {
            if (animation == 'animateWidth') {
                self.css('width', self.data("width"));
            }
        }
    });
};

/* ====================================== */
/* Image size correction
/* ====================================== */
var thsn_img_size_correction = function() {
    setTimeout(function() {
        jQuery("img").each(function() {
            var thisimg = jQuery(this);
            var p_width = jQuery(this).parent().width();
            var width = jQuery(this).attr('width');
            var height = jQuery(this).attr('height');
            if ((typeof width !== typeof undefined && width !== false) && (typeof height !== typeof undefined && height !== false)) {
                var ratio = height / width;
                jQuery(this).data('thsn-ratio', ratio);
                var real_width = jQuery(this).width();
                var new_height = Math.round(real_width * ratio);
            }
        });
    }, 100);
};

/* ====================================== */
/* Tabs
/* ====================================== */
var thsn_tabs_element = function() {
    var tabs = '';
    var tab_number = '';
    jQuery('.thsn-tabs').each(function() {
        tabs = jQuery(this);
        jQuery('.thsn-tab-link', tabs).on('click', function() {
            if (!jQuery(this).hasClass('thsn-tab-li-active')) {
                jQuery('.thsn-tab-link', tabs).removeClass('thsn-tab-li-active');
                jQuery(this).addClass('thsn-tab-li-active');

                tab_number = jQuery(this).data('thsn-tab');
                jQuery('.thsn-tab-content', tabs).removeClass('thsn-tab-active');
                jQuery('.thsn-tab-content-' + tab_number, tabs).addClass('thsn-tab-active');

            }
        });

        jQuery('.thsn-tab-content-title', tabs).on('click', function() {
            tab_number = jQuery(this).data('thsn-tab');
            jQuery('li.thsn-tab-link[data-thsn-tab="' + tab_number + '"]').trigger('click');
        });

    });

};

var thsn_infinite_scroll = function() {
    if (jQuery('.thsn-infinite-scroll-yes').length > 0) {
        jQuery('.thsn-infinite-scroll-yes').each(function() {

            var main_ele = jQuery(this);
            var style = jQuery(this).data('style');
            var cpt = jQuery(this).data('cpt');
            var columns = jQuery(this).data('columns');
            var show = jQuery(this).data('show');
            var totalpagination = jQuery(this).data('totalpagination');

            var infinitre_scroll_data = jQuery('.thsn-infinite-scroll-data', main_ele).html();
            if (infinitre_scroll_data != '') {
                var url_attributes = '';
                jQuery.each(jQuery.parseJSON(infinitre_scroll_data), function(key, value) {
                    url_attributes = url_attributes + '&' + key + '=' + value;
                });
            }

            if (jQuery(this).hasClass('thsn-infinite-scroll-button-yes')) {
                var x = 2;

                // init Masonry
                let $grid = jQuery('.thsn-element-posts-wrapper', main_ele).masonry({
                    itemSelector: 'none', // select none at first
                    columnWidth: '.thsn-ele',
                    gutter: 0,
                    percentPosition: true,
                    stagger: 30,
                    // nicer reveal transition
                    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
                    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
                });

                // get Masonry instance
                let msnry = $grid.data('masonry');

                // initial items reveal
                $grid.imagesLoaded(function() {
                    $grid.removeClass('are-images-unloaded');
                    $grid.masonry('option', { itemSelector: '.thsn-ele' });
                    let $items = $grid.find('.thsn-ele');
                    $grid.masonry('appended', $items);
                });

                // init Infinte Scroll
                $grid.infiniteScroll({
                    // options
                    path: thsn_js_variables.ajaxurl + '?action=thsn_infinite_scroll&page_no={{#}}&nonce=' + thsn_infinite_scroll_vars.ajaxnonce + url_attributes,
                    checkLastPage: false,
                    button: '.thsn-ajax-load-more-btn > a',
                    scrollThreshold: false,
                    status: '.thsn-infinite-loader', // disable loading on scroll
                    append: '.thsn-ele',
                    history: false,
                    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
                    outlayer: msnry,
                });
                $grid.on('append.infiniteScroll', function(event, body, path, items, response) {
                    jQuery(items).each(function() {
                        jQuery(this).addClass('thsn-infinite-scroll-animation');
                    });

                    if (x >= totalpagination) {
                        jQuery('.thsn-ajax-load-more-btn > a', main_ele).hide();
                        jQuery('.thsn-infinite-loader', main_ele).addClass('thsn-infinite-loader-hide');
                        jQuery('.thsn-infinite-scroll-last', main_ele).show();
                    }
                    x++;
                });

            } else {

                // infinite scroll without button

                // hide load more button
                var x = 2;
                if (x >= totalpagination) { jQuery('.thsn-ajax-load-more-btn > a', main_ele).hide(); } // hide button on page load if lower post found

                //-------------------------------------//
                // init Masonry

                let $grid = jQuery('.thsn-element-posts-wrapper', main_ele).masonry({
                    itemSelector: 'none', // select none at first
                    columnWidth: '.thsn-ele',
                    gutter: 0,
                    percentPosition: true,
                    stagger: 30,
                    // nicer reveal transition
                    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
                    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
                });

                // get Masonry instance
                let msnry = $grid.data('masonry');

                // initial items reveal
                $grid.imagesLoaded(function() {
                    $grid.removeClass('are-images-unloaded');
                    $grid.masonry('option', { itemSelector: '.thsn-ele' });
                    let $items = $grid.find('.thsn-ele');
                    $grid.masonry('appended', $items);
                });

                //-------------------------------------//
                // init Infinte Scroll

                $grid.infiniteScroll({
                    path: thsn_js_variables.ajaxurl + '?action=thsn_infinite_scroll&page_no={{#}}&nonce=' + thsn_infinite_scroll_vars.ajaxnonce + url_attributes,
                    append: '.thsn-ele',
                    outlayer: msnry,
                    status: '.thsn-infinite-loader',
                    history: false,
                    scrollThreshold: -200,
                });

                $grid.on('append.infiniteScroll', function(event, body, path, items, response) {
                    if (x >= totalpagination) {
                        jQuery('.thsn-infinite-loader', main_ele).addClass('thsn-infinite-loader-hide');
                        jQuery('.thsn-infinite-scroll-last', main_ele).show();
                    }
                    x++;
                });

            }

        });

    }
}

var thsn_search_results = function() {
    if (jQuery('.thsn-search-results-main-wrapper').length > 0 && jQuery('.thsn-search-result-tab-links').length > 0) {
        jQuery('.thsn-search-results-main-wrapper').skeletabs();
    }
    if (jQuery('.thsn-search-results-main-wrapper').length > 0) {
        jQuery('body').addClass('thsn-search-results-loaded');
    }
}
/* ====================================== */
/* Comment form validator
/* ====================================== */
var thsn_validate = function() {
	jQuery("#commentform").submit( function( event ){
		var error = false;
		jQuery('.thsn-form-error').hide();
		if( jQuery("#author").length > 0 && ! jQuery("#author").val() ){  // empty author
			jQuery('.comment-form-author .thsn-form-error').show();
			error = true;
		}
		if( jQuery("#comment").length > 0 && ! jQuery("#comment").val() ){  // empty comment
			jQuery('.comment-form-comment .thsn-form-error').show();
			error = true;
		}
		if( jQuery("#email").length > 0 ) {
			if( ! jQuery("#email").val() ){ // empty email
				jQuery('.comment-form-email .thsn-form-error.thsn-empty-email').show();
				error = true;
			} else {
				var valid_email = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( jQuery("#email").val() ));
				if( valid_email != true ){
					jQuery('.comment-form-email .thsn-form-error.thsn-invalid-email').show();
					error = true;
				}
			}
		}
		if( error == true ){
			event.preventDefault();
			return false;
		} else {
			return true;
		}
	});
}

/*----  Events  ----*/

// On resize
jQuery(window).resize(function() {
    /* Image size correction */
    thsn_img_size_correction();

});

// on ready
jQuery(document).ready(function() {
    thsn_validate();
    thsn_search_results();
    thsn_tabs_element();
    thsn_toggleSidebar();
    thsn_sorting();
    thsn_back_to_top();
    thsn_sticky_header();
    thsn_navbar();
    thsn_lightbox();
    thsn_video_popup();
    thsn_testimonial();
    thsn_search_btn();
    thsn_center_logo_header_class();
    thsn_selectwrap();
    thsn_menu_count();
    setTimeout(function() { thsn_carousel(); }, 100);
    thsn_img_size_correction();
    thsn_number_rotate();
    thsn_sticky_header_class();
    
});

// on load
jQuery(window).load(function() {
    thsn_one_page();
    thsn_one_page_on_scroll();
    thsn_preloader();
    thsn_sorting();
    thsn_gallery();
    thsn_circle_progressbar();
    thsn_infinite_scroll();
});

jQuery(window).on('scroll', function () {
    thsn_one_page_on_scroll();
});