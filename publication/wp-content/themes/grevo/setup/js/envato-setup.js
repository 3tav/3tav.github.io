"use strict";

var EnvatoWizard = (function($){

    var t;

    // callbacks from form button clicks.
    var callbacks = {
        install_plugins: function(btn){
            var plugins = new PluginManager();
            plugins.init(btn);
        },
        install_content: function(btn){
            var content = new ContentManager();
            content.init(btn);
        }
    };

    function window_loaded(){
        // init button clicks:
        $('.button-next').on( 'click', function(e) {
            var loading_button = dtbaker_loading_button(this);
            if(!loading_button){
                return false;
            }
            if($(this).data('callback') && typeof callbacks[$(this).data('callback')] != 'undefined'){
                // we have to process a callback before continue with form submission
                callbacks[$(this).data('callback')](this);
                return false;
            }else{
                loading_content();
                return true;
            }
        });
        $('.button-upload').on( 'click', function(e) {
            e.preventDefault();
            renderMediaUploader();
        });
        $('.theme-presets a.thsn-theme-preset-thumbnail').on( 'click', function(e) {
            e.preventDefault();
            var $ul = $(this).parents('ul').first();
            $ul.find('.current').removeClass('current');
            var $li = $(this).parents('li').first();
            $li.addClass('current');
            var newcolor = $(this).data('style');
            $('#new_style').val(newcolor);
            return false;
        });

        // Set title
        jQuery(document).prop('title', jQuery('#thsn-title').text() ); 

    }

    function loading_content(){
        $('.envato-setup-content').block({
            message: null,
            overlayCSS: {
                background: '#fff',
                opacity: 0.6
            }
        });
    }

    function PluginManager(){

        var complete;
        var items_completed = 0;
        var current_item = '';
        var $current_node;
        var current_item_hash = '';
        var retry_failed = false;

        function ajax_callback(response){
            if(typeof response == 'object' && typeof response.message != 'undefined'){
                $current_node.find('span').text(response.message);
                if(typeof response.url != 'undefined'){
                    // we have an ajax url action to perform.

                    if(response.hash == current_item_hash){
                        $current_node.find('span').text("failed");
                        find_next();
                    }else {
                        current_item_hash = response.hash;
                        jQuery.post(response.url, response, function(response2) {
                            process_current();
                            $current_node.find('span').text(response.message + envato_setup_params.verify_text);
                        }).fail(ajax_callback);
                    }

                }else if(typeof response.done != 'undefined'){
                    // finished processing this plugin, move onto next
                    find_next();
                }else{
                    // error processing this plugin
                    find_next();
                }
            }else{
                // error - try again with next plugin
                if(retry_failed){
                    $current_node.find('span').text("ajax error");
                    find_next();
                    retry_failed = false;
                }else{
                    retry_failed = true;
                    $current_node.find('span').text("Processing settings");
                    process_current();
                }
            }
        }
        function process_current(){
            if(current_item){
                // query our ajax handler to get the ajax to send to TGM
                // if we don't get a reply we can assume everything worked and continue onto the next one.
                jQuery.post(envato_setup_params.ajaxurl, {
                    action: 'envato_setup_plugins',
                    wpnonce: envato_setup_params.wpnonce,
                    slug: current_item
                }, ajax_callback).fail(ajax_callback);
            }
        }
        function find_next(){
            var do_next = false;
            if($current_node){
                if(!$current_node.data('done_item')){
                    items_completed++;
                    $current_node.data('done_item',1);
                }
                $current_node.find('.spinner').css('visibility','hidden');
            }
            var $li = $('.envato-wizard-plugins li');
            $li.each(function(){
                if(current_item == '' || do_next){
                    current_item = $(this).data('slug');
                    $current_node = $(this);
                    process_current();
                    do_next = false;
                }else if($(this).data('slug') == current_item){
                    do_next = true;
                }
            });
            if(items_completed >= $li.length){
                // finished all plugins!
                complete();
            }
        }

        return {
            init: function(btn){
                $('.envato-wizard-plugins').addClass('installing');
                complete = function(){
                    loading_content();
                    window.location.href=btn.href;
                };
                find_next();
            }
        }
    }

    function ContentManager(){

        var complete;
        var items_completed = 0;
        var current_item = '';
        var $current_node;
        var current_item_hash = '';

        function ajax_callback(response) {
            if(typeof response == 'object' && typeof response.logs != 'undefined'){
                if(typeof console != 'undefined'){
                    for(var i in response.logs){
                        if(response.logs[i].indexOf('ERROR') == 0){
                            console.warn(response.logs[i]);
                        }else{
                            console.log(response.logs[i]);
                        }
                    }
                }
            }
            if(typeof response == 'object' && typeof response.errors != 'undefined'){
                if(typeof console != 'undefined'){
                    for(var i in response.errors){
                        console.error(response.errors[i]);
                    }
                }
            }
            if(typeof response == 'object' && typeof response.message != 'undefined'){
                $current_node.find('span').text(response.message);
                if(typeof response.url != 'undefined'){
                    // we have an ajax url action to perform.
                    if(response.hash == current_item_hash){
                        $current_node.find('span').text("failed");
                        find_next();
                    }else {
                        current_item_hash = response.hash;
                        jQuery.post(response.url, response, ajax_callback).fail(ajax_callback); // recuurrssionnnnn
                    }
                }else if(typeof response.done != 'undefined'){
                    // finished processing this plugin, move onto next
                    find_next();
                }else{
                    // error processing this plugin
                    find_next();
                }
            }else{
                // error - try again with next plugin
                $current_node.find('span').text("ajax error");
                find_next();
            }
        }

        function process_current(){
            if(current_item){

                var $check = $current_node.find('input:checkbox');
                if($check.is(':checked')) {
                    //console.log("Doing 2 "+current_item);
                    // process htis one!
                    jQuery.post(envato_setup_params.ajaxurl, {
                        action: 'envato_setup_content',
                        wpnonce: envato_setup_params.wpnonce,
                        content: current_item
                    }, ajax_callback).fail(ajax_callback);
                }else{
                    $current_node.find('span').text("Skipping");
                    setTimeout(find_next,300);
                }
            }
        }
        function find_next(){
            var do_next = false;
            if($current_node){
                if(!$current_node.data('done_item')){
                    items_completed++;
                    $current_node.data('done_item',1);
                }
                $current_node.find('.spinner').css('visibility','hidden');
            }
            var $items = $('tr.envato_default_content');
            var $enabled_items = $('tr.envato_default_content input:checked');
            $items.each(function(){
                if (current_item == '' || do_next) {
                    current_item = $(this).data('content');
                    $current_node = $(this);
                    process_current();
                    do_next = false;
                } else if ($(this).data('content') == current_item) {
                    do_next = true;
                }
            });
            if(items_completed >= $items.length){
                // finished all items!
                complete();
            }
        }

        return {
            init: function(btn){
                $('.envato-setup-pages').addClass('installing');
                $('.envato-setup-pages').find('input').prop("disabled", true);
                complete = function(){
                    loading_content();
                    window.location.href=btn.href;
                };
                find_next();
            }
        }
    }

    /**
     * Callback function for the 'click' event of the 'Set Footer Image'
     * anchor in its meta box.
     *
     * Displays the media uploader for selecting an image.
     *
     * @since 0.1.0
     */
    function renderMediaUploader() {
        'use strict';

        var file_frame, attachment;

        if ( undefined !== file_frame ) {
            file_frame.open();
            return;
        }

        file_frame = wp.media.frames.file_frame = wp.media({
            title: 'Upload Logo',//jQuery( this ).data( 'uploader_title' ),
            button: {
                text: 'Select Logo' //jQuery( this ).data( 'uploader_button_text' )
            },
            multiple: false  // Set to true to allow multiple files to be selected
        });

        // When an image is selected, run a callback.
        file_frame.on( 'select', function() {
            // We set multiple to false so only get one image from the uploader
            attachment = file_frame.state().get('selection').first().toJSON();

            jQuery('.site-logo').attr('src',attachment.url);
            jQuery('#new_logo_id').val(attachment.id);

            // get average color from image
            var img = new Image();
            img.onload = function() {
                jQuery('#thsn-swizard-global-color-pallate, #thsn-swizard-secondary-color-pallate').html('');

                jQuery('.thsn-logo-section-right').each(function(){
                    jQuery(this).removeClass('hidden');
                });

                var vibrant     = new Vibrant(img);
                var swatches    = vibrant.swatches();
                var set_globalcolor     = false;
                var set_secondarycolor  = false;
                var x = 1;
                for (var swatch in swatches){
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch]){
                        jQuery("<div>", {
                            css: {
                                "background-color": swatches[swatch].getHex()
                            }
                        }).appendTo('#thsn-swizard-global-color-pallate, #thsn-swizard-secondary-color-pallate');

                        if( set_globalcolor == false ){
                            jQuery('#thsn-swizard-globalcolor').iris('color', swatches[swatch].getHex() );
                            set_globalcolor = true;
                        }
                        if( set_secondarycolor == false && x==2 ){
                            jQuery('#thsn-swizard-secondarycolor').iris('color', swatches[swatch].getHex() );
                            set_secondarycolor = true;
                        }

                        x = x + 1;
                    }

                }

                // now apply click 
                var bgcolor_primary = '';
                jQuery('#thsn-swizard-global-color-pallate > div').on('click', function(e){
                    bgcolor_primary = jQuery(this).css('background-color');
                    jQuery('#thsn-swizard-globalcolor').iris({ 'color': true } );
                    jQuery('#thsn-swizard-globalcolor').iris({ mode: 'rgb' } );
                    jQuery('#thsn-swizard-globalcolor').iris({ 'color': bgcolor_primary } );
                });

                var bgcolor_secondary = '';
                jQuery('#thsn-swizard-secondary-color-pallate > div').on('click', function(e){
                    bgcolor_secondary = jQuery(this).css('background-color');
                    jQuery('#thsn-swizard-secondarycolor').iris({ 'color': true } );
                    jQuery('#thsn-swizard-secondarycolor').iris({ mode: 'rgb' } );
                    jQuery('#thsn-swizard-secondarycolor').iris({ 'color': bgcolor_secondary } );
                });

            }
            img.src = attachment.url;

            // Do something with attachment.id and/or attachment.url here
        });
        // Now display the actual file_frame
        file_frame.open();

    }

    function dtbaker_loading_button(btn){

        var $button = jQuery(btn);
        if($button.data('done-loading') == 'yes')return false;
        var existing_text = $button.text();
        var existing_width = $button.outerWidth();
        var loading_text = '⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⠄⠂⠁⠁⠂⠄';
        var completed = false;

        $button.css('width',existing_width);
        $button.addClass('dtbaker_loading_button_current');
        var _modifier = $button.is('input') || $button.is('button') ? 'val' : 'text';
        $button[_modifier](loading_text);
        $button.data('done-loading','yes');

        var anim_index = [0,1,2];

        // animate the text indent
        function moo() {
            if (completed)return;
            var current_text = '';
            // increase each index up to the loading length
            for(var i = 0; i < anim_index.length; i++){
                anim_index[i] = anim_index[i]+1;
                if(anim_index[i] >= loading_text.length)anim_index[i] = 0;
                current_text += loading_text.charAt(anim_index[i]);
            }
            $button[_modifier](current_text);
            setTimeout(function(){ moo();},60);
        }

        moo();

        return {
            done: function(){
                completed = true;
                $button[_modifier](existing_text);
                $button.removeClass('dtbaker_loading_button_current');
                $button.attr('disabled',false);
            }
        }

    }

    return {
        init: function(){
            t = this;
            $(window_loaded);
        },
        callback: function(func){
            //console.log(func);
            //console.log(this);
        }
    }

})(jQuery);

EnvatoWizard.init();
