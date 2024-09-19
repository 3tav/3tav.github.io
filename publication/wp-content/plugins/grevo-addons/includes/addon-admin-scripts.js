
"use strict";

/*
wp.customize( 'header-style', 'header-height', function( header_style, header_height ) {
    var value = '';
    console.log(value);

    console.log('Hiiii');
    header_style.bind( function( newval, header_height ) {
        value = newval;
        console.log(newval);
        header_height.set( '97' );
        wp.customize('header-height').set('95');

        console.log(newval);
	} );

} );
*/

/*
wp.customize.bind('ready', function(){
    //console.log('ready');

    wp.customize('header-height').set('94');
    function thsn_header_change( header_style ){
        console.log(header_style);
        //if( header_style == '2' ){
            wp.customize('header-height').set('960');
            jQuery('')
            console.log('TTTTTT');
        //}

    }

    wp.customize( 'header-style', function( header_style ) {

        header_style.bind( function( newval ) {
            thsn_header_change( newval );
        } );

    } );

});
*/

