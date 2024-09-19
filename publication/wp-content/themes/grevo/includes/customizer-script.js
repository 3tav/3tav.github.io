"use strict";
jQuery(window).load(function($) {
    wp.customize(
        'header-style',
        function(header_style) {
            var header_height = '115';
            var header_bgcolor = 'white';
            var global_color = '#8cc63f';
            var light_bg_color = '#eff3f5';
            var blackish_bg_color = '#101010';
            var secondary_color = '#131419';
            var menu_bgcolor = 'white';
            var main_menu_typography = {
                'font-family': 'Quicksand',
                'variant': '700',
                'font-size': '13px',
                'line-height': '20px',
                'letter-spacing': '0px',
                'color': '#101010',
                'text-transform': 'uppercase',
                'font-backup': ''
            };
            var header_box_title_typography = {
                'font-family': 'Barlow',
                'variant': '800',
                'font-size': '17px',
                'line-height': '27px',
                'letter-spacing': '0px',
                'color': '#0c121d',
                'text-transform': 'none',
                'font-backup': ''
            };
            var header_box_content_typography = {
                'font-family': 'Barlow',
                'variant': '700',
                'font-size': '15px',
                'line-height': '25px',
                'letter-spacing': '1px',
                'color': '#b0b6bf',
                'text-transform': 'none',
                'font-backup': ''
            };
            var sticky_header_bgcolor = 'white';
            var main_menu_active_color = 'globalcolor';
            var main_menu_sticky_color = '#101010';
            var preheader_enable = false;
            var logo_height = '45';
            var preheader_bgcolor = 'blackish ';
            var preheader_text_color = 'white';
            var titlebar_height = '200';
            var titlebar_bgcolor = 'secondarycolor';
            var titlebar_background = {
                'background-color': '#727272',
                'background-repeat': 'no-repeat',
                'background-position': 'center center',
                'background-size': 'cover',
                'background-attachment': 'scroll',
                'background-image': thsn_admin_js_variables.theme_path + '/images/titlebar-img.jpg',
            };
            var titlebar_heading_typography = {
                'font-family': 'Quicksand',
                'variant': '700',
                'font-size': '50px',
                'line-height': '60px',
                'letter-spacing': '0px',
                'color': '#fff',
                'text-transform': 'None',
                'font-backup': ''
            };
            var titlebar_subheading_typography = {
                'font-family': 'Nunito Sans',
                'variant': 'regular',
                'font-size': '16px',
                'line-height': '1.5',
                'letter-spacing': '0px',
                'color': '#fff',
                'text-transform': 'none',
                'font-backup': ''
            };
            var titlebar_breadcrumb_typography = {
                'font-family': 'Nunito Sans',
                'variant': '400',
                'font-size': '15px',
                'line-height': '1.5',
                'letter-spacing': '0px',
                'color': '#101010',
                'text-transform': 'uppercase',
                'font-backup': ''
            };
            var logo = thsn_admin_js_variables.theme_path + '/images/logo.png';
            var sticky_logo = '';
            header_style.bind(function(value) {
                if (value == '1') { // Default header style 
                   wp.customize('global-color').set(global_color);
                   wp.customize('light-bg-color').set(light_bg_color);
                   wp.customize('blackish-bg-color').set(blackish_bg_color);
                   wp.customize('secondary-color').set(secondary_color);
                   wp.customize('header-height').set(header_height);
                   wp.customize('header-bgcolor').set(header_bgcolor);
                   wp.customize('menu-bgcolor').set(menu_bgcolor);
                   wp.customize('main-menu-typography').set(main_menu_typography);
                   wp.customize('header-box-title-typography').set(header_box_title_typography);
                   wp.customize('header-box-content-typography').set(header_box_content_typography);
                   wp.customize('header-search').set(false);
                   wp.customize('header-btn-text').set('');
                   wp.customize('header-btn-url').set('');
                   wp.customize('sticky-header-bgcolor').set(sticky_header_bgcolor);
                   wp.customize('main-menu-active-color').set('globalcolor');
                   wp.customize('main-menu-sticky-color').set(main_menu_sticky_color);
                   wp.customize('preheader-enable').set(preheader_enable);
                   wp.customize('logo-height').set(logo_height);
                   wp.customize('preheader-bgcolor').set(preheader_bgcolor);
                   wp.customize('preheader-text-color').set(preheader_text_color);
                   wp.customize('titlebar-height').set(titlebar_height);
                   wp.customize('titlebar-bgcolor').set('transparent');
                   wp.customize('titlebar-background').set(titlebar_background);
                   wp.customize('titlebar-heading-typography').set(titlebar_heading_typography);
                   wp.customize('titlebar-subheading-typography').set(titlebar_subheading_typography);
                   wp.customize('titlebar-breadcrumb-typography').set(titlebar_breadcrumb_typography);
                   wp.customize('logo').set(logo);
                   wp.customize('sticky-logo').set(sticky_logo);

                } else if (value == '2') { // Header style 2
                    wp.customize('global-color').set('#8cc63f');
                    wp.customize('light-bg-color').set('#eff3f5');
                    wp.customize('blackish-bg-color').set('#101010');
                    wp.customize('secondary-color').set(secondary_color);
                    wp.customize('header-height').set('115');
                    wp.customize('header-bgcolor').set('white');
                    wp.customize('menu-bgcolor').set('globalcolor');
                    wp.customize('main-menu-typography').set({
                        'font-family': 'Quicksand',
                        'variant': '700',
                        'font-size': '14px',
                        'line-height': '20px',
                        'letter-spacing': '0px',
                        'color': '#ffffff',
                        'text-transform': 'uppercase',
                        'font-backup': '',
                    });
                    wp.customize('header-box-title-typography').set({
                        'font-family': 'Nunito Sans',
                        'variant': '400',
                        'font-size': '16px',
                        'line-height': '24px',
                        'letter-spacing': '0px',
                        'color': '#60626d',
                        'text-transform': 'none',
                        'font-backup': '',
                    });
                    wp.customize('header-box-content-typography').set({
                        'font-family': 'Quicksand',
                        'variant': '700',
                        'font-size': '18px',
                        'line-height': '24px',
                        'letter-spacing': '0px',
                        'color': '#131419',
                        'text-transform': 'none',
                        'font-backup': '',
                    });
                    wp.customize('h1-typography').set({
                        'font-family': 'Quicksand',
                        'variant': '700',
                        'font-size': '40px',
                        'line-height': '44px',
                        'letter-spacing': '0px',
                        'color': '#101010',
                        'text-transform': '',
                        'font-backup': '',
                    });
                    wp.customize('header-search').set(true);
                    wp.customize('preheader-enable').set(preheader_enable);
                    wp.customize('preheader-bgcolor').set('blackish');
                    wp.customize('preheader-text-color').set('white');
                    wp.customize('sticky-header-bgcolor').set('white');
                    wp.customize('main-menu-active-color').set('blackish');
                    wp.customize('main-menu-sticky-color').set(main_menu_sticky_color);
                    wp.customize('logo-height').set('50');
                    wp.customize('main-menu-sticky-color').set('#101010');
                    wp.customize('header-box1-icon').set('thsn-grevo-icon thsn-grevo-icon-time-call');
                    wp.customize('header-box1-title').set('Please Make a call');
                    wp.customize('header-box1-content').set('(+00)888.666.88');
                    wp.customize('header-box1-link').set('tel:(+00)888.666.88');
                    wp.customize('header-box2-icon').set('thsn-grevo-icon thsn-grevo-icon-open');
                    wp.customize('header-box2-title').set('E-mail Address');
                    wp.customize('header-box2-content').set('grevoinfo@gmail.com');
                    wp.customize('header-box2-link').set('http://grevo-demo.themesion.com/demo1/contact-us/');
                    wp.customize('header-box3-icon').set('thsn-grevo-icon thsn-grevo-icon-location');
                    wp.customize('header-box3-title').set('Our Office Address');
                    wp.customize('header-box3-content').set('Los Angeles Gournadi');
                    wp.customize('header-box3-link').set('http://grevo-demo.themesion.com/demo1/contact-us/');
                    wp.customize('header-btn-text').set('Get a quote');
                    wp.customize('header-btn-url').set('http://grevo-demo.themesion.com/demo1/contact-us/');
                    wp.customize('titlebar-height').set('410');
                    wp.customize('titlebar-bgcolor').set('transparent');
                    wp.customize('titlebar-background').set({
                        'background-color': '#eeeeee',
                        'background-repeat': 'no-repeat',
                        'background-position': 'center center',
                        'background-size': 'cover',
                        'background-attachment': 'scroll',
                        'background-image': '',
                        'background-image': thsn_admin_js_variables.theme_path + '/images/titlebar-img.jpg',
                    });
                    wp.customize('titlebar-heading-typography').set({
                        'font-family': 'Quicksand',
                        'variant': '700',
                        'font-size': '50px',
                        'line-height': '70px',
                        'letter-spacing': '-0.4px',
                        'color': '#fff',
                        'text-transform': 'None',
                        'font-backup': ''
                    });
                    wp.customize('titlebar-subheading-typography').set({
                        'font-family': 'Nunito Sans',
                        'variant': '400',
                        'font-size': '16px',
                        'line-height': '1.5',
                        'letter-spacing': '0px',
                        'color': '#131419',
                        'text-transform': 'none',
                        'font-backup': '',
                    });
                    wp.customize('titlebar-breadcrumb-typography').set({
                        'font-family': 'Nunito Sans',
                        'variant': '400',
                        'font-size': '15px',
                        'line-height': '1.5',
                        'letter-spacing': '0px',
                        'color': '#131419',
                        'text-transform': 'uppercase',
                        'font-backup': '',
                    });
                    wp.customize('logo').set(thsn_admin_js_variables.theme_path + '/images/logo.png');
                    wp.customize('sticky-logo').set(thsn_admin_js_variables.theme_path + '/images/logo.png');
                } else if (value == '3') { // Header style 3
                    wp.customize('global-color').set('#8cc63f');
                    wp.customize('light-bg-color').set('#eff3f5');
                    wp.customize('blackish-bg-color').set('#101010');
                    wp.customize('secondary-color').set(secondary_color);
                    wp.customize('header-height').set('110');
                    wp.customize('header-bgcolor').set('globalcolor');
                    wp.customize('menu-bgcolor').set('white');
                    wp.customize('main-menu-typography').set({
                        'font-family': 'Quicksand',
                        'variant': '700',
                        'font-size': '14px',
                        'line-height': '20px',
                        'letter-spacing': '0px',
                        'color': '#ffffff',
                        'text-transform': 'uppercase',
                        'font-backup': '',
                    });
                    wp.customize('header-box-title-typography').set({
                        'font-family': 'Nunito Sans',
                        'variant': '400',
                        'font-size': '16px',
                        'line-height': '24px',
                        'letter-spacing': '0px',
                        'color': '#60626d',
                        'text-transform': 'none',
                        'font-backup': '',
                    });
                    wp.customize('header-box-content-typography').set({
                        'font-family': 'Quicksand',
                        'variant': '700',
                        'font-size': '18px',
                        'line-height': '24px',
                        'letter-spacing': '0px',
                        'color': '#131419',
                        'text-transform': 'none',
                        'font-backup': '',
                    });
                    wp.customize('header-search').set(true);
                    wp.customize('preheader-enable').set(preheader_enable);
                    wp.customize('preheader-bgcolor').set('blackish');
                    wp.customize('preheader-text-color').set('white');
                    wp.customize('sticky-header-bgcolor').set('white');
                    wp.customize('main-menu-active-color').set('blackish');
                    wp.customize('main-menu-sticky-color').set(main_menu_sticky_color);
                    wp.customize('logo-height').set('50');
                    wp.customize('main-menu-sticky-color').set('#101010');
                    wp.customize('header-btn-text').set('+(123) 1234-567-8901');
                    wp.customize('header-btn-url').set('http://grevo-demo.themesion.com/demo1/contact-us/');
                    wp.customize('header-btn2-text').set('Get a quote1');
                    wp.customize('header-btn2-url').set('http://grevo-demo.themesion.com/demo1/contact-us/');
                    wp.customize('titlebar-height').set('410');
                    wp.customize('titlebar-bgcolor').set('transparent');
                    wp.customize('titlebar-background').set({
                        'background-color': '#eeeeee',
                        'background-repeat': 'no-repeat',
                        'background-position': 'center center',
                        'background-size': 'cover',
                        'background-attachment': 'scroll',
                        'background-image': '',
                        'background-image': thsn_admin_js_variables.theme_path + '/images/titlebar-img.jpg',
                    });
                    wp.customize('titlebar-heading-typography').set({
                        'font-family': 'Quicksand',
                        'variant': '700',
                        'font-size': '50px',
                        'line-height': '70px',
                        'letter-spacing': '-0.4px',
                        'color': '#fff',
                        'text-transform': 'None',
                        'font-backup': ''
                    });
                    wp.customize('titlebar-subheading-typography').set({
                        'font-family': 'Nunito Sans',
                        'variant': '400',
                        'font-size': '16px',
                        'line-height': '1.5',
                        'letter-spacing': '0px',
                        'color': '#131419',
                        'text-transform': 'none',
                        'font-backup': '',
                    });
                    wp.customize('titlebar-breadcrumb-typography').set({
                        'font-family': 'Nunito Sans',
                        'variant': '400',
                        'font-size': '15px',
                        'line-height': '1.5',
                        'letter-spacing': '0px',
                        'color': '#131419',
                        'text-transform': 'uppercase',
                        'font-backup': '',
                    });
                    wp.customize('logo').set(thsn_admin_js_variables.theme_path + '/images/logo-white.svg');
                    wp.customize('sticky-logo').set(thsn_admin_js_variables.theme_path + '/images/logo.png');
                } else if (value == '4') { // Header style 4
                    wp.customize('global-color').set('#8cc63f');
                    wp.customize('light-bg-color').set('#eff3f5');
                    wp.customize('blackish-bg-color').set('#101010');
                    wp.customize('secondary-color').set(secondary_color);
                    wp.customize('header-height').set('115');
                    wp.customize('header-bgcolor').set('light');
                    wp.customize('menu-bgcolor').set('white');
                    wp.customize('main-menu-typography').set({
                        'font-family': 'Quicksand',
                        'variant': '700',
                        'font-size': '14px',
                        'line-height': '20px',
                        'letter-spacing': '0px',
                        'color': '#101010',
                        'text-transform': 'uppercase',
                        'font-backup': '',
                    });
                    wp.customize('header-box-title-typography').set({
                        'font-family': 'Nunito Sans',
                        'variant': '400',
                        'font-size': '16px',
                        'line-height': '24px',
                        'letter-spacing': '0px',
                        'color': '#60626d',
                        'text-transform': 'none',
                        'font-backup': '',
                    });
                    wp.customize('header-box-content-typography').set({
                        'font-family': 'Quicksand',
                        'variant': '700',
                        'font-size': '18px',
                        'line-height': '24px',
                        'letter-spacing': '0px',
                        'color': '#131419',
                        'text-transform': 'none',
                        'font-backup': '',
                    });
                    wp.customize('header-search').set(true);
                    wp.customize('preheader-enable').set(true);
                    wp.customize('preheader-left').set('<span class="thsn-label">Book Online</span><span>You can request booking (pending confirmation) in 24 hours</span>');
                    wp.customize('preheader-right').set('<ul class="thsn-contact-info"><li><i class="thsn-base-icon-clock"></i> Mon - Sat 8.00 - 18.00</li><li><i class="thsn-base-icon-marker"></i> Los Angeles Gournadi).set(1230  Bariasl</li></ul>');
                    wp.customize('preheader-bgcolor').set('globalcolor');
                    wp.customize('preheader-text-color').set('white');
                    wp.customize('sticky-header-bgcolor').set('white');
                    wp.customize('main-menu-active-color').set('globalcolor');
                    wp.customize('main-menu-sticky-color').set(main_menu_sticky_color);
                    wp.customize('logo-height').set('50');
                    wp.customize('header-btn-text').set('Get a quote');
                    wp.customize('header-btn-url').set('http://grevo-demo.themesion.com/demo1/contact-us/');
                    wp.customize('header-box1-icon').set('thsn-grevo-icon thsn-grevo-icon-time-call');
                    wp.customize('header-box1-title').set('Please Make a call');
                    wp.customize('header-box1-content').set('(+00)888.666.88');
                    wp.customize('header-box1-link').set('tel:(+00)888.666.88');
                    wp.customize('header-box2-icon').set('thsn-grevo-icon thsn-grevo-icon-open');
                    wp.customize('header-box2-title').set('E-mail Address');
                    wp.customize('header-box2-content').set('grevoinfo@gmail.com');
                    wp.customize('header-box2-link').set('http://grevo-demo.themesion.com/demo1/contact-us/');
                    wp.customize('header-box3-icon').set('');
                    wp.customize('header-box3-title').set('');
                    wp.customize('header-box3-content').set('');
                    wp.customize('header-box3-link').set('');
                    wp.customize('titlebar-height').set('410');
                    wp.customize('titlebar-bgcolor').set('transparent');
                    wp.customize('titlebar-background').set({
                        'background-color': '#eeeeee',
                        'background-repeat': 'no-repeat',
                        'background-position': 'center center',
                        'background-size': 'cover',
                        'background-attachment': 'scroll',
                        'background-image': '',
                        'background-image': thsn_admin_js_variables.theme_path + '/images/titlebar-img.jpg',
                    });
                    wp.customize('titlebar-heading-typography').set({
                        'font-family': 'Quicksand',
                        'variant': '700',
                        'font-size': '50px',
                        'line-height': '70px',
                        'letter-spacing': '-0.4px',
                        'color': '#fff',
                        'text-transform': 'None',
                        'font-backup': ''
                    });
                    wp.customize('titlebar-subheading-typography').set({
                        'font-family': 'Nunito Sans',
                        'variant': '400',
                        'font-size': '16px',
                        'line-height': '1.5',
                        'letter-spacing': '0px',
                        'color': '#131419',
                        'text-transform': 'none',
                        'font-backup': '',
                    });
                    wp.customize('titlebar-breadcrumb-typography').set({
                        'font-family': 'Nunito Sans',
                        'variant': '400',
                        'font-size': '15px',
                        'line-height': '1.5',
                        'letter-spacing': '0px',
                        'color': '#131419',
                        'text-transform': 'uppercase',
                        'font-backup': '',
                    });
                    wp.customize('logo').set(thsn_admin_js_variables.theme_path + '/images/grevo-logo.svg');
                    wp.customize('sticky-logo').set(thsn_admin_js_variables.theme_path + '/images/grevo-logo.svg');
                }
            });
        });

}); // window.load